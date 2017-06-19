"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/Rx');
var DeleteModal = (function () {
    function DeleteModal(http) {
        this.http = http;
        this.doDmy = new core_1.EventEmitter();
        this.yArray = [2559, 2560, 2561, 2563, 2564, 2565];
        this.dArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
        //dayVar:number;yearVar:number;monthVar:number
        this.mArray = [{
                mCode: '01', mName: 'มกราคม'
            }, {
                mCode: '02', mName: 'กุมภาพันธ์'
            }, {
                mCode: '03', mName: 'มีนาคม'
            }, {
                mCode: '04', mName: 'เมษายน'
            }, {
                mCode: '05', mName: 'พฤษภาคม'
            }, {
                mCode: '06', mName: 'มิถุนายน'
            }, {
                mCode: '07', mName: 'กรกฎาคม'
            }, {
                mCode: '08', mName: 'สิงหาคม'
            }, {
                mCode: '09', mName: 'กันยายน'
            }, {
                mCode: '10', mName: 'ตุลาคม'
            }, {
                mCode: '11', mName: 'พฤศจิกายน'
            }, {
                mCode: '12', mName: 'ธันวาคม'
            }];
    }
    DeleteModal.prototype.getMonths = function () {
        return this.mArray;
    };
    DeleteModal.prototype.getDmy = function () {
        var ev = { myDmy: this.sYMD };
        this.doDmy.emit(ev);
    };
    DeleteModal.prototype.getDate = function () {
        this.sYMD = (this.yearVar - 543) + "-" + this.monthVar + "-" + this.dayVar;
    };
    DeleteModal.prototype.ngOnInit = function () {
        // console.log(this.header);   // here is the value that you passed dynamically
        //  this.http.get('app/cities.json')    // making http request here 
        //    .map(res => res.json())
        //   .subscribe(res => console.log(res, "Subscribe Response"))
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DeleteModal.prototype, "dayVar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DeleteModal.prototype, "monthVar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], DeleteModal.prototype, "yearVar", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DeleteModal.prototype, "doDmy", void 0);
    DeleteModal = __decorate([
        core_1.Component({
            selector: 'dmy',
            templateUrl: 'app/directive/dmy.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DeleteModal);
    return DeleteModal;
}());
exports.DeleteModal = DeleteModal;
//# sourceMappingURL=dmy.js.map