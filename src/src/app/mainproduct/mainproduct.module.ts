import { NgModule }      from '@angular/core';
import { ShareGlobalModule}  from '../app/../shared/share.global.module';
import { HttpModule, JsonpModule } from '@angular/http';
import { MainproductRoutingModule } from './mainproduct.routing.module';
import {ProductService} from '../app/../service/server';
import {Dataservice} from '../app/../shared/dataservice';
import { MainproductComponent}  from './mainproduct.component';
import { Mainproduct}  from './mainproduct';
import { MainproductAdd}  from './mainproduct.add';
import { MainproductInAdd}  from './mainproduct.in.add';
import { MainproductOut}  from './mainproduct.out';
import { MainproductOutAdd}  from './mainproduct.out.add';
import { MainproductIn}  from './mainproduct.in';
import { MainproductMin}  from './mainproduct.min';
//import { ReportComponent}  from '../app/../report/report.component';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {DataTableModule,SharedModule,DropdownModule} from 'primeng/primeng';
@NgModule({ 
  imports:      [ HttpModule,MainproductRoutingModule,ShareGlobalModule,DataTableModule,SharedModule,DropdownModule,MessagesModule,GrowlModule ,FileUploadModule],
  declarations: [ MainproductComponent,Mainproduct,MainproductAdd,MainproductIn,MainproductInAdd,MainproductOut,MainproductOutAdd //,Supplier,SupplierAdd
,MainproductMin],
    exports:      [  MainproductComponent,Mainproduct,MainproductAdd,MainproductOut,MainproductOutAdd,MainproductIn,MainproductInAdd ,MainproductMin,
    DataTableModule,SharedModule,DropdownModule, MessagesModule,GrowlModule,FileUploadModule
    ],//],Supplier,SupplierAdd
   providers: []
})
export class MainproductModule { }