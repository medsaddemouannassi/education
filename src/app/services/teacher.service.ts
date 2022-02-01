import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  teacherURL = "http://localhost:3000/api/allTeachers"
  constructor(private httpClient: HttpClient) { }

  sendReqToSignupTeacher(obj, image: File) {
    let formData = new FormData()
    formData.append("field", obj.field)
    formData.append("firstName", obj.firstName)
    formData.append("lastName", obj.lastName)
    formData.append("email", obj.email)
    formData.append("phone", obj.phone)
    formData.append("password", obj.password)
    formData.append("confirmPassword", obj.confirmPassword)
    formData.append("image", image)
    return this.httpClient.post<{ result: any }>(`${this.teacherURL}/signup`, formData)
  }

  sendReqToLoginTeacher(obj) {
    return this.httpClient.post<{ result: any }>(`${this.teacherURL}/login`, obj)
  }

  sendReqToGetAllTeachers() {
    return this.httpClient.get<{ result: any }>(this.teacherURL)
  }

  sendReqToGetTeacherById(id) {
    return this.httpClient.get<{ result: any }>(`${this.teacherURL}/${id}`)
  }

  sendReqToEditTeacher(newObj, image: File) {
    let formData = new FormData()
    formData.append("field", newObj.field)
    formData.append("firstName", newObj.firstName)
    formData.append("lastName", newObj.lastName)
    formData.append("email", newObj.email)
    formData.append("phone", newObj.phone)
    formData.append("password", newObj.password)
    formData.append("confirmPassword", newObj.confirmPassword)
    formData.append("image", image)
    return this.httpClient.put<{ result: any }>(`${this.teacherURL}/${newObj._id}`, formData)
  }

  sendReqToDeleteTeacherById(id) {
    return this.httpClient.delete<{ result: any }>(`${this.teacherURL}/${id}`)
  }
}
