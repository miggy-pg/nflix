import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes)],
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [...appConfig.providers!, provideHttpClient()],
});
