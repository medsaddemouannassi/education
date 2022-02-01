import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { EventsComponent } from './components/events/events.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { MenuComponent } from './components/menu/menu.component';
import { FeaturesComponent } from './components/features/features.component';
import { CounterComponent } from './components/counter/counter.component';
import { TeamComponent } from './components/team/team.component';
import { LatestNewsComponent } from './components/latest-news/latest-news.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { SuperHomeComponent } from './components/super-home/super-home.component';
import { CourseComponent } from './components/course/course.component';
import { EventComponent } from './components/event/event.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCoursesComponent } from './components/admin-courses/admin-courses.component';
import { AdminTeachersComponent } from './components/admin-teachers/admin-teachers.component';
import { AdminEventsComponent } from './components/admin-events/admin-events.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    TeachersComponent,
    HomeComponent,
    LoginComponent,
    SignupTeacherComponent,
    SignupStudentComponent,
    HeaderComponent,
    FooterComponent,
    EventsComponent,
    AddCourseComponent,
    AddEventComponent,
    MenuComponent,
    FeaturesComponent,
    CounterComponent,
    TeamComponent,
    LatestNewsComponent,
    NewsletterComponent,
    SuperHomeComponent,
    CourseComponent,
    EventComponent,
    TeacherComponent,
    AddTeacherComponent,
    AdminComponent,
    AdminCoursesComponent,
    AdminTeachersComponent,
    AdminEventsComponent,
    AdminUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
