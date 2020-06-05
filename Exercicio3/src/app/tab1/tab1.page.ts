import { Component } from '@angular/core';
import { PessoasService } from '../services/pessoas.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { pessoa } from '../model/pessoa.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  pessoas: pessoa[];

  constructor(private pessoasService: PessoasService, private geolocation: Geolocation) {}

  async ngOnInit(){
    let latitudeUser: number;
    let longitudeUser: number;
    await this.geolocation.getCurrentPosition().then((resp) => {
      latitudeUser = resp.coords.latitude;
      longitudeUser = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    this.pessoas = this.pessoasService.encontrarPessoasProximas(latitudeUser,longitudeUser);
  }
}

