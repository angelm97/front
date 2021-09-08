import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LikeServiceService } from 'src/app/services/like-service.service';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { VideoServiceService } from 'src/app/services/video-service.service';
import { ViewServiceService } from 'src/app/services/view-service.service';
import { NavbarComponent } from '../navbar/navbar.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[NavbarComponent ]
})
export class HomeComponent implements OnInit {
  user;
  video;
  videos;
  closeResult = '';

  constructor(
    private http: HttpClient, 
    private login:LoginServiceService, 
    private navbar: NavbarComponent,
    private modalService: NgbModal,
    private videoService:VideoServiceService,
    private likeService:LikeServiceService,
    private viewService:ViewServiceService
    
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



    this.videoService.read(localStorage.getItem('user_id')).subscribe(res=>{
      this.videos = res;
    // console.log(res)
    });

    
    
    this.navbar.ngOnInit();

    
    
    //console.log('==>',localStorage.getItem('user'));

   // console.log('==>',localStorage.getItem('token'));
    
    

  }


  fileData(data) {
    this.video = data.target.files[0];
  }

  updateVideo() {

    var formData = new FormData();
    formData.append('video', this.video);
    formData.append('user_id',  localStorage.getItem('user_id'));
    formData.append('user_name',  localStorage.getItem('user_name'));

    this.videoService.create(formData).subscribe(res=>{
     // console.log(res);
    },
    err=>{
     // console.log(err);
    })

  }

  //set view
  onTimeUpdate(value, id){
    
   // console.log(value.target.currentTime);

    if (value.target.currentTime > 7.8 && value.target.currentTime < 8.0) {
      var data = {
        "video_id" : id,
        "user_id" : localStorage.getItem('user_id')
      }
      this.viewService.create(data).subscribe(res=>{
       // console.log(res);
      });  
    }
    
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  

}
