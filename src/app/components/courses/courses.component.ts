import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any = [];
  courseId: any;
  course: any = {};
  pageName: string = "Courses";
  pageTitle: string = "Popular Online Courses"
  url: string;
  constructor(
    private courseService: CourseService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.url = this.router.url;
    console.log(this.url);
    
    this.courseId = this.activeRoute.snapshot.paramMap.get('id')
    if (this.courseId) {
      this.pageName = "Course Info";
      this.pageTitle = "Course Info"
      this.courseService.sendReqToGetCourseById(this.courseId).subscribe((data) => {
        this.course = data.result
      })
    } else {
      this.courseService.sendReqToGetAllCourses().subscribe((data) => {
        this.courses = data.result
      })
    }
  }

}
