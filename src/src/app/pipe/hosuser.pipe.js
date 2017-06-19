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
var _ = require("lodash");
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
var SearchPipe = (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (value, txt, fd) {
        return value.filter(function (obj) {
            if (txt) {
                var xx = obj[fd];
                //console.log(xx.toLowerCase());
                return _.includes(xx.toLowerCase(), txt);
            }
            else {
                return value;
            }
        });
    };
    SearchPipe = __decorate([
        core_1.Pipe({ name: 'search' }), 
        __metadata('design:paramtypes', [])
    ], SearchPipe);
    return SearchPipe;
}());
exports.SearchPipe = SearchPipe;
var SearchIdPipe = (function () {
    function SearchIdPipe() {
    }
    SearchIdPipe.prototype.transform = function (value, num, fd) {
        return value.filter(function (obj) {
            if (num > 0) {
                //console.log(num);
                return obj['supid'] == num; //_.includes(obj[fd], num) ;//obj.mname.indexOf(txt) != -1;
            }
            else {
                return value;
            }
        });
    };
    SearchIdPipe = __decorate([
        core_1.Pipe({ name: 'searchId' }), 
        __metadata('design:paramtypes', [])
    ], SearchIdPipe);
    return SearchIdPipe;
}());
exports.SearchIdPipe = SearchIdPipe;
var FilterByIdPipe = (function () {
    function FilterByIdPipe() {
    }
    FilterByIdPipe.prototype.transform = function (value, num, fd) {
        return value.filter(function (obj) {
            if (num > 0) {
                console.log(num);
                return obj['mid'] == num; //_.includes(obj[fd], num) ;//obj.mname.indexOf(txt) != -1;
            }
            else {
                return value;
            }
        });
    };
    FilterByIdPipe = __decorate([
        core_1.Pipe({ name: 'filterById' }), 
        __metadata('design:paramtypes', [])
    ], FilterByIdPipe);
    return FilterByIdPipe;
}());
exports.FilterByIdPipe = FilterByIdPipe;
var UserHosPipe = (function () {
    function UserHosPipe() {
    }
    UserHosPipe.prototype.transform = function (value) {
        return value.filter(function (herod) { return herod.hcode == '03972'; });
    };
    UserHosPipe = __decorate([
        core_1.Pipe({ name: 'userHos' }), 
        __metadata('design:paramtypes', [])
    ], UserHosPipe);
    return UserHosPipe;
}());
exports.UserHosPipe = UserHosPipe;
var UsernamePipe = (function () {
    function UsernamePipe() {
    }
    UsernamePipe.prototype.transform = function (value, user) {
        var d;
        if (value) {
            d = _.find(user, ['userid', value]);
            return d.username;
        }
        else {
            return "";
        }
    };
    UsernamePipe = __decorate([
        core_1.Pipe({ name: 'username' }), 
        __metadata('design:paramtypes', [])
    ], UsernamePipe);
    return UsernamePipe;
}());
exports.UsernamePipe = UsernamePipe;
var SortPipe = (function () {
    function SortPipe() {
    }
    SortPipe.prototype.transform = function (value, fd, ind) {
        var d;
        d = _.orderBy(value, fd, ind);
        return d;
    };
    SortPipe = __decorate([
        core_1.Pipe({ name: 'sort' }), 
        __metadata('design:paramtypes', [])
    ], SortPipe);
    return SortPipe;
}());
exports.SortPipe = SortPipe;
//# sourceMappingURL=hosuser.pipe.js.map