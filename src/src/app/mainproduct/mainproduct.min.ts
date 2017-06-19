import { Component, ElementRef } from "@angular/core";
import { MainproductDt } from '../app/../service/model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Dataservice } from '../app/../shared/dataservice';
import { ProductService } from '../app/../service/server';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { SelectItem } from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import * as _ from "lodash";

@Component({
    selector: 'mainproductmin',
    templateUrl: './mainproduct.min.html'
})
export class MainproductMin {
    constructor(private _productService: ProductService, private route: ActivatedRoute,
        private router: Router, public _dt: Dataservice, private confirmationService: ConfirmationService) {
        
    }
    msgs: Message[] = [];
    show() {
    this.msgs.push({severity:'info', summary:'ข้อความประกาศ', detail:'บันทึกเรียบร้อย'});
}

hide() {
    this.msgs = [];
}
  doMainproduct(p: any) {
      this.hide();
      p['updateId']= " mid =" + p.mid;
      p['lastupdate']=  (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');//new Date().toISOString().slice(0, 19).replace('T', ' ');

      // console.log(p);
       let xx:any;
        this._productService.getAdd(p, 'mainproduct').subscribe(prods => xx = prods, err => { console.log(err);
        }, () => {console.log('บันทึกเรียบร้อยแล้ว');
        this.show();
        });
    }

    mproducts:any=[];
hcode:string;
     ngOnInit() {
 //        var formatedMysqlString = (new Date ((new Date((new Date(new Date())).toISOString() )).getTime() - ((new Date()).getTimezoneOffset()*60000))).toISOString().slice(0, 19).replace('T', ' ');
//console.log( formatedMysqlString );


 this.hcode = "10702";
       if( this._dt.profile.hcode){
       this.hcode = this._dt.profile.hcode;}
        this._dt.isSide=false;
this._dt.contentcol = this._dt.contentmax;
let pd: any;
        pd = { sql: "select  * from mainproduct p ,categories c  where p.catid = c.catid  and hcode = '" + "10702" + "' order by p.mcode" };
        this._productService.getSql(pd).subscribe(prodss => this.mproducts = prodss, err => { alert("error") }
        , () => {});
     }
}