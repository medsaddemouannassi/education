import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';
import { MustMatch } from 'src/app/validators/mustMatch';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  addTeacherForm: FormGroup;
  teacherId: any;
  teacher: any = {};
  form: string = "Add Teacher";
  imagePreview: string;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private teacherService: TeacherService,
    private router: Router
  ) { }

  ngOnInit() {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    this.addTeacherForm = this.formBuilder.group({
      field: ["", [Validators.required]],
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(3)]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9_-]{8,8}$")]],
      password: ["", [Validators.required, Validators.minLength(7)]],
      confirmPassword: [""],
      image: ["", [Validators.required]],
    },
      {
        validator: MustMatch('password', 'confirmPassword')
      })
    if (this.teacherId) {
      this.form = "Edit Teacher";
      this.teacherService.sendReqToGetTeacherById(this.teacherId).subscribe((data) => {
        this.teacher = data.result
      })
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addTeacherForm.patchValue({ image: file });
    this.addTeacherForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  addOrEditTeacher() {
    if (this.teacherId) {
      this.teacherService.sendReqToEditTeacher(this.teacher, this.addTeacherForm.value.image).subscribe((data) => {
        alert(data.result)
        this.router.navigate(["admin"]);
      })
    } else {
      this.teacherService.sendReqToSignupTeacher(this.teacher, this.addTeacherForm.value.image).subscribe((data) => {
        alert(data.result);
        this.router.navigate(["admin"]);
      })
    }
  }
}
