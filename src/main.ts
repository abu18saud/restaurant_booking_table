import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), DatePipe]
}).catch(err => console.error(err));