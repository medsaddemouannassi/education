import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  teachers:any=[];
  teacherId: any;
  teacher: any = {};
  pageName:string = "Teachers";
  pageTitle:string="All Teachers"
  constructor(
    private teacherService:TeacherService,
    private activeRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.teacherId = this.activeRoute.snapshot.paramMap.get('id')
    if (this.teacherId) {
      this.pageName = "Teacher Info";
      this.pageTitle="Teacher Info"
      this.teacherService.sendReqToGetTeacherById(this.teacherId).subscribe((data) => {
        this.teacher = data.result
      })
    } else {
      this.teacherService.sendReqToGetAllTeachers().subscribe((data) => {
        this.teachers = data.result
      })
    }
  }

}
