import { InjectionToken } from "@angular/core";
import { AppConfig } from "./appconfig.interface";
import { environment } from '../../environments/environment';

export const app_service_config = new InjectionToken<AppConfig>('app.config')

// console.log("aaaaa", environment)

export const app_config: AppConfig = {
  apiEndPoint: environment.apiEndpoiont,
};
