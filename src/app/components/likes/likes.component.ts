import { Component, OnInit } from '@angular/core';
import { LikeServiceService } from 'src/app/services/like-service.service';
import { VideoServiceService } from 'src/app/services/video-service.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  user;
  video;
  videos;
  closeResult = '';

  constructor(
    private videoService:VideoServiceService,
    private likeService:LikeServiceService,

    
    ) { 
      this.user = {
      "user_name" : null,
      "fullname" : null,
      "image" : null,
      };
    }

  ngOnInit(): void {
    
    this.user['user_name'] = localStorage.getItem('user_name');
    this.user['fullname'] = localStorage.getItem('user_fullname');
    this.user['image'] = localStorage.getItem('user_Image'); 



    this.videoService.readLiked(localStorage.getItem('user_id')).subscribe(res=>{
      this.videos = res;
    // console.log(res)
    });


    
    
    //console.log('==>',localStorage.getItem('user'));

   // console.log('==>',localStorage.getItem('token'));
    
    

  }


  like(id){
    var data = {
      "video_id" : id,
      "user_id" : localStorage.getItem('user_id')
    }
    this.likeService.crete(data).subscribe(res=>{
     // console.log(res);
    });

  }

}
