import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainproductComponent}  from './mainproduct.component';
import { Mainproduct}  from './mainproduct';
import { MainproductAdd}  from './mainproduct.add';
import { MainproductInAdd}  from './mainproduct.in.add';
import { MainproductOut}  from './mainproduct.out';
import { MainproductOutAdd}  from './mainproduct.out.add';
import { MainproductIn}  from './mainproduct.in';
import { MainproductMin}  from './mainproduct.min';
import { ReportComponent}  from '../app/../report/report.component';
//import { Maindata}  from './maindata';
//import { MainproductInAdd}  from './mainproduct.in.add';
//import { MainproductOut}  from './mainproduct.out';
//import { MainproductOutAdd}  from './mainproduct.out.add';
//import { MainproductIn}  from './mainproduct.in';
//import { Suppiler}  from './supplier';
@NgModule({
  imports: [
    RouterModule.forChild([
{ path: 'main', component:  MainproductComponent ,
  children:[
      {path:'',redirectTo:'mainproduct', pathMatch: 'full'},
   // { path: 'supplier', component:  Supplier },{ path: 'supplieradd/:supid', component:  SupplierAdd },
    { path: 'mainproduct', component:  Mainproduct }, { path: 'mainproductadd/:mid', component:  MainproductAdd }, 
     { path: 'mainproductin', component:  MainproductIn },
      { path: 'mainproductmin', component:  MainproductMin },
       { path: 'mainproductinadd/:lotid', component:  MainproductInAdd },
           { path: 'mainproductout', component:  MainproductOut },  { path: 'report', component: ReportComponent },
       { path: 'mainproductoutadd/:lotid', component:  MainproductOutAdd }
    ]
}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class MainproductRoutingModule {}

