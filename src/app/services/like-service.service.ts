import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikeServiceService { 
  url:string = "http://localhost:8000/api/likes";

  constructor(
    private http:HttpClient
  ) { }

  crete(data){
    return this.http.post(this.url, data);
  }
}
