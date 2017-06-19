import {Component, ElementRef} from "@angular/core";   
import {Location} from '@angular/common'; 
import { Router, ActivatedRoute, Params} from '@angular/router';
import {Dataservice} from '../app/../shared/dataservice';
import {ProductService} from '../app/../service/server';
import {MainproductDt }  from '../app/../service/model';
import * as _ from "lodash";
import {Mainproduct} from './mainproduct';
@Component({
    selector: 'mainproduct-add',
    templateUrl: 'mainproduct.add.html'
})
export class MainproductAdd { 
  txtSearch: string = "";
str:any=[];hos:any;cup:any;products:any;substocks:any;numinstock:number;models:any=[];categories:any=[];hcode:string;
isCell:any=[];snum:any=[]; mid:any;bgUpdate:any=[];model:any;munits:any=[];mproducts:any=[];mpd:any=[];funits:any=[];
displayNewPd:boolean;tempproducts:any=[];
constructor(private _location:Location,private _productService: ProductService , private route: ActivatedRoute,
    private router: Router,public _dt:Dataservice) {

  }
 setMid(m:any){
this.model.mname = m['mname'];
this.model.mcode = m['mcode'];
this.model.munit = m['munit'];
this.model.catid = m['catid'];
 }
  onCancel(){
     // this._location.back();
     this.router.navigate(["main/mainproduct"]);
  }
 
  onSubmit(f:any){
      // console.log("value=");
   //   console.log(f);
      if(this.mid > 0){
     this.model['updateId']=" mid ="+this.model.mid;
      }else{
if( _.find(this.mproducts, ['mname', this.model.mname])){
alert("โปรดป้อนชื่อที่ไม่ซ้ำกับที่มีอยู่แล้ว");
return;
}
          if(! _.find(this.munits,['munit',this.model.munit])){
              alert("ไม่พบ Munits");
              let mu = {munit:this.model.munit}
this.munits.push(mu);

          }
        this.model['updateId']="0";  
      }
    console.log(this.model);
    
      let xx:any;
 this._productService.getAddLastId(this.model,'mainproduct','mid').subscribe(prods => xx = prods,err=>{},()=>
  {
       //this.router.navigate(["main/mainproduct"]);
       this.displayNewPd=true;
//console.log(xx);
this.model.mid = Number(xx[0]);

//alert("test"+this._dt.profile.hcode);

this.tempproducts.push(this.model);
this.model.numnow=0;

      this.mproducts.push(this.model);

  });
  }
 searchUnit(ev:any){

  this.getMunits(ev.query);
  }
  getMunits(q:string){
    this.funits =  _.filter(this.munits, function(o) { 
    return      _.includes(o['munit'], q); });
 }
  doLowertxt(txt:string) {
   this.txtSearch =  txt.toLowerCase();
   // console.log(this.txtSearch);
   // console.log(this.txtSearch.toLowerCase());
   }
 ngOnInit() {
    // alert("ffff");
  // this.txtSearch = "ddddddddd";
    this._dt.isSide=false;
    this._dt.contentcol = this._dt.contentmax;
 this.route.params.forEach((params: Params) => {
     this.model = new MainproductDt();
     this.model.hcode =this._dt.profile.hcode;
 this.mid =  params['mid'];

  this.hos = this._dt.hos;
this.cup = this._dt.cup;

});
let pd:any;
this.hcode =this._dt.profile.hcode;
  

let sql = { sql: "select distinct munit from mainproduct " };
  this._productService.getSql(sql).subscribe(resproducts => this.munits = resproducts);
 sql = {sql:"select * from mainproduct p ,categories c  where p.catid = c.catid and hcode='"+this.model.hcode+"'"};
//console.log(sql);
    this._productService.getSql(sql).subscribe(resproducts => this.models = resproducts,err=>{},()=>{
      //  this.model = this.models[0];
 //     console.log(this.models);
    }); 
 sql = {sql:"select * from categories"};
    this._productService.getSql(sql).subscribe(resproducts => this.categories = resproducts);
    
 }
}
 

