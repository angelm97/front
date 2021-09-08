import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewServiceService {

  url:string = "http://localhost:8000/api/views";

  constructor(
    private http:HttpClient
  ) { }

  create(data){
    return this.http.post(this.url, data);
  }
  
}
