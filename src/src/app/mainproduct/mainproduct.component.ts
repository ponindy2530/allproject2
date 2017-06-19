
import {Component, ElementRef} from "@angular/core";    
//import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes, Router, ActivatedRoute, Params } from '@angular/router';
import {Dataservice} from '../app/../shared/dataservice';
import {ProductService} from '../app/../service/server';

import * as _ from "lodash";
import { Mainproduct}  from './mainproduct';
//import { MainproductAdd}  from './mainproduct.add';
//import { MainproductIn}  from './mainproduct.in';
//import { MainproductInAdd}  from './mainproduct.in.add';
//declare var jQuery:any;
@Component({
    selector: "mainproductcomponent",
    templateUrl: "mainproduct.component.html"
})

export class MainproductComponent {
    //  public model:any;
public now = new Date();
 public   model = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
 public   modelprovide = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
  //public minDate:Date = void 0;
    constructor(private _productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,public _dt:Dataservice) {
//jQuery("#editordermodal").modal('show');
    }
    goMainproductAdd(){

        //alert("ddd");
       // this.router.navigate(['mainproduct/mainproduct.add']);
    }
}