import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {
  courses: any = [];
  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseService.sendReqToGetAllCourses().subscribe((data) => {
      this.courses = data.result
    })
  }

  goToDisplayOrEditOrDeleteCourse(id, button) {
    if (button == "display") {
      this.router.navigate([`display-course/${id}`]);
    } else if (button == "edit") {
      this.router.navigate([`editCourse/${id}`]);
    } else {
      this.courseService.sendReqToDeleteCourseById(id).subscribe((data) => {
        alert(data.result)
        this.courseService.sendReqToGetAllCourses().subscribe((data) => {
          this.courses = data.result
        })
      })
    }
  }
}
