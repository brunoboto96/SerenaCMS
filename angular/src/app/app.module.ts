// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './cp/user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PostComponent } from './cp/post/post.component';
import { CpComponent } from './cp/cp.component';
import { CpTopBarComponent } from './cp/cp-top-bar/cp-top-bar.component';
import {FileSelectDirective, FileUploadModule} from "ng2-file-upload";
import { ProjectListComponent } from './project-list/project-list.component';
import { PostsListComponent } from './cp/posts-list/posts-list.component';
import { PostEditComponent } from './cp/post-edit/post-edit.component';
import { ConfigurationsComponent } from './cp/configurations/configurations.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    PostComponent,
    CpComponent,
    CpTopBarComponent,
    ProjectListComponent,
    PostsListComponent,
    PostEditComponent,
    ConfigurationsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FileUploadModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
