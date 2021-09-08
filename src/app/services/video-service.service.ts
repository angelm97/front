import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoServiceService {
  url:string;
  constructor(
    private http:HttpClient
  ) { 
    this.url = "http://localhost:8000/api/videos/";
  }

  create(data){
    return this.http.post(this.url, data , {responseType: 'text'});
  }

  read(id){
    return this.http.post(this.url + "get", {"id" : id});
  }

  readLiked(id){
    return this.http.post(this.url + "liked", {"id" : id});
  }

  readViewed(id){
    return this.http.post(this.url + "viewed", {"id" : id});
  }

  
  
}
