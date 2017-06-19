import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Dataservice} from './shared/dataservice';
import {ProductService} from './service/server';
import { CalculatorComponent}  from './calculator/calculator.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _productService: ProductService , private route: ActivatedRoute,
    private router: Router,public _dt:Dataservice) {

  }
    models:any[];products:any;hosname:string;
  isLogin:any;isSide=true;
  isHowSidebar=true;contentbar="col-sm-8";sidebar="col-sm-4";


  apptitle = ' Smart Personnel ( ข้อมูลบุคลากรสาธารณสุขจังหวัดชัยภูมิ )  V4.0';
  appicon = 'glyphicon glyphicon-home';
  // cklogin = false;


  // appmanu = [
  //   {
  //     btnid: 1,
  //     btna: '/logout',
  //     btnname: 'ออกจากระบบ',
  //     btnicon: 'btn btn-default pull-right',
  //     icon: 'fa fa-unlock'
  //   },
  //   {
  //     btnid: 2,
  //     btna: '/login',
  //     btnname: 'เข้าสู่ระบบ',
  //     btnicon: 'btn btn-primary pull-right',
  //     icon: 'fa fa-lock'

  //   }

  // ];


   reload(){
 //   location.reload();
   // location.replace("localhost:4200");
    //location.reload();
if(location.hostname=="localhost"){location.href = 'http://localhost:4200';}else{location.href = 'http://dmfzero.com/dentmat';}
  // 
  }
  ngOnInit(){
    
this.isLogin = Dataservice.isLogin;
if(Dataservice.loguser){
 // this.hosname = JSON.stringify(this._dt);
this._dt.profile =Dataservice.loguser;
}
this._dt.profile={"hcode":"10702","hname":"รพ.ชย"};
this._dt.cup={"cupcode":"10702","cupnahme":"รพ.เกษตรสมบูรณ์"};
  //  this._dt.cup.cupname="รพ.เกษตรสมบูรณ์";
 this._productService.getProductList(this._dt.cup.cupcode)
  .subscribe(resproducts => this._dt.cup.productlist = resproducts);
 this._productService.getUserList(this._dt.cup.cupcode)  .subscribe(resproducts => this._dt.userhos = resproducts);
this. getpv();

  }
  toggleSideNav(){
this._dt.isSide = ! this._dt.isSide;
if(this._dt.contentcol == this._dt.contentmax){
  this._dt.contentcol = this._dt.contentmin
}else{
  this._dt.contentcol = this._dt.contentmax
}
  }
  getLogged(ev:any){
this.router.navigateByUrl('/login');

  }
  logout(){
this.isLogin = false;
 Dataservice.isLogin = false;
 Dataservice.loguser=false;
 this._dt.isLog=false;
this._dt.setup();
//console.log(this._dt);
this.router.navigateByUrl('/logout');
  //  this
  }
  goRpst(r:any){
this._dt.hos=r;
       this.router.navigate(['/rpst', r.hcode]);
  }
    getpv(){
  //this.khet = k;
 //console.log(k);
 this._productService.getRpstList()
  .subscribe(resproducts => this.models = resproducts,
          err => console.log(err),
                 ()=>{
                 
                 //  console.log(this.models);
                  }
          );
          this._productService.getProductList('10972').subscribe(resproducts => this.products = resproducts );       

}

}
