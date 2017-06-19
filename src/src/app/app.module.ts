import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import {ShareGlobalModule} from './shared/share.global.module';
import {ProductService} from './service/server';
import {Dataservice} from './shared/dataservice';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { LoginComponent}  from './login/login';
import { LogoutComponent}  from './login/logout';
import { AppComponent } from './app.component';
import { MainproductRoutingModule}  from './mainproduct/mainproduct.routing.module';
import { MainproductModule}  from './mainproduct/mainproduct.module';
import { ReportRoutingModule}  from './report/report.routing.module';
import { ReportModule}  from './report/report.module';
//import { CarService } from './service/carservice';
import { HomeComponent } from './home/home.component';
import { CanvasComponent } from './canvas/canvas.component';
//import { ReportComponent } from './report/report.component';
//import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2MapModule} from 'ng2-map';
import {RadioButtonModule} from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';
import { UserstockoutComponent } from './userstockout/userstockout.component';
import { BaseMainComponent } from './base/base-main/base-main.component';
import { BaseAddComponent } from './base/base-add/base-add.component';
import { SupplierComponent } from './supplier/supplier.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent ,LoginComponent,LogoutComponent, CanvasComponent, UserstockoutComponent, BaseMainComponent, SupplierComponent, BaseAddComponent
  ],
  imports: [
    BrowserModule,RadioButtonModule,
     Ng2MapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyCb5c-L17BV8iPkxl7hYvtrRNE-f3sJVeE'})
   , 
   AppRoutingModule,ShareGlobalModule,MainproductModule,MainproductRoutingModule,ReportModule,ReportRoutingModule,ScheduleModule
  ],
  
  providers: [ProductService,Dataservice,ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
