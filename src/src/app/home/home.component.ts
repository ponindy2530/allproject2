import { Component, OnInit } from '@angular/core';
//import { SebmGoogleMap, SebmGoogleMapPolygon, LatLngLiteral } from 'angular2-google-maps/core';
import { Dataservice } from '../app/../shared/dataservice';
import { ProductService } from '../app/../service/server';
import { Hoslatlon } from '../app/../service/model';
import { Ng2MapComponent } from 'ng2-map';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
title: string = 'My first angular2-google-maps project';
  lat: number=15.806572074;//51.678418; //
  lng: number = 102.02900256;//7.809007;//
  center = { lat: 15.806572074, lng: 102.02900256 };  
  data: any;
  hospoints: Hoslatlon[];
 // path = { lat: number, lng: number };
 
//   paths = [
//       [{
//           "lat": 15.621340916446318,
//           "lng": 102.08195472965974
//       },
//       {
//           "lat": 15.624968811896483,
//           "lng": 102.07218035215469
//       },
//       {
//           "lat": 16.01968669167232,
//           "lng": 102.08297517905417
//       }
//       ],
//       [{
//           "lat": 15.803943284993347,
//           "lng": 102.2311850484717
//       },
//       {
//           "lat":15.749965579672869,
//           "lng": 102.24589326634815
//       },
//       {
//           "lat": 15.621340916446318,
//           "lng": 102.08195472965974
//       }
//       ]
//   ]; 
  constructor(
private _productService: ProductService,

  ) { 
 this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'My Second dataset',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }


  }
  posits = [];
  events=[];
  apolygons: any[];
  lat2: any;
  lng2: any;
   pt: { "lat": number; "lng": number; };
  pts:any[]=[];// { lat: number, lng: number }[];
  paths = [];    
  
  ngOnInit() {
    let sql = { sql: "select hname,lat,lon from ponithos where pvcode = '36' and typecode='5'" };
    this.lat =15.806572074;//51.678418; //
this.lng =102.02900256 ;//7.809007;//
        this._productService.getSql(sql).subscribe(resproducts => this.hospoints = resproducts, err => { }, () => {
            // this.cats
          //  this.hospoints.push({ label: 'All Cats', value: null });
        
         // this.lat2 = "16.278795556"; //this.hospoints[2].lon;
         // this.lng2 = "101.95530632";// this.hospoints[2].lat; 
            for (var i = 0; i < this.hospoints.length; i++) {
                //someFn(arr[i]);
                this.hospoints[i].lon = 1 * this.hospoints[i].lon;
                this.hospoints[i].lat = 1 * this.hospoints[i].lat;
                this.posits.push([this.hospoints[i].lon,this.hospoints[i].lat]);
            }
            console.log("dddddd");
            sql = { sql: "select count(*) as cnt,datestockin from mainstockin group by datestockin" };
            let evs: any[];
            this._productService.getSql(sql).subscribe(resproducts => evs = resproducts, err => { }, () => {
                for (var i = 0; i < evs.length; i++) {
                    this.events[i] = {
                        "title": evs[i].cnt,
                        "start": evs[i].datestockin
                    };
               }        
             });
            sql = { sql: "select  * from amp_chaiyaphum_polygon where AMP_CODE in('3601','3602') " };
            let z = 0; let amp = ""; let lat: number; let lng: number;
            this._productService.getSql(sql).subscribe(resproducts => this.apolygons = resproducts, err => { }, () => {
                // let xy = {}
                let str: string="";
                for (var i = 0; i < this.apolygons.length; i++) {
                    //someFn(arr[i]);
                    this.apolygons[i].X = 1 * this.apolygons[i].X;
                    this.apolygons[i].Y = 1 * this.apolygons[i].Y;
                    if (this.apolygons[i].AMP_CODE == '3601') { z = 0; } else { z = 1; }
                    amp = this.apolygons[i].AMP_CODE;
                    lat = this.apolygons[i].Y; lng = this.apolygons[i].X;
                    //     console.log(this.apolygons[i].X);
                    // this.pts.push(this.apolygons[i].Y, this.apolygons[i].X  );
                    this.pts.push({
                        "ampcode":amp,pos: {"lat": lat, "lng": lng}});
                                     
 //this.apolygons[i].AMP_CODE,{ "lat": this.apolygons[i].Y, "lng": this.apolygons[i].X }); 
                }
               // this.paths = [this.pts]; 
         // console.log("point=");        
     console.log(this.pts);     
          }); //
         //  console.log(this.apolygons);
        });
            /*this.events = [
            {
                "title": "All Day Event",
                "start": "2017-03-01"
            },
            {
                "title": "Long Event",
                "start": "2017-01-07",
                "end": "2017-03-10"
            },
            {
                "title": "Repeating Event",
                "start": "2017-01-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2017-01-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2017-03-11",
                "end": "2017-03-13"
            }
        ];*/
       
  }

}
