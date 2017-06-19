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
  selector: 'app-report',
  templateUrl: './report.inout.html',
  styleUrls: ['./report.inout.css']
})
export class ReportInout  {
  str: any = []; hos: any; products: any; substocks: any; numinstock: number; txtSearch: string;
    isCell: any = []; snum: any = []; mid: any = []; bgUpdate: any = []; hcode: string; catid: number; categories: any = []; mproducts: any = []; mpd: any = []; displayNewPd = false;
    sortfd = ['mcode']; sortind = ['asc', 'desc']; displayDialog: boolean; model = new MainproductDt(); ind: number; tempproducts: any = []; catname: string;
    munits: any = []; funits: any = []; lightgrey = "bkGrey"; str0: string = ""; str1: string; iscolor = true; nn: any = []; cats: any = []; brands: SelectItem[];
    cities: SelectItem[];

    selectedCity: string;
  constructor(private _productService: ProductService, private route: ActivatedRoute,
        private router: Router, public _dt: Dataservice, private confirmationService: ConfirmationService) {}
stockinouts:any=[];


    msgs: Message[] = [];
 //msgs: Message[];
    
    uploadedFiles: any[] = [];

    onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    
        this.msgs = [];
        this.msgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
 values1: string[];
    values2: string[];


  ngOnInit() {
    let mysql1:string =" (select s.hcode,s.mid,m.mname,m.mcode,m.numnow,' ' as reciever,datestockin as datestock,'in' as account,lotid,numstockin,numlotnow,0 as datestockout,0 as soid,0 as numstockout from mainstockin s";
let mysql2:string =" left join mainproduct m on s.mid = m.mid order by s.datestockin)";

let mysql3:string =  " union  (select s.hcode,s.mid,m.mname,m.mcode,m.numnow,reciever,datestockout as datestock,'out' as account,0 as lotid,0 as numstockin,0 as numlotnow,datestockout,soid,numstockout from mainstockout s ";
 let mysql4 = " left join mainproduct m on s.mid = m.mid  order by datestockout )";

      
      let  sql = { sql: mysql1+mysql2 +mysql3+mysql4 }; console.log(sql);
      
        this._productService.getSql(sql).subscribe(resproducts => this.stockinouts = resproducts, err => { }, () => {
         //   console.log(this.stockinouts);
       this.stockinouts=     _.orderBy(this.stockinouts, ['datestock', 'account'], ['asc', 'asc']);
         //      console.log(this.stockinouts);
            // this.cats
          // this.categories.push({ label: 'All Cats', value: null });
        });
  }

}
