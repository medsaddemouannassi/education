import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {
  signupTeacherForm: FormGroup;
  user: any = {};
  emailExistMsg: string;
  imagePreview: string;
  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupTeacherForm = this.formBuilder.group({
      field: [""],
      firstName: [""],
      lastName: [""],
      email: [""],
      password: [""],
      confirmPassword: [""],
      phone: [""],
      image: [""]
    })
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupTeacherForm.patchValue({ image: file });
    this.signupTeacherForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  signupTeacher() {
    this.user.role = "teacher";
    this.teacherService.sendReqToSignupTeacher(this.user, this.signupTeacherForm.value.image).subscribe((data) => {
      if (data.result == "6") {
        this.emailExistMsg = "E-mail already exist"
      } else {
        this.router.navigate([''])
      }
    })
  }
}
