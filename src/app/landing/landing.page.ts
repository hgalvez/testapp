import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

 // public serialnumber: any;
 scantext: any;
  constructor(
    public router: Router,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner


  ) { }

  ngOnInit() {



  }

  searchsn(serialnumber){
  console.log('serialnumber' + serialnumber);
  this.router.navigate(['home', serialnumber]);
  }

  goTologin(){
    this.storage.remove("token");

    this.router.navigate(['login'], { replaceUrl: true });

  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scantext =barcodeData.text;
     }).catch(err => {
         console.log('Error', err);
     });
  }



}
