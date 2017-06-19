import { Component, ElementRef } from "@angular/core";
import { MainproductDt } from '../app/../service/model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Dataservice } from '../app/../shared/dataservice';
import { ProductService } from '../app/../service/server';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';

import { SelectItem } from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {Message} from 'primeng/primeng';
import * as _ from "lodash";
import {FileUploadModule} from 'primeng/primeng';
@Component({
    selector: 'mainproduct',
    templateUrl: './mainproduct.html'
})
export class Mainproduct {
    str: any = []; hos: any; products: any; substocks: any; numinstock: number; txtSearch: string;
    isCell: any = []; snum: any = []; mid: any = []; bgUpdate: any = []; hcode: string; catid: number; categories: any = []; mproducts: any = []; mpd: any = []; displayNewPd = false;
    sortfd = ['mcode']; sortind = ['asc', 'desc']; displayDialog: boolean; model = new MainproductDt(); ind: number; tempproducts: any = []; catname: string;
    munits: any = []; funits: any = []; lightgrey = "bkGrey"; str0: string = ""; str1: string; iscolor = true; nn: any = []; cats: any = []; brands: SelectItem[];
    cities: SelectItem[];categoriesOptions:any=[];
 msgs: Message[];
    selectedCity: string;

    cars: SelectItem[];

    selectedCar: string = 'BMW';
    constructor(private _productService: ProductService, private route: ActivatedRoute,
        private router: Router, public _dt: Dataservice, private confirmationService: ConfirmationService) {
        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });
    }
    selectCar(ev: any) {
       // console.log(ev);
    }
    onDelete(ev: any) {
      //  console.log(ev);
       // console.log('zz');

    }
    id: number = 300;
    prepRequest(ev) { 
 ev.formData.append('context', 'themes');
    ev.formData.append('op', 'process_upload');
    ev.formData.append('id', this.id);
  //  ev.xhr.withCredentials = true;
    return false;
    }
   confirmDelete(r:any) {
        this.confirmationService.confirm({
            message: 'คุณต้องการลบ Recordนี้ ้?',
            accept: () => {
                //Actual logic to perform a confirmation
               // console.log(r);
             //  console.log( this.mproducts.indexOf(r));
               this.mproducts.splice(this.mproducts.indexOf(r), 1);
            },
            reject:()=>{

            }
        });
    }

   
    
    uploadedFiles: any[] = [];

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
    onSubmitSaveModel() {

        if (this.model.mid > 0) {
            this.model['updateId'] = " mid =" + this.model.mid;
            // alert(  this.model['updateId']);
        } else {
            //  _.find(users, ['active', false]);
            if (_.find(this.mproducts, ['mname', this.model.mname])) {
                alert("โปรดป้อนชื่อที่ไม่ซ้ำกับที่มีอยู่แล้ว");
                return;
            }

            this.model['updateId'] = "0";
            this.model.hcode = this._dt.profile.hcode;
            //  alert("none");
        }
        this.displayDialog = false;
        // if(1){return;}
        let xx: any;
        this._productService.getAddLastId(this.model, 'mainproduct', 'mid').subscribe(prods => xx = prods, err => { console.log(err) }, () => {
            if (this.model.mid > 0) {
                for (let prop in this.model) {
                    this.mproducts[this.ind][prop] = this.model[prop];
                }
            } else {
                this.displayNewPd = true;
                //console.log(xx);
                this.model.mid = Number(xx[0]);
                //alert("test"+this._dt.profile.hcode);
                //console.log(this.model);
                this.tempproducts.push(this.model);
                this.mproducts.push(this.model);
            }
            this.displayDialog = false;
        });
    }
    doMainproduct(p: any, i: number) {
        for (let prop in p) {
            this.model[prop] = p[prop];
        }
        this.ind = this.mproducts.indexOf(p);
//console.log(this.model);
     //  console.log("ind="+this.ind);
        this.displayDialog = true;
    }
  showProduct:any;
    doRowClick(ev:any){
      //  console.log("test");
      //  console.log(ev);
        this.showProduct = ev.data;
this.doShowProduct(ev.data) ;

    }
    displayDialogShowProduct = false;
    productinouts:any=[];
  
   doShowProduct(p: any) {
        this.mid = p.mid;
        //console.log("ind="+this.ind);
        let sql=  ` 
        SELECT * FROM ((select s.hcode,s.mid,m.mname,m.mcode,m.numnow,' ' as receiver,datestockin as datestock,'in' as account,lotid,numstockin,pricen,pricelot,numlotnow,stockvaluein,stocknumin,0 as datestockout,0 as soid,0 as numstockout ,0 as priceout,0 as stockvalueout,0 as stocknumout,p.supid,p.supname from mainstockin s left join mainproduct m on s.mid = m.mid inner join supplier p on s.supid = p.supid order by s.datestockin)
 union  (select s.hcode,s.mid,m.mname,m.mcode,m.numnow,r.rcname as receiver,datestockout as datestock,'out' as account,0 as lotid,0 as numstockin,0 as pricen,0 as pricelot,0 as numlotnow,0 as stockvaluein,0 as stocknumin,datestockout,soid,numstockout,priceout,stockvalueout,stocknumout,' ' as supid,' ' as supname from mainstockout s  left join mainproduct m on s.mid = m.mid inner join receiver r on s.receiver = r.rcid  order by datestockout)
) as u where mid = ${this.mid}
 `;
 //sql=`select * from mainproduct`;
 //console.log(sql);
 
  let sql1 = { sql: sql  };
        this._productService.getSql(sql1).subscribe(resproducts => this.productinouts = resproducts, err => {console.log(err) }, () => {
     //      // console.log(this.stockinouts);
     console.log(this.productinouts);
        this.displayDialogShowProduct = true;
      // this.stockinouts=     _.orderBy(this.stockinouts, ['datestock', 'account'], ['asc', 'asc']);
             //  console.log(this.stockinouts);
            // this.cats
          // this.categories.push({ label: 'All Cats', value: null });
        });
     
    }

    bgcolor="#aaffaa";
