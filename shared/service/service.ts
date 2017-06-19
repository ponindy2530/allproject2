import { Injectable } from '@angular/core'
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http'
import { Observable } from 'rxjs/Observable'
@Injectable()
export class ProductService {
    opts: RequestOptions;
    //-------------------------------------------------------------------------------------//
    token: any = "ponadmincpho";
    dbserver: any = "1641152273_db_pon_itcpho";
    dbsqlname: any = "sql_healthstation";
    urlserver: any = "http://164.115.22.73/";
    //urlserver: any = "http://127.0.0.1/";
    //------------------------------------------------------------------------------------//
    dbserver_1: any = "20315718217_db_pon_itcpho";
    dbsqlname_1: any = "sql_connect";
    urlserver_1: any = "http://203.157.182.17/";
    //------------------------------------------------------------------------------------//

    urlserver_2: any = "http://dmfzero.com/";
    //urlserver_2: any = "http://127.0.0.1/";
    //------------------------------------------------------------------------------------//
    constructor(private _http: Http) {

    }
    private _api = this.urlserver + "p/pon-api-serve/api-serve.php/";
    private _api_1 = this.urlserver_1 + "p/pon-api-serve/api-serve.php/";
    private _apimail = this.urlserver_2 + "p/pon-api-serve/mail-serve.php/";
    //-------------------------------------------------------------------------------------------//    
    //เพิ่มแก้ไขข้อมูล
    addData(tbl: any, fd: any, param: any, pd: any): Observable<any> {
        let url = this._api + "addData/" + tbl + '/' + fd + '/' + param + "/" + this.token + "/" + this.dbserver;
        //   console.log(url);
        let body = JSON.stringify(pd);
        //    console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
            // .map(res => { console.log(res.json()) })
            .map((response: Response) => response.json())
    }
    //ลบข้อมูล
    delData(tbl: any, fd: any, param: any): Observable<any> {
        let url = this._api + "delData/" + tbl + '/' + fd + '/' + param + "/" + this.token + "/" + this.dbserver;
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }

    dbData(key: any): Observable<any> {
        let url = this._api + "dbData/" + key + "/" + this.token + "/" + this.dbserver + "/" + this.dbsqlname;
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }

    dbData1(key: any, param1: any): Observable<any> {
        let url = this._api + "dbData1/" + key + '/' + param1 + "/" + this.token + "/" + this.dbserver + "/" + this.dbsqlname;
        //  console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }

    dbData2(key: any, param1: any, param2: any): Observable<any> {
        let url = this._api + "dbData2/" + key + '/' + param1 + '/' + param2 + "/" + this.token + "/" + this.dbserver + "/" + this.dbsqlname;
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }
    dbData3(key: any, param1: any, param2: any, param3: any): Observable<any> {
        let url = this._api + "dbData3/" + key + '/' + param1 + '/' + param2 + '/' + param3 + "/" + this.token + "/" + this.dbserver + "/" + this.dbsqlname;
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }

    //--------------------------------------------------------------------------------------------------------------//




    dbData_1(key: any): Observable<any> {
        let url = this._api_1 + "dbData/" + key + "/" + this.token + "/" + this.dbserver_1 + "/" + this.dbsqlname_1;
        console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }

    dbData1_1(key: any, param1: any): Observable<any> {
        let url = this._api_1 + "dbData1/" + key + '/' + param1 + "/" + this.token + "/" + this.dbserver_1 + "/" + this.dbsqlname_1;
        //  console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }

    dbData2_1(key: any, param1: any, param2: any): Observable<any> {
        let url = this._api_1 + "dbData2/" + key + '/' + param1 + '/' + param2 + "/" + this.token + "/" + this.dbserver_1 + "/" + this.dbsqlname_1;
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }
    dbData3_1(key: any, param1: any, param2: any, param3: any): Observable<any> {
        let url = this._api_1 + "dbData3/" + key + '/' + param1 + '/' + param2 + '/' + param3 + "/" + this.token + "/" + this.dbserver_1 + "/" + this.dbsqlname_1;
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }



    //--------------------------------------------------------------------------------------------//
    //Email

    sentEmail(pd: any): Observable<any> {
        let url = this._apimail + "sentEmail";
        //   console.log(url);
        let body = JSON.stringify(pd);
        //    console.log(body);
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, body, { headers: headers })
            // .map(res => { console.log(res.json()) })
            .map((response: Response) => response.json())
    }

    //-------------------------------------------------------------------------------------------------//


    loginServe(id: string): Observable<any> {
        let url = "http://203.157.182.15/accounts/api/loginForm/" + id;
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }

    //---------------------------------------------------------------------------------------------//

    ckip(): Observable<any> {
        let url = "https://jsonip.com/?callback=";
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }

    //--------------------------------------------------------------------------------------//



    urlhst(): Observable<any> {
        let url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLPnfD_CbUQCUK3R4LGyhgCMIO36NeihOn&key=AIzaSyBuYg8usCx5lXW2HeiBKGGiBfgpMLCaOf0";
        // console.log(url);
        return this._http.get(url)//this._productUrlOne)
            .map((response: Response) => response.json())
        // .catch(this.handleError)
    }











    // loginstart(param: any): Observable<any> {
    //     let url = this._api + "loginstart&key=" + param;
    //     //console.log(url);
    //     return this._http.get(url)//this._productUrlOne)
    //         .map((response: Response) => response.json())
    //     // .catch(this.handleError)
    // }

    // login(pd: any): Observable<any> {
    //     let url = this._api + "login";
    //     //   console.log(url);
    //     let body = JSON.stringify(pd);
    //     //    console.log(body);
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //     let options = new RequestOptions({ headers: headers });
    //     return this._http.post(url, body, { headers: headers })
    //         // .map(res => { console.log(res.json()) })
    //         .map((response: Response) => response.json())
    // }

    // urlyt(): Observable<any> {
    //     let url = "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLPnfD_CbUQCUK3R4LGyhgCMIO36NeihOn&key=AIzaSyBuYg8usCx5lXW2HeiBKGGiBfgpMLCaOf0";
    //     // console.log(url);
    //     return this._http.get(url)//this._productUrlOne)
    //         .map((response: Response) => response.json())
    //     // .catch(this.handleError)
    // }

    // uploadFile(pd: any): Observable<any> {
    //     let url = this._apifile + "uploadFile";
    //     //   console.log(url);
    //     let body = JSON.stringify(pd);
    //     //    console.log(body);
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'multipart/form-data');
    //     headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //     let options = new RequestOptions({ headers: headers });
    //     return this._http.post(url, body, { headers: headers })
    //         // .map(res => { console.log(res.json()) })
    //         .map((response: Response) => response.json())
    // }



}



