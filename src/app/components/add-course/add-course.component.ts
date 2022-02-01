import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  addCourseForm: FormGroup;
  courseId: any;
  course: any = {};
  form: string = "Add Course";
  imagePreview: any;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.addCourseForm = this.formBuilder.group({
      field: ["", [Validators.required, Validators.minLength(3)]],
      teacher: ["", [Validators.required, Validators.minLength(3)]],
      numberOfStudents: ["", [Validators.required]],
      price: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.minLength(50)]],
      image: [""],
    })
    if (this.courseId) {
      this.form = "Edit Course";
      this.courseService.sendReqToGetCourseById(this.courseId).subscribe((data) => {
        this.course = data.result
      })
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addCourseForm.patchValue({ image: file });
    this.addCourseForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  addOrEditCourse() {
    if (this.courseId) {
      this.courseService.sendReqToEditCourse(this.course, this.addCourseForm.value.image).subscribe((data) => {
        alert(data.result)
        this.router.navigate(["admin"]);
      })
    } else {
      this.courseService.sendReqToAddCourse(this.course, this.addCourseForm.value.image).subscribe((data) => {
        alert(data.result);
        this.router.navigate(["admin"]);
      })
    }
  }
}
