import {Component, ElementRef} from "@angular/core";    

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Dataservice} from '../app/../shared/dataservice';
import {ProductService} from '../app/../service/server';
import {Mainproduct} from './mainproduct';
import {MainproductOutAdd} from './mainproduct.out.add';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import * as _ from "lodash";

@Component({
    selector: 'mainproductout',
   templateUrl: 'mainproduct.out.html'
})
export class MainproductOut { 
str:any=[];hos:any;stockouts:any;substocks:any;numinstock:number;
isCell:any=[];snum:any=[]; lotid:any=[];bgUpdate:any=[];hcode:string;
tempstockoutsfd=['lotid','numnow'];tempstockoutsind=['desc','asc'];
txtSearch :string;
constructor(private _productService: ProductService , private route: ActivatedRoute,
    private router: Router,public _dt:Dataservice, private confirmationService: ConfirmationService) {

  }
   getDeleteProduct(ev:any){


this.stockouts.splice(ev.index,1);

}
getSearch(){
  
}


    doDeleteStockout(soid: number, mid: number, i: number) {
        let isCando:any;
    this._productService.getLastSoid(soid, mid).subscribe(prodss => isCando = prodss, err => { alert(err) }
        , () => {
            console.log(isCando);
    if (isCando[0] == "1") { //alert("ลบรายการได้");
                let st ={tbl:"mainstockout",updateId:"soid="+soid};
                    let rs:any;
                    this._productService.getDeleteSoAndUpdateLot2begin(soid).subscribe(prodss => rs = prodss,err=>{alert(err)}
                ,()=>{
                    this.stockouts.splice(i,1);
                });

    } else { 

        alert("ไม่สามารุถลบรายการได้เนื่องจากไม่ใช่รายการเบิกสุดท้ายของวัสดุนี้");
    }
});


}

 confirmDelete(r:any,i:any) {
        this.confirmationService.confirm({
            message: 'คุณต้องการลบ Recordนี้ ้?',
            accept: () => {
                //Actual logic to perform a confirmation
                console.log(r);
           //  console.log( this.stockins.indexOf(r));
              this.doDeleteStockout(r.soid,r.mid,this.stockouts.indexOf(r));
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
//let str = "select s.*,h.hname,m.numnow,m.mcode,m.mname,m.munit,m.catid,u.supname from mainstockin s,hcode h,mainproduct m ,supplier u ";
//let str2 = " where s.hcode = h.hcode and s.mid = m.mid and s.supid = u.supid and s.hcode = '"+this.hcode+"'"; 
//let str3 = str+str2;
let str4 = "select m.mcode,m.mname,o.datestockout,o.soid,o.hcode,o.lotnumber,o.mid,o.numstockout,o.priceout,r.rcid,r.rcname from mainstockout o ,mainproduct m,receiver r  where o.receiver = r.rcid and o.mid = m.mid and o.hcode = '"+this.hcode+"'";
pd={sql: str4};
//console.log(str3);
this._productService.getSql(pd).subscribe(prodss => this.stockouts = prodss,err=>{alert(err)}
,()=>{
  // let tempstockinsfd=['lotid','numnow'];let tempstockinsind=['desc','asc'];
   // let d = _.orderBy(this.stockins,tempstockinsfd,tempstockinsind);
//console.log(this.stockouts);
});
  }
}