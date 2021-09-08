import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }

  login(data){
    return this.http.post('http://localhost:8000/oauth/token',data);
  }

  getUser(){
    const headersAuth = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get('http://localhost:8000/api/userau',{headers:headersAuth});
  }

  register(data){
    return this.http.post('http://localhost:8000/api/user', data , {responseType: 'text'});
  }


}
