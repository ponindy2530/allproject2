import {Component, ElementRef} from "@angular/core";    

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Dataservice} from '../app/../shared/dataservice';
import {ProductService} from '../app/../service/server';
import {Mainproduct} from './mainproduct';
import {MainproductInAdd} from './mainproduct.in.add';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as _ from "lodash";

@Component({
    selector: 'mainproductin',
   templateUrl: 'mainproduct.in.html'
})
export class MainproductIn { 
str:any=[];hos:any;stockins:any;substocks:any;numinstock:number;
isCell:any=[];snum:any=[]; lotid:any=[];bgUpdate:any=[];hcode:string;
tempstockinsfd=['lotid','numnow'];tempstockinsind=['desc','asc'];
txtSearch :string;catid:number;
constructor(private _productService: ProductService , private route: ActivatedRoute,
    private router: Router,public _dt:Dataservice, private confirmationService: ConfirmationService) {

  }
   getDeleteProduct(ev:any){


this.stockins.splice(ev.index,1);

}
getSearch(){
  
}
doMainstockin(lotid:number){
   // alert(lotid);
this.router.navigate(['main/mainproductinadd',lotid]);
}
doDeleteStockin(r:any,i:number){
   
     let st ={mid:r.mid,pricelot:r.pricelot,numstockin:r.numstockin,tbl:"mainstockin",updateId:"lotid="+r.lotid};
     let rs:any;
     this._productService.getDeleteStockin(st).subscribe(prodss => rs = prodss,err=>{alert("error")}
,()=>{
    this._productService.getDeleteRpstSubstock(r.lotid).subscribe(prodss => rs = prodss);
    this.stockins.splice(i,1);
 // console.log(JSON.stringify(this.products));
});

}
sortData(fd:any){
this.tempstockinsfd=[fd];
if(this.tempstockinsind[0]=='asc'){this.tempstockinsind[0] ='desc'}else{this.tempstockinsind[0] ='asc'}
}
 confirmDelete(r:any,i:any) {
        this.confirmationService.confirm({
            message: 'คุณต้องการลบ Recordนี้ ้?',
            accept: () => {
                //Actual logic to perform a confirmation
             //   console.log(r);
           //  console.log( this.stockins.indexOf(r));
              this.doDeleteStockin(r,this.stockins.indexOf(r));
            },
            reject:()=>{

            }
        });
    }
  ngOnInit() {
//this.setArray(30,30);
this._dt.isSide=false;
this._dt.contentcol = this._dt.contentmax;
//this.hcode = '10972';
this.hcode = this._dt.profile.hcode;

let pd:any;
let str = "select s.*,h.hname,m.numnow,m.mcode,m.mname,m.munit,m.catid,u.supname from mainstockin s,hcode h,mainproduct m ,supplier u ";
let str2 = " where s.hcode = h.hcode and s.mid = m.mid and s.supid = u.supid and s.hcode = '"+this.hcode+"'"; 
let str3 = str+str2;
pd={sql: str3};
//console.log(str3);
this._productService.getSql(pd).subscribe(prodss => this.stockins = prodss,err=>{alert("error")}
,()=>{
  //console.log(this.stockins);
//  let ss = _.sumBy(this.stockins,'numlotnow');
 // let ss _.sumBy(this.stockins, function(o:any) { return Number(o.numlotnow); });
  //console.log("ss="+ss)
  // let tempstockinsfd=['lotid','numnow'];let tempstockinsind=['desc','asc'];
   // let d = _.orderBy(this.stockins,tempstockinsfd,tempstockinsind);
// console.log(d);
});
  }
}