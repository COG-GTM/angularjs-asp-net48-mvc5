import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapErrorHandler } from './app/bootstrap-error-handler';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(bootstrapErrorHandler);
