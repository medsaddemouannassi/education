import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {
  teachers: any = [];
  constructor(
    private teacherService: TeacherService,
    private router: Router
    ) { }

  ngOnInit() {
    this.teacherService.sendReqToGetAllTeachers().subscribe((data) => {
      this.teachers = data.result
    })
  }

  goToDisplayOrEditOrDeleteTeacher(id, button) {
    if (button == "display") {
      this.router.navigate([`display-teacher/${id}`]);
    } else if (button == "edit") {
      this.router.navigate([`editTeacher/${id}`]);
    } else {
      this.teacherService.sendReqToDeleteTeacherById(id).subscribe((data) => {
        alert(data.result)
        this.teacherService.sendReqToGetAllTeachers().subscribe((data) => {
          this.teachers = data.result
        })
      })
    }
  }
}
