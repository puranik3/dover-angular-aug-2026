# Setting up authentication in an Angular app
Before getting started with these steps, please do the following:
1. Use the Angular 21 version of the workshops app in `demos/workshops-app` as the working project.
2. Run the `workshops-server` in authenticated mode:
```
npm run auth
```

## Step 1: Create a login component
From the project folder, create the component:
```
ng generate component login
```

> Angular 21 creates standalone components by default, so you do not need to add `standalone: true` manually unless you are deliberately creating a custom pattern.

## Step 2: Set up routing to the login page
- Add the route path to the login page in `src/app/app.routes.ts`:
```ts
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Home } from './home/home';
import { PageNotFound } from './page-not-found/page-not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Workshops App',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: '**',
    component: PageNotFound,
    title: 'Page Not Found',
  },
];
```
You should now be able to go to `http://localhost:4200/login` to see the login page.

## Step 3: Set up the auth service
Create the auth service:
```
ng generate service common/auth/auth
```
Add a login method that calls the login endpoint, stores the token in localStorage, and returns the result to the caller.
```ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface ICredentials {
  email: string;
  password: string;
}

export interface ILoginResponse {
  email: string;
  authToken: string;
  role: 'admin' | 'general';
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private static readonly KEY_USER = 'user';

  private readonly http = inject(HttpClient);

  login(credentials: ICredentials) {
    return this.http
      .post<ILoginResponse>('http://localhost:8001/login', credentials, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        map((response) => {
          // login successful if there's a JWT token in the response
          if (response && response.authToken) {
            localStorage.setItem(
              AuthenticationService.KEY_USER,
              JSON.stringify(response)
            );
          }

          return response;
        })
      );
  }

  getUser() {
    return JSON.parse(
      localStorage.getItem(AuthenticationService.KEY_USER) || '{}'
    );
  }

  isLoggedIn() {
    return !!localStorage.getItem(AuthenticationService.KEY_USER);
  }

  logout() {
    localStorage.removeItem(AuthenticationService.KEY_USER);
  }
}
```

> In Angular 21, the `inject()` function is preferred for dependency injection in services and simple components. It keeps the code concise and works well with standalone components.


### Step 4: Set up the login page
The login component gets the email and password from the user and submits them to the login endpoint. On success it redirects; on error it displays a toast.
- `src/app/login/login.ts`
```ts
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService, ICredentials } from '../common/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);

  credentials: ICredentials = {
    email: 'john.doe@example.com',
    password: 'Password123#',
  };

  loading = false;
  returnUrl = '/';

  ngOnInit() {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.credentials).subscribe({
      next: () => this.router.navigateByUrl(this.returnUrl),
      error: () => {
        this.loading = false;
        // show error toast here if you have a toast service
      },
    });
  }
}
```
- `src/app/login/login.html`
```html
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h2>Login</h2>

      <form #form="ngForm" (ngSubmit)="form.valid && login()" novalidate>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            class="form-control"
            [(ngModel)]="credentials.email"
            required
          />
        </div>

        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
            [(ngModel)]="credentials.password"
            required
          />
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="loading">
          @if (loading) {
            Logging in...
          } @else {
            Login
          }
        </button>
      </form>
    </div>
  </div>
</div>
```

> This example uses Angular 21's `@if` blocks instead of `*ngIf`.


### Step 5: Setting up HTTP interceptor
Your workshops list page would not be able to fetch data without passing the token. Configure the interceptor to add the token automatically to outgoing HTTP requests.
- `src/app/common/auth/jwt.interceptor.ts`
```ts
import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  private readonly authenticationService = inject(AuthenticationService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.authenticationService.getUser();

    if (user && user.authToken) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.authToken}`,
        },
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
```
- Add the interceptor to the app in `src/app/app.config.ts`:
```ts
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { JwtInterceptor } from './common/auth/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
};
```
Now your workshops list and protected pages can fetch data with the auth token attached.

### Step 6: Setting up route guards
- Implement a route guard that prevents navigation to protected pages for unauthenticated users. Create the guard in `src/app/common/auth/auth.guard.ts`.
```
ng generate guard common/auth/auth
```
- The guard checks whether the user is logged in using the authentication service's `isLoggedIn()` method. If not, redirect to `/login` or a `/forbidden` route.
```ts
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from './auth.service';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
```
- Add the guard to the protected routes in `src/app/workshops/workshops.routes.ts`:
```ts
import { Routes } from '@angular/router';
import { authGuard } from '../common/auth/auth.guard';
import { WorkshopsList } from './workshops-list/workshops-list';
import { AddWorkshop } from './add-workshop/add-workshop';

export const routes: Routes = [
  {
    path: 'workshops',
    component: WorkshopsList,
    title: 'List of Workshops',
    canActivate: [authGuard],
  },
  {
    path: 'workshops/add',
    component: AddWorkshop,
    title: 'Add a new workshop',
    canActivate: [authGuard],
  },
];
```
- __NOTE__: The above route configuration is just a sample. You can add the guard to any page you wish to protect.
- You should now be able to navigate to protected pages like `/workshops` only if the user is logged in.

### Step 7: Sharing authentication state and updating the menu
- A modern Angular 21 approach is to keep the auth state in a signal. This makes the menu react immediately when the user logs in or out, without manual subscription wiring.
- Update the service to expose a `signal` instead of a `BehaviorSubject`.

```ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private static readonly KEY_USER = 'user';

  private readonly http = inject(HttpClient);
  private readonly authState = signal(this.isLoggedIn());
  readonly isLoggedInSignal = this.authState.asReadonly();

  login(credentials: ICredentials) {
    return this.http
      .post<ILoginResponse>('http://localhost:8001/login', credentials, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(
        map((response) => {
          if (response && response.authToken) {
            localStorage.setItem(AuthenticationService.KEY_USER, JSON.stringify(response));
            this.authState.set(true);
          }

          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem(AuthenticationService.KEY_USER);
    this.authState.set(false);
  }

  getUser() {
    return JSON.parse(localStorage.getItem(AuthenticationService.KEY_USER) || '{}');
  }

  isLoggedIn() {
    return !!localStorage.getItem(AuthenticationService.KEY_USER);
  }
}
```

- The menu can then read the signal directly and update the template automatically.

```ts
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../common/auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgbDropdownModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  private readonly authService = inject(AuthenticationService);
  private readonly router = inject(Router);

  protected readonly isLoggedIn = this.authService.isLoggedInSignal;

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
```

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" routerLink="/">Workshops App</a>

    <ul class="navbar-nav ms-auto">
      <li class="nav-item">
        <a class="nav-link" routerLink="/">Home</a>
      </li>

      @if (isLoggedIn()) {
        <li class="nav-item">
          <a class="nav-link" routerLink="/workshops">List of workshops</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" routerLink="/workshops/add">Add a workshop</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#" (click)="logout($event)">Logout</a>
        </li>
      } @else {
        <li class="nav-item">
          <a class="nav-link" routerLink="/login">Login</a>
        </li>
      }
    </ul>
  </div>
</nav>
```

> Angular 21 encourages using signals for reactive UI state. Behavior subjects still work, but signals are cleaner for local UI state such as login status.
