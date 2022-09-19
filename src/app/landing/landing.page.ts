import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

 // public serialnumber: any;
 scantext: any;
 serialnumber: any;
  constructor(
    public router: Router,
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController


  ) { }

  ngOnInit() {/*
    if(this.serialnumber === '' || this.serialnumber === undefined )
      {

      }
    else{
      this.router.navigate(['home', this.scantext]);
      }
*/

  }

  searchsn(serialnumber){
    if(this.serialnumber === '' || this.serialnumber === undefined )
    {
    }
    else{
        console.log('serialnumber' + serialnumber);
        this.router.navigate(['home', serialnumber]);
    }
  }

  goTologin(){
    this.storage.remove('token');

    this.router.navigate(['login'], { replaceUrl: true });

  }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.scantext =barcodeData.text;
      if(this.scantext === '' || this.scantext === undefined ){
        }
      else{
        this.router.navigate(['home', this.scantext]);
      }
     }).catch(err => {
         console.log('Error', err);
     });
  }

  confirmLogout(){
    this.buttonAlert()
  }

  async buttonAlert() {
    const alert = await this.alertController.create({
      header: 'Back to previous screen?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.goTologin();
          }
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();

  }
}
