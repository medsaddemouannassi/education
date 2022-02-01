import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { AdminComponent } from './components/admin/admin.component';
import { CoursesComponent } from './components/courses/courses.component';
import { EventsComponent } from './components/events/events.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SuperHomeComponent } from './components/super-home/super-home.component';
import { TeachersComponent } from './components/teachers/teachers.component';


const routes: Routes = [
  {path : "addCourse" , component : AddCourseComponent},
  {path : "editCourse/:id" , component : AddCourseComponent},
  {path : "addEvent" , component : AddEventComponent},
  {path : "editEvent/:id" , component : AddEventComponent},
  {path : "addTeacher" , component : AddTeacherComponent},
  {path : "editTeacher/:id" , component : AddTeacherComponent},
  {path : "allCourses" , component : CoursesComponent},
  {path : "display-course/:id" , component : CoursesComponent},
  {path : "allEvents" , component : EventsComponent},
  {path : "display-event/:id" , component : EventsComponent},
  {path : "allTeachers" , component : TeachersComponent},
  {path : "display-teacher/:id" , component : TeachersComponent},
  {path : "admin" , component : AdminComponent},
  {path : "login" , component : LoginComponent},
  {path : "signupTeacher" , component : SignupTeacherComponent},
  {path : "signupStudent" , component : SignupStudentComponent},
  {path : "displayStudent/:id" , component : SignupStudentComponent},
  {path : "editStudent/:id" , component : SignupStudentComponent},
  {path : "home" , component : HomeComponent},
  {path : "" , component : SuperHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
