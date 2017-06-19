import { Component, ElementRef } from "@angular/core";
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Dataservice } from '../app/../shared/dataservice';
import { ProductService } from '../app/../service/server';
import { Mainstockin, MainproductDt, Supplier } from '../app/../service/model';
import { CalculatorComponent } from '../app/../calculator/calculator.component';

import * as _ from "lodash";
import { UserHosPipe, SortPipe } from '../app/../pipe/hosuser.pipe';
//import { SortPipe } from '../app/../pipe/hosuser.pipe';
import { Mainproduct } from './mainproduct';
import { MainproductIn } from './mainproduct.in';
import { SelectItem } from 'primeng/primeng';
//import { ContextMenuComponent } from 'angular2-contextmenu/src/contextMenu.component';
//import { ContextMenuService } from 'angular2-contextmenu/src/contextMenu.service';
//import {UsernamePipe} from '../app/../pipe/hosuser.pipe';
@Component({
    selector: 'mainroductin-add',
    templateUrl: 'mainproduct.in.add.html'
})
export class MainproductInAdd {
    str: any = []; hos: any; cup: any; products: any; substocks: any; numinstock: number; models: any = []; categories: any = [];
    suppliers: any = []; oldnum: number = 0; product: any; numnow: number; mproducts: any = []; mproductSups: any = []; displayDialogCal = false;
    isCell: any = []; snum: any = []; lotid: any; bgUpdate: any = []; model = new Mainstockin(); munit: string; pricepattern = "\d+(\.\d{2})?";
    fdSearchId = 0; txtSearch = ""; isSupidFilter = false; supid = 0; isSetupProduct = true; isAddNewProduct = false; isAddNewSupplier = false; lastProducts: any = []; munits: any = [];
    datepattern = "\d{2}/\d{2}/\d{4}";
    tempstockins: any = [];//test:any;
    tempstockinsfd = ['lotid']; tempstockinsind = ['asc']; hcode = "";
    newproduct = new MainproductDt();
    supplier: any;
    sp = new Supplier;
    test: any = "fffffffff";
    canSaveSupplier = true;
    constructor(private _location: Location, private _productService: ProductService, private route: ActivatedRoute,
        private router: Router, public _dt: Dataservice) {

    }
    CalClose() {
        this.displayDialogCal = false;
    }
    CalOpen() {
        this.displayDialogCal = true;
    }
    showAddNewProduct() {
        this.isAddNewProduct = true;
    }
    showAddNewSupplier() {
        this.isAddNewSupplier = true;
    }
    doSetProduct(ev: any) {

    }
    onBlurSupname(sname: string) {
        // console.log('ok supname คือ' +sname );
        let isfind = _.find(this.suppliers, { 'supname': sname });
        // console.log(isfind);
        if (isfind) {
            alert("พบชื่อซ้ำ กรุณาแก้ไข");
            this.canSaveSupplier = false;
        }
    }
    onBlurMname(mname: string) {
        // console.log('ok supname คือ' +sname );
        let isfind = _.find(this.mproducts, { 'mname': mname });
        // console.log(isfind);
        if (isfind) {
            alert("พบชื่อซ้ำ กรุณาแก้ไข");
            //this.canSaveProduct = false;
        }
    }
    onCancel() {
        // this._location.back();
        this.router.navigate(["main/mainproductin"]);
    }
    doFilterSupid() {
        // this.isSupidFilter = ! this.isSupidFilter;
        //if(e.target.checked){this.isSupidFilter=true}else{this.isSupidFilter=false}
        //console.log(e.target.checked);
        //console.log(this.isSupidFilter);
        //if(! e.target.checked)?this.fdSearchId =0:this.fdSearchId =this.supid;
        //if(this.isSupidFilter){
        //this.fdSearchId = (! this.isSupidFilter)?0:this.supid;
        if (this.isSupidFilter) {
            this.fdSearchId = this.supid;
        } else {
            this.fdSearchId = 0;
        }
    }
    //}

