import { Component,  OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as toast from "nativescript-toasts";
import { NoticiasService } from "../domain/noticias.services";

import { NoticiasViajesActions, LeerNoticiaAction, NoticiaLeer } from ".././domain/noticias-state.module";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";

@Component({
  selector: "ns-favoritos",
  templateUrl: "./favoritos.component.html"
})
export class FavoritosComponent implements OnInit {
  resultados: Array<string>;
  updates: Array<string>;
  all;
  
  constructor(private noticias: NoticiasService, private store: Store<AppState>) {
    store.select((state) => state.noticias.favorito).subscribe((favorito) => this.all = favorito);

  }

  ngOnInit(): void {
    this.buscarAhora();
 /*   this.store.select ( state => state.noticias.favorito)
    .subscribe(data =>{
        const f=data;
        if (f != null){
          this.updates.push(f.fav);
        }
    });*/
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
}

  buscarAhora() {
  //        this.resultados = this.noticias.buscar().filter((x)=> x.indexOf(s)>=0)
              this.resultados = this.noticias.buscarFavorito();
              console.log("Resultado de Favoritos" + this.resultados);
      }

  onItemTap(args) {
       const d = new NoticiaLeer(args.view.bindingContext);
       this.store.dispatch(new LeerNoticiaAction(d));
       console.log("Enviar " + d.fav);
      }
  onButtonTap(args) {
        const d = new NoticiaLeer(args.view.bindingContext);
        this.store.dispatch(new LeerNoticiaAction(d));
        console.log("Enviar btn " + d.fav);
      }
}
