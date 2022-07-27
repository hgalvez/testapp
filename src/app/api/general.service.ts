/* eslint-disable @typescript-eslint/naming-convention */

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders,  HttpXsrfTokenExtractor } from '@angular/common/http';
import { concat, Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';









@Injectable({
  providedIn: 'root'
})

export class GeneralService {
 base_url = 'https://nws2.findmyreports.com/api/';
  bearer ='Bearer ';


  userinfo = {
    'email': 'naifibra@nai-group.com',
    'password': 'F1br42011'
  };

  constructor(   private http: HttpClient,
    private tokenService: HttpXsrfTokenExtractor
    ) {  }

 httpOptions ={
      headers: new HttpHeaders({
        'Accept': 'application/json',
      'Content-Type': 'application/json'

      })
    };


  login(object, endpoint): Observable<any>{

    //return this.http.post(this.base_url, object).pipe()
    return this.http.post(this.base_url+'login', object, this.httpOptions).pipe();


  }

  getresults(endpoint, token): Observable<any>{
    let httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+token
      })
    };
    return this.http.get(this.base_url + endpoint, httpOptions).pipe(
      retry(2)
    );
  }

  result_detail(endpoint, token, id): Observable<any>{
    let httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      })
    };
    return this.http.get(this.base_url + endpoint + id, httpOptions).pipe(
      retry(2)
    );
  }

  naiassembly(endpoint, token, id): Observable<any>{
    let httpOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ token
      })
    }
    return this.http.get(this.base_url + endpoint + id, httpOptions).pipe(
      retry(2)
    );
  }



  //Este servicio es para el detalle del producto
  // https://live.sysbiterp.com/api/index.php/products/143


}
