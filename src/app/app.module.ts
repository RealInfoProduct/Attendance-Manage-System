import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from './shared/shared.module';
import { RegisterComponent } from './pages/register/register.component'

import { provideFirebaseApp,initializeApp} from '@angular/fire/app'
import { getFirestore,provideFirestore} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment'
import { AuthInterceptor } from './auth/auth.interceptor';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
// translation use 
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { SpinnerComponent } from './Pages/spinner/spinner.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,
    ChangepasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    CommonModule,
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=> getFirestore()),
    provideAuth(() => getAuth()),

    // this one use for authentication handle error only
    AngularFireModule.initializeApp(environment.firebaseConfig),

     // translation use 
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
