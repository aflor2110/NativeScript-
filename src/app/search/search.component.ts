import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as Toast from "nativescript-toast";
import * as app from "tns-core-modules/application";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { NoticiasService } from "../domain/noticias.services";
import { Color, View } from "tns-core-modules/ui/page";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html",
    moduleId: module.id
})
export class SearchComponent implements OnInit {
    resultados: Array<string> = [];

    @ViewChild("layout", {static: false}) layout: ElementRef;

    constructor(private noticias: NoticiasService) {
        // Use the component constructor to inject providers.
    }

    dolater(fn) { setTimeout(fn, 1000); }

    ngOnInit(): void {
        // Init your component properties here.
        console.log("afcafc");
        
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
        
       /*
        const toastOptions: Toast.ToastOptions = {text: "Mensaje de Bienvenida", duration: Toast.duration.long};
        this.dolater(() => Toast.show(toastOptions));
        */
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    buscarAhora(s: string) {
        this.resultados = this.noticias.buscar().filter((x) => x.indexOf(x) >= 0);

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
