import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  error: boolean;
  uname: boolean;
  uemail: boolean;

  constructor(
    private fb: FormBuilder,
    private login: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      last_name: '',
      user_name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
  }

  submit() {
    this.loading = true;
    this.uname = false;
    this.uemail = false;
    const data = this.form.getRawValue();
    const req = {
      name: data.name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password: data.password,
    };

    var datos = JSON.parse(JSON.stringify(req));

    this.login.register(datos).subscribe((res) => {
      res = JSON.parse(res);
      // this.router.navigate(['/login']);
      if (res['email'] > 0) {
        this.uemail = true;
        this.loading = false;
      }

      if (res['user'] > 0) {
        this.uname = true;
        this.loading = false;
      }

      if (res['mensaje'] == 'user created successfully!') {
        const data = {
          username: req.email,
          password: req.password,
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
        })
      }
    });
  }
}
