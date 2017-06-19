import { NgModule }      from '@angular/core';
//import { CommonModule }       from '@angular/common';
//import { FormsModule }    from '@angular/forms';
//import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { ShareGlobalModule}  from '../app/../shared/share.global.module';
import { HttpModule, JsonpModule } from '@angular/http';
import { ReportRoutingModule } from './report.routing.module';
import {ProductService} from '../app/../service/server';
import {Dataservice} from '../app/../shared/dataservice';

import { ReportComponent}  from '../app/../report/report.component';
import {MessagesModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import { ReportInout}  from './report.inout';
import { ReportBudget}  from './report.budget';
//import { MainproductAdd}  from './mainproduct.add';
//import { MainproductInAdd}  from './mainproduct.in.add';
//import { MainproductIn}  from './mainproduct.in';
//import { MainproductOut}  from './mainproduct.out';
//import { MainproductOutAdd}  from './mainproduct.out.add';
//import {ModalModule} from "ng2-modal";
//import {SortPipe} from '../app/../pipe/hosuser.pipe';

//import {DeleteModal} from '../app/../directive/deletemodal';
import {DataTableModule,SharedModule,DropdownModule} from 'primeng/primeng';

@NgModule({ 
  imports:      [ HttpModule,ReportRoutingModule,ShareGlobalModule,DataTableModule,SharedModule,DropdownModule,MessagesModule,GrowlModule ,FileUploadModule],
  declarations: [ ReportInout, ReportComponent,ReportBudget//,Supplier,SupplierAdd
,],
    exports:      [  ReportComponent,ReportInout ,ReportBudget,
    DataTableModule,SharedModule,DropdownModule,MessagesModule,GrowlModule,FileUploadModule
    ],//],Supplier,SupplierAdd
   providers: []
})
export class ReportModule { }