import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { communityAttributesReducer } from 'src/app/community/store/reducers/community-attributes.reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { HttpAuthInterceptor } from './shared/interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from './shared/interceptors/http-error-interceptor';
import { reducers } from './store/reducers/app.reducers';
import { RouterStoreModule } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    StoreModule.forRoot(reducers),
    RouterStoreModule,
    !environment.production ? StoreDevtoolsModule.instrumentStore() : []
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
