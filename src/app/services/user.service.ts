import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = "http://localhost:3000/api/students"
  constructor(private httpClient: HttpClient) { }

  sendReqToLogin(obj) {
    return this.httpClient.post<{ result: any }>(`${this.userURL}/login`, obj);
  }

  sendReqToSignup(obj) {
    return this.httpClient.post<{ result: any }>(`${this.userURL}/signup`, obj);
  }

  sendReqToGetAllStudents(){
    return this.httpClient.get<{ result:any}>(this.userURL);
  }

  sendReqToGetStudentById(id){
    return this.httpClient.get<{ result:any}>(`${this.userURL}/${id}`);
  }

  sendReqToEditStudentById(obj){
    return this.httpClient.put<{ result:any}>(`${this.userURL}/${obj._id}`, obj);
  }

  sendReqToDeleteStudentById(id){
    return this.httpClient.delete<{ result:any}>(`${this.userURL}/${id}`);
  }
}
