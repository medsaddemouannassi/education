import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  addEventForm: FormGroup;
  eventId: any;
  event: any = {};
  form: string = "Add Event";
  imagePreview: string;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    this.addEventForm = this.formBuilder.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      address: ["", [Validators.required, Validators.minLength(17)]],
      date: ["", [Validators.required]],
      time: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.minLength(50)]],
      image: [""]
    })
    if (this.eventId) {
      this.form = "Edit Event";
      this.eventService.sendReqToGetEventById(this.eventId).subscribe((data) => {
        this.event = data.result
      })
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.addEventForm.patchValue({ image: file });
    this.addEventForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }

  addOrEditEvent() {
    if (this.eventId) {
      this.eventService.sendReqToEditEvent(this.event, this.addEventForm.value.image).subscribe((data) => {
        alert(data.result)
        this.router.navigate(["admin"]);
      })
    } else {
      this.eventService.sendReqToAddEvent(this.event, this.addEventForm.value.image).subscribe((data) => {
        alert(data.result);
        this.router.navigate(["admin"]);
      })
    }
  }
}
