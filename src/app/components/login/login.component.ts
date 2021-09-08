import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  loading:boolean;
  error:boolean;

  constructor(
    private fb:FormBuilder, 
    private login:LoginServiceService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: ''
  
    });
  }

  submit(){
    this.error = false;
    this.loading = true;
    const formData = this.form.getRawValue();

    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: "password",
      client_id: 2,
      client_secret: "4iGi4Zewa5h9IZY5pQo8mb9NlMeqc6A292ebABfD",
      scope: "*"
    };

    this.login.login(data).subscribe(res=>{
      localStorage.setItem('token', res['access_token']);
        this.login.getUser().subscribe(res_user=>{
          var full_name = res_user['name'] + ' ' + res_user['last_name'];
          localStorage.setItem('user_id', res_user['id']);
          localStorage.setItem('user_Image', res_user['image']);
          localStorage.setItem('user_fullname', full_name);
          localStorage.setItem('user_name', res_user['user_name']);
          this.loading = false;
          this.router.navigate(['/']);
        });
   
      
    },
    error =>{
      this.loading = false;
      this.error = true;
    });

  }

}
