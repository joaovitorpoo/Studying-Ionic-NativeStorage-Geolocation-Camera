import { Component } from '@angular/core';
import { Platform} from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { pessoa } from '../model/pessoa.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  pessoa: pessoa;

  temCadastro = false;

  constructor(private nativeStorage: NativeStorage, private platform: Platform) {}

  async ngOnInit(){
    let key = "pessoa";
    let pessoaSalved: pessoa;
    if(this.platform.is("hybrid")){
      this.nativeStorage.getItem(key).then(
        data => pessoaSalved = data,
        erro => console.log("erro")
      );
      if (pessoaSalved == null) {
        this.temCadastro = true;
        this.pessoa = pessoaSalved;
      }
    } else {
      let json = localStorage.getItem(key);
      pessoaSalved = JSON.parse(json);
      if (pessoaSalved == null) {
        this.temCadastro = true;
        this.pessoa = pessoaSalved;
      }
    }
  }

  armazenaPessoa(pessoa: pessoa) {
    let key = "pessoa";
    if(this.platform.is("hybrid")){
      this.nativeStorage.setItem(key,pessoa).then(
        () => console.log("Salvo com sucesso"),
        error => console.log("Não foi possivel salvar")
      );
    } else {
      localStorage.setItem(key, JSON.stringify(pessoa));
    }
  }
}
