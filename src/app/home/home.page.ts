/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { Results } from './results.model';
import { ResultsService } from './results.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { GeneralService } from '../api/general.service';
//import { UtilitiesService } from '../api/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})



export class HomePage implements OnInit{

  retresults: any;
  naiassembly: any;
  serialnumber: any; //var from landing page
  not_exists: boolean;

  results: Results[];

  constructor(private resultsService: ResultsService,
              private router: Router,
              private storage: Storage,
              public general_service: GeneralService,
              //public utility: UtilitiesService,
              public activatedRouter: ActivatedRoute

              ) {}

  /*ngOnInit() {
   // this.results = this.resultsService.getResults();
    //console.log(this.results);
    this.storage.get("token").then((token)=>{
      this.general_service.result_detail("naiassembly/searchsn/", token, response.serialnumber ).subscribe(response =>{
        console.log("Esto es el servicio de naiassembly");
        console.log(response);
        this.naiassembly = response;
      },(err) =>{
        console.log("Estoy en el error");
        console.log(err);
      });
    });*/

    ngOnInit() {
      console.log("estoy en sn landing");
      this.activatedRouter.params.subscribe(response =>{
        console.log(response.serialnumber);
        this.storage.get("token").then((token)=>{
          console.log("token");
      console.log(token);
          this.general_service.result_detail("naiassembly/searchsn/", token, response.serialnumber ).subscribe(response =>{
            console.log(response);
            console.log(response.label);
            this.naiassembly = response;
            if(response == "" || response == undefined ){
              this.not_exists= true;
            }
            else {
              this.not_exists= false;
            }
            console.log('not_exists'+this.not_exists);

          },(err) =>{
            console.log("Estoy en el errro");
            console.log(err);
          });
        });
      });

      console.log("estoy en sn landing");
      this.activatedRouter.params.subscribe(response =>{
        console.log(response.serialnumber);
        this.storage.get("token").then((token)=>{
          console.log("token");
      console.log(token);
          this.general_service.result_detail("multifiberresults/searchsn/", token, response.serialnumber ).subscribe(response =>{
            console.log(response);
            console.log(response.label);
            this.retresults = response;

          },(err) =>{
            console.log("Estoy en el error");
            console.log(err);
          });
        });
      });


  }

  goToLanding(){
    this.router.navigate(['landing'], { replaceUrl: true });

  }
}
