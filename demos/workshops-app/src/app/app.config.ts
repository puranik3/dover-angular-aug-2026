import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { routes as workshopsRoutes } from './workshops/workshops.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),

    // IMPORTANT: Order matters here...
    provideRouter(workshopsRoutes),
    provideRouter(routes),
  ]
};
