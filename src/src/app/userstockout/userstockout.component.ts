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
import { User } from '../app/../service/model';
@Component({
  selector: 'app-userstockout',
  templateUrl: './userstockout.component.html',
  styleUrls: ['./userstockout.component.css']
})
export class UserstockoutComponent  {
rctypes = [{label:"โรงพยาบาล",value:"hospital"},{label:"รพสต.",value:"rpst"}];   
  constructor(private _productService: ProductService, private route: ActivatedRoute,
        private router: Router, public _dt: Dataservice, private confirmationService: ConfirmationService) {
        
    }
  users: any[];
  model = new User();
 // selectedvalue = "hospital";
  ind: number;
  displayDialog = false;
  doEditMain(p: any, i: number) {
    
      for (let prop in p) {
            this.model[prop] = p[prop];
        }
      this.ind = this.users.indexOf(p);
     
  
   //   this.selectedvalue = this.model.rctype;
//console.log(this.model);
     //  console.log("ind="+this.ind);
   //  console.log(this.selectedvalue );
       this.displayDialog = true;
   }
  ngOnInit() {
      let sql = { sql: "select * from receiver" };
      this._productService.getSql(sql).subscribe(resproducts => this.users = resproducts
       , err => { alert("error") }
        , () => { 
          console.log(this.users);
        }
      );
    
  }

}