    getLastStockIn() {

        let sql = {
            sql: "select m.* from mainstockin s ,mainproduct m where s.mid = m.mid and m.hcode = '" + this.hcode + "'  group by m.mid order by  lotid desc limit 1 "
        };
        //    console.log(sql);
        this._productService.getSql(sql).subscribe(resproducts => this.lastProducts = resproducts, err => { }, () => {
            if (this.lastProducts[0]) {
                //  console.log(this.lastProducts);

                this.newproduct = this.lastProducts[0];
            }

        });
    }
    onCancelNewProduct() {
        this.isAddNewProduct = false;

    }
    onCancelNewSupplier() {
        this.isAddNewSupplier = false;

    }
    onSubmitAddProduct() {
        let xx: any;
        this.newproduct.hcode = this.hcode;
        //  this.newproduct['numnow']= this.newproduct.numstockin;
        // this.newproduct.munit=this.newproduct.munit['munit'];
        // console.log(  this.newproduct.munit['munit']);
        // return false;
        // console.log(this.newproduct);

        this._productService.getAdd(this.newproduct, 'mainproduct').subscribe(prods => xx = prods, err => { }, () => {
            let sql = { sql: "select *  from mainproduct where hcode =  '" + this.hcode + "' order by mid desc" };
            let maxpds: any;
            this._productService.getSql(sql).subscribe(resproducts => maxpds = resproducts, err => { }, () => {
                this.model.mid = maxpds[0]['mid'];


                this.isAddNewProduct = false;
                this.newproduct.mid = this.model.mid;

                this.mproducts.push(this.newproduct);
                this.model['mcode'] = this.newproduct.mcode;
                //console.log('nn='+maxpds[0]['numnow']);

                //console.log(this.newproduct.stockvalue);

                this.model['stockvalue'] = Number(maxpds[0]['stockvalue']);
                //    console.log("tt=");
                //                   console.log( this.model['stockvalue'] );

                this.munit = maxpds[0]['munit'];
                this.newproduct = new MainproductDt();
            });
        });

    }
    onSubmitAddSupplier() {
        let xx: any;
        //  console.log(this.supplier);

        this._productService.getAdd(this.supplier, 'supplier').subscribe(prods => xx = prods, err => {
            console.log(err);
        }, () => {
            let sql = { sql: "select * from supplier order by supid desc" };
            let maxpds: any;
            this._productService.getSql(sql).subscribe(resproducts => maxpds = resproducts, err => {
                console.log('err');
            }, () => {
                //this.model.supid = maxpds[0]['supid'];
                this.suppliers.push(maxpds[0]);
                this.model.supid = maxpds[0]['supid'];

                this.isAddNewSupplier = false;
                this.supplier = new Supplier();
            });
        });

    }
    stockvalue = 0;
    onSubmit() {
        console.log(this.model);

        if (!this.model.mid) { console.log(this.model); alert("กรุณาเลือก วัสดุก่อน"); return false; }
        if (this.model.numstockin < 1 || !this.model.numstockin) { alert("กรุณาใส่จำนวนรับเข้าก่อน"); return false; }
        this.model.hcode = this.hcode;
        if (this.lotid > 0) {
            this.model['updateId'] = " lotid =" + this.model.lotid;
        } else {
            this.model['updateId'] = "0";
            this.model.numlotnow = this.model.numstockin;

        }
        this.model['stocknumin'] = Number(this.numnow) - Number(this.oldnum) + Number(this.model.numstockin);
        let val = 0;
        if (this.model['stockvalue']) {
            val = Number(this.model['stockvalue']) + Number(this.model.pricelot);
            //   console.log('xxcc='+val);
            this.model['stockvalue'] = val;// += Number(this.model.pricelot);
        } else {

            val = Number(this.model.pricelot);
            this.model['stockvalue'] = val;
        }
        this.model['stockvaluein'] =val;// this.model['stockvalue'] + this.model.pricelot;
        let xx: any;
        this._productService.getAdd(this.model, 'mainstockin').subscribe(prods => xx = prods, err => { }, () => {
            let mp: any;
            this.model['updateId'] = " mid =" + this.model.mid;
            //   mp['numnow'] =this.numnow + this.model.numstockin;
            this.model.numnow = Number(this.numnow) - Number(this.oldnum) + Number(this.model.numstockin);

            //    console.log( this.model['stockvalue']);
            if (this.matsup && this.matsup['stockvalue']) { this.matsup['stockvalue'] = this.model['stockvalue']; }
            this._productService.getAdd(this.model, 'mainproduct').subscribe(prods => xx = prods);
            let res = _.find(this.mproducts, ['mid', this.model.mid]);
            this.model['mname'] = res['mname'];
            res = _.find(this.suppliers, ['supid', this.model.supid]);
            this.model['supname'] = res['supname'];
            this.tempstockins.push(this.model);
            //console.log(this.tempstockins);
            let date = this.model.datestockin;
            let supid = this.model.supid;
            let supname = this.model['supname'];
            //  console.log("begin Submit model");
            //   console.log(this.model);
            //     console.log("begin tempstockins");
            //  console.log(this.tempstockins);
            this.model = new Mainstockin();
            this.model.datestockin = date;
            this.model.supid = supid;
            //console.log("Done Submit");
        });
        //  this.router.navigate(["main/mainproductin"]);

    }
    setSupplier() {
        this.model.supid = this.supplier.supid;
    }
    matsup: any;
    setMid(obj: any) {
        this.matsup = obj;
        this.numnow = obj.numnow;
        this.munit = obj.munit;
        this.model.mid = obj.mid;
        this.model['mcode'] = obj.mcode;
        this.model['stockvalue'] = obj.stockvalue;
    }
    doCalPricen() {
        if (this.model.numstockin > 0) {
            this.model.pricen = this.model.pricelot / this.model.numstockin;
        }
    }
    doCalPricelot() {
        this.model.pricelot = this.model.pricen * this.model.numstockin;
    }
    setUnit(mid: number) {
        //  alert(mid);
        let res = _.find(this.mproducts, ['mid', mid]);
        this.munit = res['munit'];
        this.numnow = res['numnow'];
    }
    onChange(ev: any) {
        //   console.log(ev);
        //    console.log(ev.target.text);
        //   console.log(ev.target);
        //  console.log(ev.target.value);
        //  let dd = ev.target.value.split(":");

        this.isSupidFilter = true;
        //      this.supid = Number(dd[1]);
        this.txtSearch = "";
        this.fdSearchId = ev.value;
        this.supid = ev.value;
        //     this.fdSearchId = Number(dd[1]);
        //console.log(this.fdSearchId);
        //console.log(ev.value);



    }
    getsp() {
        this.supplier.supname = "rrrrdddddddrreeeedddde";
    }
    getNow() {
        this.model.datestockin = this._productService.fnGetnow();
    }
    doClearTxtSearch() {
        this.txtSearch = "";
    }
    // cities: SelectItem[];
     doLowertxt(txt:string) {
   this.txtSearch =  txt.toLowerCase();
   // console.log(this.txtSearch);
   // console.log(this.txtSearch.toLowerCase());
   }
    supOptions: SelectItem[];
    ngOnInit() {
        //this.sp.supid =345;
        //this.sp.supname = "rrrrtttt";
        this.supplier = new Supplier();
        //  this.supplier.supname="rrrrrreeeee";
        //    this.supplier.tel="123456";
        // this.test.tt="OK ครับ";
        //   console.log(  this.supplier);

        // console.log(this._productService.fnGetnow());
        //  console.log(this._productService.fnGetnow(false));
        this.hcode = this._dt.profile.hcode;
        let sql = { sql: "select * from categories" };
        this._productService.getSql(sql).subscribe(resproducts => this.categories = resproducts);
        sql = { sql: "select distinct munit from mainproduct" };
        this._productService.getSql(sql).subscribe(resproducts => this.munits = resproducts);
        sql = { sql: "select * from mainproduct where hcode =  '" + this.hcode + "'" };
        this._productService.getSql(sql).subscribe(resproducts => this.mproducts = resproducts, err => { }, () => { });
        sql = { sql: "select m.*,s.supid from mainproduct m left join mainstockin s on m.mid = s.mid where m.hcode = '" + this.hcode + "'  group by m.mid,s.supid order by m.mname" };
        //console.log(sql);
        this._productService.getSql(sql).subscribe(resproducts => this.mproductSups = resproducts, err => { }, () => { });
        sql = { sql: "select * from supplier" };
        this._productService.getSql(sql).subscribe(resproducts => this.suppliers = resproducts, err => { }, () => {//console.log(this.suppliers)
        });
        sql = { sql: "select supid as value, supname as label from supplier" };
        this._productService.getSql(sql).subscribe(resproducts => this.supOptions = resproducts, err => { }, () => {//console.log(this.suppliers)
        });
        this.route.params.forEach((params: Params) => {
            let hcode = params['hcode']; this.lotid = params['lotid'];
            this.hos = this._dt.hos;
            this.cup = this._dt.cup;

            if (this.lotid == 0) {

                this.model.hcode = this._dt.cup['hcode'];

                let sql = { sql: "select * from mainstockin s where hcode = '" + this.hcode + "' order by lotid desc limit 1" };
                this._productService.getSql(sql).subscribe(resproducts => this.models = resproducts, err => { }, () => {
                    //  alert(this.models[0]['supid']);
                    if (this.models[0]) {
                        this.model.supid = this.models[0]['supid'];
                        this.supid = this.models[0]['supid'];
                        this.model.datestockin = this.models[0]['datestockin'];
                    } else {
                        //   this.model.supid = this.models[0]['supid'];
                        this.model.datestockin = this._productService.fnGetnow();
                    }
                });

                if (!this.model.hcode) { //this.model.hcode = '10972' 
                    this.model.hcode = this._dt.profile.hcode;
                }
            }
            else {
                let sql = { sql: "select s.*,p.mname,p.munit,p.mcode,p.numnow from mainstockin s,mainproduct p   where s.mid=p.mid and  s.lotid = " + this.lotid };
                this._productService.getSql(sql).subscribe(resproducts => this.models = resproducts, err => { }, () => {

                    this.model = this.models[0];
                    this.product = this.models[0];
                    this.oldnum = this.model.numstockin;
                    this.numnow = this.product.numnow;

                });
            }
        });


    }
}


