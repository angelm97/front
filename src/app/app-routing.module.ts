import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LikesComponent } from './components/likes/likes.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewsComponent } from './components/views/views.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {path:'', pathMatch:'full', component:HomeComponent, canActivate:[LoginGuard]},
  {path:'navbar', pathMatch:'full', component:NavbarComponent, canActivate:[LoginGuard]},
  //{path:'home', component:HomeComponent, canActivate:[LoginGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'perfil', component:PerfilComponent},
  {path:'likes', component:LikesComponent},
  {path:'views', component:ViewsComponent},



  {path:'**', redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
