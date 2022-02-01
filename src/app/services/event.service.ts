import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  eventURL = "http://localhost:3000/api/allEvents"
  constructor(private httpClient: HttpClient) { }

  sendReqToAddEvent(obj, image: File) {
    let formData = new FormData()
    formData.append("title", obj.title)
    formData.append("address", obj.address)
    formData.append("date", obj.date)
    formData.append("time", obj.time)
    formData.append("description", obj.description)
    formData.append("image", image)
    return this.httpClient.post<{ result: any }>(this.eventURL, formData)
  }

  sendReqToGetAllEvents() {
    return this.httpClient.get<{ result: any }>(this.eventURL)
  }

  sendReqToGetEventById(id) {
    return this.httpClient.get<{ result: any }>(`${this.eventURL}/${id}`)
  }

  sendReqToEditEvent(newObj, image) {
    let formData = new FormData()
    formData.append("title", newObj.title)
    formData.append("address", newObj.address)
    formData.append("date", newObj.date)
    formData.append("time", newObj.time)
    formData.append("description", newObj.description)
    formData.append("image", image)
    return this.httpClient.put<{ result: any }>(`${this.eventURL}/${newObj._id}`, formData)
  }

  sendReqToDeleteEventById(id) {
    return this.httpClient.delete<{ result: any }>(`${this.eventURL}/${id}`)
  }
}
