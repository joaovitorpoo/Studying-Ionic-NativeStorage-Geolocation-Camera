import { Component } from '@angular/core';
import { Platform, AlertController} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { pessoa } from '../model/pessoa.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pessoa : pessoa;

  pessoaForm = {} as pessoa;

  temCadastro = false;


  constructor(private nativeStorage: NativeStorage, private platform: Platform, private geolocation: Geolocation, public alertController: AlertController) {}

  async ngOnInit(){
    let key = "pessoa";
    let pessoaSalved: pessoa;
    if(this.platform.is("hybrid")){
      this.nativeStorage.getItem(key).then(
        (data: pessoa) => pessoaSalved = data,
        erro => console.log("erro")
      );
      if (pessoaSalved != null) {
        this.temCadastro = true;
        this.pessoa = pessoaSalved;
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          message: "Você já tem cadastro",
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      let json = localStorage.getItem(key);
      pessoaSalved = JSON.parse(json);
      if (pessoaSalved != null) {
        this.temCadastro = true;
        this.pessoa = pessoaSalved;
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          message: "Você já tem cadastro",
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  armazenaPessoa(pessoa: pessoa) {
    let key = "pessoa";
    this.pessoa = pessoa;
    if(this.platform.is("hybrid")){
      this.nativeStorage.setItem(key,pessoa).then(
        () => console.log("Salvo com sucesso"),
        error => console.log("Não foi possivel salvar")
      );
    } else {
      localStorage.setItem(key, JSON.stringify(pessoa));
    }
  }

  async click(){
    this.pessoaForm.id = 0;
    let latitudeUser: number;
    let longitudeUser: number;
    await this.geolocation.getCurrentPosition().then((resp) => {
      latitudeUser = resp.coords.latitude;
      longitudeUser = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    this.pessoaForm.latitude = latitudeUser;
    this.pessoaForm.longitude = longitudeUser;
    this.armazenaPessoa(this.pessoaForm);
    this.temCadastro = true;
  }
}
