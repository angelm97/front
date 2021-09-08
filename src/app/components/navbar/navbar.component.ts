import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  buscador:string;
  user:any;
  token:string;


  constructor(
    private route:Router,
    private login:LoginServiceService
    ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.login.getUser().subscribe(res=>{
      this.user = res;
    });

    this.ngOnInit();

    this.route.navigate(['/']);


  }

  dropdownOpen(num) {
    var element = document.getElementById('dropdown-' + num);
    if (element.style.display == 'block') {
      element.style.display = 'none';
    } else {
      this.closeAllDropdown();
      element.style.display = 'block';
    }
  }

  closeAllDropdown(){
    document.getElementById('dropdown-4').style.display = 'none';
  }

  logOut(){
    localStorage.removeItem('token'); 
    localStorage.removeItem('user_id'); 
    localStorage.removeItem('user_Image');
    localStorage.removeItem('user_fullname');
    localStorage.removeItem('user_name');
    this.ngOnInit()
    this.route.navigate(['/login']);
  }

}

