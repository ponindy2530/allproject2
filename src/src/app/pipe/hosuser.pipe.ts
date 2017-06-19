import { Pipe, PipeTransform } from '@angular/core';
import {Dataservice} from '../shared/dataservice';
import * as _ from "lodash";
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
 
   transform(value:any,txt:string,fd:any):any {
    return   value.filter((obj:any) => {
if(txt){ 

 let xx = obj[fd];
 //console.log(xx);
 if(xx){
   xx=xx.toLowerCase();
 }
return  _.includes(xx, txt) ;
 //obj.mname.indexOf(txt) != -1;
//if( _.includes(obj, txt)){ return obj;}else{return false;}
 
}else{
  return value;
}

    });
  }
}
@Pipe({name: 'searchId'})
export class SearchIdPipe implements PipeTransform {
 
   transform(value:any,num:number,fd:any):any {
    return   value.filter((obj:any) => {
if(num>0){ 
  //console.log(num);
 return  obj['supid']==num;//_.includes(obj[fd], num) ;//obj.mname.indexOf(txt) != -1;
//if( _.includes(obj, txt)){ return obj;}else{return false;}
 
}else{
  return value;
}

    });
  }
}
@Pipe({name: 'filterById'})
export class FilterByIdPipe implements PipeTransform {
 
   transform(value:any,num:number,fd:any):any {
    return   value.filter((obj:any) => {
if(num>0){ 
  console.log(num);
 return  obj['mid']==num;//_.includes(obj[fd], num) ;//obj.mname.indexOf(txt) != -1;
//if( _.includes(obj, txt)){ return obj;}else{return false;}
 
}else{
  return value;
}

    });
  }
}
@Pipe({name: 'userHos'})
export class UserHosPipe implements PipeTransform {
 
   transform(value:any):any {
    return   value.filter((herod:any) => herod.hcode =='03972');
  }
}
  @Pipe({name: 'username'})
export class UsernamePipe implements PipeTransform {
 
   transform(value:number,user:any):string {
  let d:any;
      if(value){ 
     d = _.find(user, ['userid', value]);
    return   d.username;
      }else{return "";}
  }
}

 @Pipe({name: 'sort'})
export class SortPipe implements PipeTransform {
 
   transform(value:any,fd:any,ind:any):any {
  let d:any;
  d=  _.orderBy(value,fd, ind);
      return d;
  
}

}
