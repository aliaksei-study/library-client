import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BookComponent } from './book/book.component';
import { ReaderComponent } from './reader/reader.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { AddBookComponent } from './add-book/add-book.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AddReaderComponent } from './add-reader/add-reader.component';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { GenresPipe } from './pipe/genres.pipe';
import { AddAuthorComponent } from './add-author/add-author.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationInterceptor} from "./interceptor/authentication-interceptor";
import { UpdateReaderComponent } from './update-reader/update-reader.component';

const appRoutes : Routes = [
  {
    path:"books",
    component:BookComponent
  },
  {
    path:"readers",
    component:ReaderComponent
  },
  {
    path:"",
    pathMatch:"full",
    redirectTo:"login"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"books/add",
    component:AddBookComponent
  },
  {
    path:"readers/add",
    component:AddReaderComponent
  },
  {
    path:"readers/:id",
    component:UpdateReaderComponent
  },
  {
    path:"authors/add",
    component:AddAuthorComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BookComponent,
    ReaderComponent,
    AddBookComponent,
    AddReaderComponent,
    GenresPipe,
    AddAuthorComponent,
    LoginComponent,
    UpdateReaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
