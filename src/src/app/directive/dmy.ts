 
 import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'dmy',
   templateUrl: 'app/directive/dmy.html'
})
export class DeleteModal implements OnInit {
  @Input() dayVar :number;
  @Input() monthVar:number;
 @Input() yearVar :number;
 
@Output() doDmy= new EventEmitter();
  constructor(private http: Http) { 
    
  }
  sYMD:string;
  yArray=[2559,2560,2561,2563,2564,2565];
dArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
//dayVar:number;yearVar:number;monthVar:number
mArray  = [{
                mCode: '01',                mName: 'มกราคม'
            }, {
                mCode: '02',                mName: 'กุมภาพันธ์'
            }, {
                mCode: '03',                mName: 'มีนาคม'
            }, {
                mCode: '04',                mName: 'เมษายน'
            }, {
                mCode: '05',                mName: 'พฤษภาคม'
            }, {
                mCode: '06',                mName: 'มิถุนายน'
            }, {
                mCode: '07',                mName: 'กรกฎาคม'
            }, {
                mCode: '08',                mName: 'สิงหาคม'
            }, {
                mCode: '09',                mName: 'กันยายน'
            }, {
                mCode: '10',                mName: 'ตุลาคม'
            }, {
                mCode: '11',                mName: 'พฤศจิกายน'
            }, {
                mCode: '12',                mName: 'ธันวาคม'
            }];

getMonths(){
    return this.mArray;
}
getDmy(){
 let ev  ={myDmy:this.sYMD}
this.doDmy.emit(ev);

}

getDate(){

     this.sYMD = (this.yearVar-543) + "-" + this.monthVar + "-" + this.dayVar;
}
  ngOnInit() {
   // console.log(this.header);   // here is the value that you passed dynamically
    
  //  this.http.get('app/cities.json')    // making http request here 
  //    .map(res => res.json())
   //   .subscribe(res => console.log(res, "Subscribe Response"))
  }
}
 
 