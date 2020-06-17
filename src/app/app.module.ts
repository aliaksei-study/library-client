import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BookComponent } from './book/book.component';
import { ReaderComponent } from './reader/readers/reader.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { AddBookComponent } from './add-book/add-book.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AddReaderComponent } from './reader/add-reader/add-reader.component';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { GenresPipe } from './pipe/genres.pipe';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationInterceptor} from "./interceptor/authentication-interceptor";
import { UpdateReaderComponent } from './reader/update-reader/update-reader.component';
import { AuthorComponent } from './author/authors/author.component';
import { UpdateAuthorComponent } from './author/update-author/update-author.component';
import { CountriesPipe } from './pipe/countries.pipe';
import { UpdateBookComponent } from './update-book/update-book.component';
import { BookKeeperComponent } from './book-keeper/book-keeper.component';

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
    path:"authors",
    component:AuthorComponent
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
  },
  {
    path:"authors/:id",
    component:UpdateAuthorComponent
  },
  {
    path:"books/:id",
    component:UpdateBookComponent
  },
  {
    path:"keeper-give-out/:bookId",
    component:BookKeeperComponent
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
    UpdateReaderComponent,
    AuthorComponent,
    UpdateAuthorComponent,
    CountriesPipe,
    UpdateBookComponent,
    BookKeeperComponent
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
