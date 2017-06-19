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
  selector: 'report-budget',
  templateUrl: './report.budget.html'
})
export class ReportBudget  {
    str: any = []; hos: any; products: any; substocks: any; numinstock: number; txtSearch: string;
    isCell: any = []; snum: any = []; mid: any = []; bgUpdate: any = []; hcode: string; catid: number; categories: any = []; mproducts: any = []; mpd: any = []; displayNewPd = false;
    sortfd = ['mcode']; sortind = ['asc', 'desc']; displayDialog: boolean; model = new MainproductDt(); ind: number; tempproducts: any = []; catname: string;
    munits: any = []; funits: any = []; lightgrey = "bkGrey"; str0: string = ""; str1: string; iscolor = true; nn: any = []; cats: any = []; brands: SelectItem[];
    cities: SelectItem[];
    thmonths:SelectItem[]; selectReceivers:SelectItem[]; rcid:number;  thyears:SelectItem[]; budgetOuts:any=[];
    budgetIns:any=[];m1:number;m2:number;y1:number;y2:number
months = ["มกราคม","กุมภาพันธ์","มีนาคม",
"เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน",
"ตุลาคม","พฤศจิกายน","ธันวาคม"];
years=['2559','2560','2561','2562','2563','2564'];
monthbudgets = ["ตุลาคม","พฤศจิกายน","ธันวาคม","มกราคม","กุมภาพันธ์","มีนาคม",
"เมษายน","พฤษภาคม","มิถุนายน", "กรกฎาคม","สิงหาคม","กันยายน"
];
//years=['2559','2560','2561','2562','2563','2564'];
ds:Date = new Date();
currentTime = new Date()
// returns the month (from 0 to 11)
 monthnow = this.currentTime.getMonth() + 1

yearnow = this.currentTime.getFullYear()+543;

mm: SelectItem[];

    selectedCity: string;
  constructor(private _productService: ProductService, private route: ActivatedRoute,
        private router: Router, public _dt: Dataservice, private confirmationService: ConfirmationService) {
this.mm=[];let i=0;
   this.thmonths = []; this.thyears = [];
        this.thmonths.push({label:'เลือกเดือน', value:null});
        for(let n of this.monthbudgets){i++;
this.thmonths.push({label:n, value:i});

        }
          this.thyears.push({label:'เลือกปี', value:null});
                for(let n of this.years){
this.thyears.push({label:n, value:Number(n)});

        }
          //    this.cities.push({label:'New York', value:{id:1, name: 'New York', code: 'NY'}});
   //     this.cities.push({label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}});
   //     this.cities.push({label:'London', value:{id:3, name: 'London', code: 'LDN'}});
   //     this.cities.push({label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}});
    //    this.cities.push({label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}});


        }
        pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
        mBegin:number; mEnd:number; yBegin:number; yEnd:number;mdate1:string;mdate2:string;
        doFillterMonth(){
            if(this.m2 < this.m1 || ! this.y1 ){
              console.log("No not true");
              return;
          }
this.mBegin=(this.m1+9)%12;
this.mEnd=(this.m2+9)%12;
if(this.mBegin==0){this.mBegin=12;}if(this.mEnd==0){this.mEnd=12;}
          this.yEnd =this.y1;this.yBegin =this.y1;
if(this.mBegin>9){this.yBegin =this.y1-1;}
if(this.mEnd>9){this.yEnd =this.y1-1;}
this.mdate1 =this.yBegin +"-"+this.pad(this.mBegin,2);
this.mdate2 =this.yEnd +"-"+this.pad(this.mEnd,2);
    console.log(this.mdate1)   ; console.log(this.mdate2)   ; 
     }
     getYear(ev:any){
        // console.log('Yes'); 
       //  console.log(ev.value);
      //   console.log(ev);
         //console.log();
         this.m1=1;this.m2=12;
     }
     receivers:any=[];
     onSelectRc(ev:any){
          let sql2:string;
          let v = ev.value;
    //     _.filter(this.budgetOuts, function(o) { return !o.active; });
 if(ev.value==0){
    
          let  sql1 = "select m.mid,m.mcode,m.mname,m.munit,sum(numstockout) numstockout,sum(s.priceout) priceout  from mainstockout s ,mainproduct m ";
  sql2 = sql1 + ", receiver r where s.mid = m.mid and s.receiver=r.rcid  and s.hcode = '10702'  group by s.mid";
 }else{
       let  sql1 = "select m.mid,m.mcode,m.mname,m.munit,sum(numstockout) numstockout,sum(s.priceout) priceout  from mainstockout s ,mainproduct m ";
 sql2 = sql1 + ", receiver r where s.mid = m.mid and s.receiver=r.rcid  and s.hcode = '10702' and r.rcid="+ev.value+" group by s.mid";
 }
 console.log(sql2);
  let sql = { sql: sql2 };
        this._productService.getSql(sql).subscribe(resproducts => this.budgetOuts = resproducts, err => { }, () => {
            console.log(this.budgetOuts);
            
        });
     }
     getSum(fd:any){
      return _.sumBy(this.budgetOuts, function(o) { return Number(o[fd]); }); // _.sumBy(this.budgetOuts, fd);

     }
     hcodeval='10702';
       ngOnInit() {
           
          // console.log(this.monthnow+this.yearnow); `id -u`
let sql1 =  `select m.mid,m.mcode,m.mname,m.munit,sum(numstockin) numstockin,sum(s.pricelot) pricelot  from mainstockin s ,mainproduct m
where s.mid = m.mid  and s.hcode = '${this.hcodeval}'  group by s.mid`;
console.log(sql1);

//let sql1 = "select m.mid,m.mcode,m.mname,m.munit,sum(numstockin) numstockin,sum(s.pricelot) pricelot  from mainstockin s ,mainproduct m ";
//l//et sql2 = sql1 + "where s.mid = m.mid and s.receiver=r.rcid  and s.hcode = '10702' group by s.mid";
 let  sql = { sql: sql1 };
        this._productService.getSql(sql).subscribe(resproducts => this.budgetIns = resproducts, err => { }, () => {
        });

       sql1 = "select m.mid,m.mcode,m.mname,m.munit,sum(numstockout) numstockout,sum(s.priceout) priceout  from mainstockout s ,mainproduct m ";
 let sql2 = sql1 + ", receiver r where s.mid = m.mid  and s.receiver=r.rcid and s.hcode = '10702' group by s.mid";
  sql = { sql: sql2 };
        this._productService.getSql(sql).subscribe(resproducts => this.budgetOuts = resproducts, err => { }, () => {
        });
        this.selectReceivers=[];
    this.selectReceivers.push({label:'ผู้รับของทั้งหมด', value:0});

         sql1 = "select rcname as label,rcid as value from receiver";
  sql = { sql: sql1 };
        this._productService.getSql(sql).subscribe(resproducts => this.selectReceivers = resproducts, err => { }, () => {
 this.selectReceivers.unshift({label:'ผู้รับของทั้งหมด', value:0});
      //  let cc = Object.assign({}, this.selectReceivers);
    
        
     //   for(let n of this.receivers){
 //this.selectReceivers.push({label:n.rcname, value:n.rcid});

  //      }
        });

       }
}