import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events:any=[];
  eventId: any;
  event: any = {};
  pageName:string = "Events";
  pageTitle:string="Upcoming events"
  url: string;
  constructor(
    private eventService: EventService,
    private activeRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    this.url = this.router.url;
    this.eventId = this.activeRoute.snapshot.paramMap.get('id')
    if (this.eventId) {
      this.pageName = "Event Info";
      this.pageTitle="Event Info"
      this.eventService.sendReqToGetEventById(this.eventId).subscribe((data) => {
        this.event = data.result
      })
    } else {
      this.eventService.sendReqToGetAllEvents().subscribe((data) => {
        this.events = data.result
      })
    }
  }

}
