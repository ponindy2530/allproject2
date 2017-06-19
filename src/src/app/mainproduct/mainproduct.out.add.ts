import { Component, ElementRef } from "@angular/core";
import { Location } from '@angular/common';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Dataservice } from '../app/../shared/dataservice';
import { ProductService } from '../app/../service/server';
import { Mainstockout } from '../app/../service/model';
import * as _ from "lodash";
import { UserHosPipe,SortPipe } from '../app/../pipe/hosuser.pipe';
//import { SortPipe } from '../app/../pipe/hosuser.pipe';


import { Mainproduct } from './mainproduct';
import { MainproductIn } from './mainproduct.in';
import { MainproductOut } from './mainproduct.out';
//import {UsernamePipe} from '../app/../pipe/hosuser.pipe';
@Component({
    selector: 'mainroductout-add',
    templateUrl: 'mainproduct.out.add.html'
})
export class MainproductOutAdd {
    str: any = []; hos: any; cup: any; products: any; substocks: any; numinstock: number; models: any = []; categories: any = []; 
    suppliers: any = []; oldnum: number = 0; product: any; numnow: number; mproducts: any = [];mproductSups:any=[];
    isCell: any = []; snum: any = []; lotid: any;soid:any; bgUpdate: any = []; model = new Mainstockout(); munit: string;pricepattern="\d+(\.\d{2})?";
    fdSearchId=0;txtSearch="";isStockFilter=false;supid=0;stockins:any=[]; stockinlots:any=[];mps:any=[];hcode="";
    datepattern="\d{2}/\d{2}/\d{4}";
    tempstockouts:any=[];tsc:any=[];
    tempstockoutsfd=['lotid'];tempstockoutsind=['DESC'];
    constructor(private _location: Location, private _productService: ProductService, private route: ActivatedRoute,
        private router: Router, public _dt: Dataservice) {

    }
    onCancel() {
        // this._location.back();
        this.router.navigate(["main/mainproductout"]);
    }
doFilterStock(e:any){
    if(e.target.checked){this.isStockFilter=true;
       // console.log(e.target.checked);
//this.mproducts= _.filter(this.mproducts, ['numlotnow', 0]);  
this.mps =  _.filter(this.mproducts, function(o) { return o['numnow'] >0; });
    }else{this.isStockFilter=false;
this.mps =   _.filter(this.mproducts, function(o) { return o; });  
    }


}
isEnable=true;
checkSave(){

    if(this.numnow < this.model.numstockout){
        alert("จำนวนเบิกมากกว่าจำนวนในStock โปรดแก้ไขให้ถูกต้อง");
        return false;
    }
    return true;
}
stockvalueout=0;
stocknumout=0;
    onSubmit() {
      
if(! this.checkSave()){return false};
        if (this.soid > 0) {
            this.model['updateId'] = " soid =" + this.model.soid;
        } else {
            this.model['updateId'] = "0";
        }

        let xx: any;
       this.model.hcode = this.hcode;
        this._productService.getAddLastId(this.model, 'mainstockout','soid').subscribe(prods => xx = prods, err => { console.log('yyyxxxx'+err);
        }, () => {
                   
      let soid = Number(xx) ;console.log('soid='+ soid);
  //      console.log(this.numnow);  console.log(this.stockvalue);
  this._productService.getUpdateStock(soid,this.model.mid,this.numnow,this.model.numstockout,this.stockvalue).subscribe(prods => xx = prods
  ,err=>{console.log("err xxxxxxxxxxxxxxxxxxxxxxxx="+err)},()=>{

 //console.log(JSON.stringify(xx));
 //this.model['lotnumber'] = "hhhhh";
  });
let res = _.find(this.mproducts, ['mid', this.model.mid]);
this.model['mname'] = res['mname'];
this.model.soid = soid;
this.model.lotnumber =JSON.stringify(xx);
this.tempstockouts.push(this.model);
//console.log('tempo=');
//console.log(this.tempstockouts);
//console.log('modwl=');
//console.log(this.model);
let date = this.model.datestockout;
 this.model=new Mainstockout();
 this.model.datestockout = date;

console.log("Done Submit");
        });
 
    }
    setUnit(mid:number){
        
         let res = _.find(this.mproducts, ['mid', mid]);
         this.munit = res['munit'];
         this.numnow = res['numnow'];
           this.stockvalue = res['stockvalue'];
           if(this.numnow==0){this.isEnable=false;}else{this.isEnable=true;}
    }
    stockvalue=0;
    setMid(obj: any) {

        this.munit = obj.munit;
        this.model.mid = obj.mid;
        this.numnow = obj.numnow;
     this.stockvalue = obj.stockvalue;
       if(this.numnow==0){this.isEnable=false;}else{this.isEnable=true;}
      //  this.stockvalueout = this.num
    }
   
   doCheckNum(){
       if(this.model.numstockout > this.numnow)
       {
           alert("จำนวนเบิกมากกว่าจำนวนที่มีใน Stock");
           return false;
       }
   }
    doLowertxt(txt:string) {
   this.txtSearch =  txt.toLowerCase();
   // console.log(this.txtSearch);
   // console.log(this.txtSearch.toLowerCase());
   }
    receivers:any=[];
    ngOnInit() {
    
         this.hcode = this._dt.profile.hcode;
        let sql = { sql: "select * from categories" };
        this._productService.getSql(sql).subscribe(resproducts => this.categories = resproducts);
         sql = { sql: "select * from receiver" };
        this._productService.getSql(sql).subscribe(resproducts => this.receivers = resproducts);
        sql = { sql: "select * from mainproduct where hcode =  '"+this.hcode +"'" };  console.log(sql);
        this._productService.getSql(sql).subscribe(resproducts => this.mproducts = resproducts, err => { }, () => { 
       this.mps =  _.filter(this.mproducts, function(o) { return o['numnow'] >0; });    
     // console.log('mp='+this.mproducts);
      // console.log(sql);
        });
    //    sql = { sql: "select * from mainproduct m left join mainstockin s on m.mid = s.mid where m.hcode =  '"+this.hcode +"'  group by m.mname order by m.mname" };
    //    this._productService.getSql(sql).subscribe(resproducts => this.mproductSups = resproducts, err => { }, () => { console.log(this.mproductSups); });

 sql = { sql: "select * from mainstockin where mid =1 and m.hcode =  '"+this.hcode +"' order by datestockin  " };
        this._productService.getSql(sql).subscribe(resproducts => this.stockins = resproducts, err => { }, () => {  });
      //   sql = { sql: "select * from mainproduct m left join mainstockout s on m.mid = s.mid where m.hcode = '10972'  group by m.mname order by m.mname" };
       // this._productService.getSql(sql).subscribe(resproducts => this.mproductSups = resproducts, err => { }, () => { console.log(this.mproductSups); });

        sql = { sql: "select * from supplier" };
        this._productService.getSql(sql).subscribe(resproducts => this.suppliers = resproducts, err => { }, () => {//console.log(this.suppliers)
        });
        this.route.params.forEach((params: Params) => {
            let hcode = params['hcode']; this.soid = params['soid'];
            this.hos = this._dt.hos;
            this.cup = this._dt.cup;

          

               // this.model.hcode = this._dt.cup['hcode'];
this.model.datestockout = this._productService.fnGetnow();
           //     let sql = { sql: "select * from mainstockout s order by soid DESC limit 1" };
             //   this._productService.getSql(sql).subscribe(resproducts => this.models = resproducts, err => { }, () => {
                
               // });

           
            
            
        });


    }
}


