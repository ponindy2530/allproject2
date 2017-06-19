import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import { HomeComponent}  from './home/home.component';
import {LoginComponent}  from './login/login';
import {LogoutComponent}  from './login/logout';
import { CalculatorComponent}  from './calculator/calculator.component';
import {UserstockoutComponent}  from './userstockout/userstockout.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
{ path: '', component:  HomeComponent },{ path: 'home', component:HomeComponent }
 ,{ path: 'login', component:  LoginComponent } ,{ path: 'logout', component:  LogoutComponent }
  ,{ path: 'calculator', component:  CalculatorComponent }  
  ,{ path: 'userstockout', component:  UserstockoutComponent }  
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
