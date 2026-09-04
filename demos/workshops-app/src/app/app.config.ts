import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { routes as workshopsRoutes } from './workshops/workshops.routes';

import {
  HTTP_INTERCEPTORS,
  withInterceptors,
  provideHttpClient
//   withInterceptorsFromDi,
} from '@angular/common/http';

import { jwtInterceptor } from './common/auth/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideHttpClient(
      withInterceptors([jwtInterceptor])
    ),

    // IMPORTANT: Order matters here...
    provideRouter(workshopsRoutes),
    provideRouter(routes),
  ]
};
