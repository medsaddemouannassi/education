import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURL= "http://localhost:3000/api/allCourses"
  constructor(private httpClient: HttpClient) { }

  sendReqToAddCourse(obj, image: File) {
    let formData = new FormData()
    formData.append("field", obj.field)
    formData.append("teacher", obj.teacher)
    formData.append("numberOfStudents", obj.numberOfStudents)
    formData.append("price", obj.price)
    formData.append("description", obj.description)
    formData.append("image", image)
    return this.httpClient.post<{ result: any }>(this.courseURL, formData)
  }

  sendReqToGetAllCourses() {
    return this.httpClient.get<{ result: any }>(this.courseURL)
  }

  sendReqToGetCourseById(id) {
    return this.httpClient.get<{ result: any }>(`${this.courseURL}/${id}`)
  }

  sendReqToEditCourse(newObj, image: File) {
    let formData = new FormData()
    formData.append("field", newObj.field)
    formData.append("teacher", newObj.teacher)
    formData.append("numberOfStudents", newObj.numberOfStudents)
    formData.append("price", newObj.price)
    formData.append("description", newObj.description)
    formData.append("image", image)
    return this.httpClient.put<{ result: any }>(`${this.courseURL}/${newObj._id}`, formData)
  }

  sendReqToDeleteCourseById(id) {
    return this.httpClient.delete<{ result: any }>(`${this.courseURL}/${id}`)
  }
}
