import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { SendFormService } from './services/send-form.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()

  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