getColor(r:any,fd:any){
   if(fd !="header"){
    if(this.bgcolor=="#aaffaa"){
       this.bgcolor="#ffaaaa";
    }else{
     this.bgcolor="#aaffaa"   
    }
    return  this.bgcolor;
}else{

}
}
doShowStockValue(ev:any){

 
    return Number(ev['stockvaluein']) + Number(ev['stockvalueout']);
}
stockinouts:any=[];
ngOnInit() {
    let ar:any = [];
   // this._productService.getHdc().subscribe(resproducts => ar = resproducts
   //     , err => { console.log(err);}, () => {console.log("ll"); }
  //  );
        //_.filter(this.munits, ['munit', ev.query]);

        //  });
        
        this._dt.isSide=false;
this._dt.contentcol = this._dt.contentmax;
        this.brands = [];
        this.brands.push({ label: 'All Brands', value: null });
        this.brands.push({ label: 'Audi', value: 'Audi' });
        this.hcode = "10702";
       if( this._dt.profile.hcode){
       this.hcode = this._dt.profile.hcode;}
        //this.setArray(30,30);
        //this.hcode = '10972';
                let sql = { sql: "select * from categories" };
        this._productService.getSql(sql).subscribe(resproducts => this.categoriesOptions = resproducts);
     sql = { sql: "select distinct munit from mainproduct " };
        this._productService.getSql(sql).subscribe(resproducts => this.munits = resproducts);
        //_.filter(this.munits, ['munit', ev.query]);

        //  });

        //console.log(JSON.stringify(this._dt));
        //alert(this.hcode );
        sql = { sql: "select catname as label,catname as value from categories" };
        this._productService.getSql(sql).subscribe(resproducts => this.categories = resproducts, err => { }, () => {
            // this.cats
            this.categories.push({ label: 'All Cats', value: null });
        });
       
let mysql1:string =" (select s.hcode,s.mid,m.mname,m.mcode,m.numnow,datestockin as datestock,'in' as account,lotid,numstockin,pricen,pricelot,numlotnow,stockvaluein,stocknumin,0 as datestockout,0 as soid,0 as numstockout ,0 as priceout,0 as stockvalueout,0 as stocknumout from mainstockin s";
let mysql2:string =" left join mainproduct m on s.mid = m.mid order by s.datestockin)";

let mysql3:string =  " union  (select s.hcode,s.mid,m.mname,m.mcode,m.numnow,datestockout as datestock,'out' as account,0 as lotid,0 as numstockin,0 as pricen,0 as pricelot,0 as numlotnow,0 as stockvaluein,0 as stocknumin,datestockout,soid,numstockout,priceout,stockvalueout,stocknumout from mainstockout s ";
 let mysql4 = " left join mainproduct m on s.mid = m.mid  order by datestockout )";

      
        sql = { sql: mysql1+mysql2 +mysql3+mysql4 }; console.log(sql);
        
        this._productService.getSql(sql).subscribe(resproducts => this.stockinouts = resproducts, err => { }, () => {
           // console.log(this.stockinouts);
       this.stockinouts=     _.orderBy(this.stockinouts, ['datestock', 'account'], ['asc', 'asc']);
             //  console.log(this.stockinouts);
            // this.cats
          // this.categories.push({ label: 'All Cats', value: null });
        });

        let pd: any;
        pd = { sql: "select  * from mainproduct p ,categories c  where p.catid = c.catid  and hcode = '" + this.hcode + "' order by p.mcode" };
        this._productService.getSql(pd).subscribe(prodss => this.mproducts = prodss, err => { alert("error") }
            , () => {
               
//let mp =_.uniqBy(this.mpd , this.mpd.mcode.split(' '))

                let i = -1;
let buskets:any=[];
                for (let p of this.mproducts) {
                    i++;
                    let ar = p.mcode.split(' ');
                    p['mgroup'] = ar[0];
//buskets.push(ar[0]);
                    //this.nn[i] = this.getBgColor(p,i);
                    //console.log(p.mcode+" -"+ this.nn[i]);
                }
                 this.mpd = this.mproducts;
               // console.log(buskets);

              //  let db:any =[];
               // db =  _.uniqBy(buskets,JSON.stringify);
                  // console.log(db);
                // console.log(JSON.stringify(this.products));
            });
    }

}