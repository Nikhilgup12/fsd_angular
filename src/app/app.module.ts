import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { interceptors } from './shared/Interceptors';
import { AuthService } from './auth/services/auth.service';

@NgModule({
   declarations: [AppComponent],
   imports: [BrowserModule, AppRoutingModule, CoreModule, HttpClientModule],
   providers: [provideHttpClient(withInterceptors(interceptors)), AuthService],

   bootstrap: [AppComponent],
})
export class AppModule { }
