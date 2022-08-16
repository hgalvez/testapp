/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GeneralService } from '../api/general.service';
import { LoadingController } from '@ionic/angular';
//import { Storage } from '@ionic/storage';
import { Storage } from '@ionic/storage-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: any;
  contrasena: any;
  loading: any;
  scantext: any;


  constructor(public alertController: AlertController,
              public router: Router,
              public generalservice: GeneralService,
              public loadingController: LoadingController,
              private storage: Storage,
              private barcodeScanner: BarcodeScanner

              ) {

  }


  ngOnInit() {
    console.log("inicio de login");

  }



  login(){
    if(this.usuario == "" || this.usuario == undefined || this.contrasena == "" || this.contrasena == undefined){

      this.basic_alert("Error", "Invalid credentials");
    }else{

      let scantext: string;
      let user_info = {
                          "email": this.usuario,
                          "password": this.contrasena
                      }

      this.presentLoading("Please wait");


      // Aqui se genera el servicio de logueo
      this.generalservice.login(user_info, 'login').subscribe(response =>{
        console.log("Estoy en el servicio");
        //this.basic_alert("entre",'ya entre');
        console.log(response);
        //this.basic_alert("token",response.token);
        //this.token =response.token;
        const { role, data } = this.loading.dismiss();
        this.storage.set('token', response.token);
        //this.storage.set('name', "Renan");
       // this.storage.set('last_name', "Carrillo");
        //this.storage.set('json_response',response);
        this.router.navigate(['landing'], { replaceUrl: true });
      },(error) =>{

          console.log(error.status);
          console.log(error.error.message); // error message as string
          console.log(error.headers);
          const { role, data } = this.loading.dismiss();


        this.basic_alert("Error", error.error.message);



      });
    }

    console.log("IMprimir");
  }

  validate(){
    // codigo
    // return True o un False
  }

  async presentLoading(msj) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: msj,
      duration: 6000
    });
    await this.loading.present();
  }

  async basic_alert(title,msj) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      message: msj,
      buttons: ['OK']
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }



}

