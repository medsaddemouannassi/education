import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {
  signupStudentForm: FormGroup;
  user: any = {};
  firstNameMsg: string;
  lastNameMsg: string;
  emailMsg: string;
  passwordMsg: string;
  confirmPasswordMsg: string;
  phoneMsg: string;
  studentId: any;
  url: any;
  page: string = "Register";
  title: string = "Register As A Student";
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.url = this.router.url;
    this.studentId = this.activatedRoute.snapshot.paramMap.get("id")
    this.signupStudentForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      password: [""],
      confirmPassword: [""],
      phone: [""]
    })
    if (this.studentId) {
      this.title = (this.url == `/editStudent/${this.studentId}`) ? "Edit Student Info" : "Student Info"
      this.page = (this.url == `/editStudent/${this.studentId}`) ? "Edit Student" : "Student Info"
      this.userService.sendReqToGetStudentById(this.studentId).subscribe((data) => {
        this.user = data.result
      })
    }
  }

  signupOrEditStudent() {
    this.user.role = "student";
    if (this.studentId) {
      this.userService.sendReqToEditStudentById(this.user).subscribe((data) => {
        alert(data.result)
      })
    } else {
      this.userService.sendReqToSignup(this.user).subscribe((data) => {
        if (data.result == "0" || data.result == "1" || data.result == "2" || data.result == "3" || data.result == "4" || data.result == "5" || data.result == "6") {
          if (data.result == "0") {
            this.firstNameMsg = "First Name Required"
          }
          if (data.result == "1") {
            this.lastNameMsg = "Last Name Required"
          }
          if (data.result == "2") {
            this.emailMsg = "E-mail Required"
          }
          if (data.result == "3") {
            this.passwordMsg = "Password Required"
          }
          if (data.result == "4") {
            this.phoneMsg = "Phone Required"
          }
          if (data.result == "5") {
            this.confirmPasswordMsg = "Password and confirm password doesn't match"
          }
          if (data.result == "6") {
            this.emailMsg = "E-mail already exist"
          }
        } else {
          this.router.navigate([''])
        }
      })
    }
  }
}
