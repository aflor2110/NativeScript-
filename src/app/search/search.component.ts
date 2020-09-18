import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Store } from "@ngrx/store";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { NoticiasService } from "../domain/noticias.services";
import { Color, View } from "tns-core-modules/ui/page";
import * as Toast from "nativescript-toasts";
import { Noticia, NuevaNoticiaAction } from ".././domain/noticias-state.module";
import { AppState } from "../app.module";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
    moduleId: module.id
})

export class SearchComponent implements OnInit {
    resultados: Array<string> = [];

    @ViewChild("layout", {static: false}) layout: ElementRef;

    constructor(private noticias: NoticiasService,
                private store: Store<AppState>) {
        // Use the component constructor to inject providers.
    }

    dolater(fn) { setTimeout(fn, 1000); }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("afcafc");
        this.store.select((state) => state.noticias.sugerida)
      .subscribe((data) => {
          const f = data;
          if (f != null) {
              Toast.show({text: "Sugerimos leer: " + f.titulo, duration: Toast.DURATION.SHORT});
              console.log("Sugerimos leer" + f.titulo);
          }
      });
      /*  this.noticias.agregar("Noticia 1");
        this.noticias.agregar("Noticia 2");
        this.noticias.agregar("Noticia 3");
        this.noticias.agregar("Noticia 4");
        this.noticias.agregar("Noticia 5");
      
        this.dolater(() =>
            dialogs.action("Mensaje", "Cancelar", ["Opcion1", "opcion2"])
            .then((result) => {
                console.log("resultado: " + result);
                if (result === "Opcion1") {
                    this.dolater(() =>
                    dialogs.alert({
                        title: "titulo 1",
                        message: "mansaje 1",
                        okButtonText: "Btn 1"
                    }).then(() => console.log("cerrado 1")));
                    
                } else if (result === "Opcion2") {
                    this.dolater(() =>
                    
                    dialogs.alert({
                        title: "titulo 1",
                        message: "mansaje 1",
                        okButtonText: "Btn 1"
                    }).then(() => console.log("cerrado 1")));
                }
            }
        
        ));
      */
        console.log(this.noticias);
        Toast.show({text: "Mensaje de Bienvenido", duration: Toast.DURATION.SHORT});
    
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onItemTap(args): void {
        console.log("Agrego Favorito: " + args.view.bindingContext);
        this.noticias.agregarFavorito(args.view.bindingContext);
        
        this.store.dispatch(new NuevaNoticiaAction(new Noticia(args.view.bindingContext)));

        this.dolater(() =>
            dialogs.action("Mensaje", "Cancelar", ["Opcion1", "Opcion2"])
            .then((result) => {
                console.log("resultado: " + result);
                if (result === "Opcion1") {
                    this.dolater(() =>
                    dialogs.alert({
                        title: "titulo 1",
                        message: "Seleccion Opcion 1",
                        okButtonText: "OK"
                    }).then(() => console.log("cerrado 1")));
                    
                } else if (result === "Opcion2") {
                    this.dolater(() =>
                    
                    dialogs.alert({
                        title: "Seleccion Opcion 2",
                        message: "mansaje 2",
                        okButtonText: "Aceptar"
                    }).then(() => console.log("cerrado 1")));
                }
            }
        
        ));
    }

    buscarAhora(s: string) {
        console.log(this.noticias);
        console.log(this.resultados);
        // this.resultados = this.noticias.buscar(s).filter((x) => x.indexOf(s) >= 0);
        console.dir("buscarAhora: " + s);

        this.noticias.buscar(s).then((r: any) => {
            console.log("resultados buscarAhora: " , JSON.stringify(r));
            this.resultados = r;
            console.log("This.resultados: " + this.resultados);
        }, (e) => {
            console.log("error buscarAhora: " + e);
            Toast.show({text: "error en busqueda", duration: Toast.DURATION.SHORT});
            
        });

        const layout = <View>this.layout.nativeElement;
        layout.animate({
            backgroundColor: new Color("blue"),
            duration: 300,
            delay: 150

        }).then(() => layout.animate({
            backgroundColor: new Color("white"),
            duration: 300,
            delay: 150
        }));
    }
    
}
