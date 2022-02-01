import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  students:any=[]
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.sendReqToGetAllStudents().subscribe((data) => {
      this.students = data.result
    })
  }

  goToDisplayOrEditOrDeleteStudent(id, button) {
    if (button == "display") {
      this.router.navigate([`displayStudent/${id}`])
    } else if (button == "edit") {
      this.router.navigate([`editStudent/${id}`])
    } else {
      this.userService.sendReqToDeleteStudentById(id).subscribe((data) => {
        alert(data.result)
        this.userService.sendReqToGetAllStudents().subscribe((data) => {
          this.students = data.result
        })
      })
    }
  }
}
