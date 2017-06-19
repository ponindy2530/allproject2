import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReportComponent}  from './report.component';
import { ReportInout}  from './report.inout';
import { ReportBudget}  from './report.budget';
@NgModule({
  imports: [
    RouterModule.forChild([
{ path: 'main/report', component:  ReportComponent ,
  children:[
      {path:'',redirectTo:'ReportInout', pathMatch: 'full'},{ path: 'reportinout', component:  ReportInout },{ path: 'reportbudget', component:  ReportBudget }
   // { path: 'supplier', component:  Supplier },{ path: 'supplieradd/:supid', component:  SupplierAdd },
  //  { path: 'mainproduct', component:  Mainproduct }, { path: 'mainproductadd/:mid', component:  MainproductAdd }, 
//    { path: 'mainproductin', component:  MainproductIn },
 //      { path: 'mainproductinadd/:lotid', component:  MainproductInAdd },
  //         { path: 'mainproductout', component:  MainproductOut },  { path: 'report', component: ReportComponent },
 //      { path: 'mainproductoutadd/:lotid', component:  MainproductOutAdd }
    ]
}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ReportRoutingModule {}

