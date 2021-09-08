import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  user:any;
  image:string;

  constructor(
    private login:LoginServiceService
  ) { }

  ngOnInit(): void {

    this.login.getUser().subscribe(res => {
      this.user = res;
      console.log(res);
    });
    
    
  }

}
