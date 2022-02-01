import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css']
})
export class AdminEventsComponent implements OnInit {
  events: any = [];
  constructor(
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventService.sendReqToGetAllEvents().subscribe((data) => {
      this.events = data.result
    })
  }

  goToDisplayOrEditOrDeleteEvent(id, button) {
    if (button == "display") {
      this.router.navigate([`display-event/${id}`]);
    } else if (button == "edit") {
      this.router.navigate([`editEvent/${id}`]);
    } else {
      this.eventService.sendReqToDeleteEventById(id).subscribe((data) => {
        alert(data.result)
        this.eventService.sendReqToGetAllEvents().subscribe((data) => {
          this.events = data.result
        })
      })
    }
  }
}
