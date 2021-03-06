import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { NoticiasService } from "../../domain/noticias.services";
import * as dialogs from "tns-core-modules/ui/dialogs";

class DataItem {
    constructor(public id: number, public name: string) { }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
    selector: "SpotsNews",
    templateUrl: "../sports/sportsnews.component.html"
    // providers: [NoticiasService]
})
export class SportsNewsComponent implements OnInit {
    myItems: Array<DataItem>;
    private counter: number;

    constructor(private router: Router, private routerExtensions: RouterExtensions,
                private noticiasDetalle: NoticiasService) {
        // Use the component constructor to inject services.

        this.myItems = [];
        this.counter = 0;
        for (let i = 0; i < 50; i++) {
            this.myItems.push(new DataItem(i, "Comenta " + i));
            this.noticiasDetalle.agregaDetalle("", "comenta", "c" + i);
            this.counter = i;
        }
    }
    dolater(fn) { setTimeout(fn, 1000); }

    ngOnInit(): void {
        // Init your component properties here.
        // this.noticiasDetalle.agregaDetalle("Comenta 1", "Aflores", "7.8");
        // this.noticiasDetalle.agregaDetalle("Comenta 2", "Aflores", "7.8");
        // this.noticiasDetalle.agregaDetalle("Comenta 3", "Aflores", "7.8");
        // this.noticiasDetalle.agregaDetalle("Comenta 4", "Aflores", "7.8");

        this.dolater(() =>
            dialogs.action("Mensaje", "Cancelar", ["Opcion1", "opcion2"])
            .then((result) => {
                console.log("resultado: " + result);
                if (result === "Opcion1") {
                    this.dolater(() =>
                    dialogs.alert({
                        title: "Opciones",
                        message: "Seleccione Opcion",
                        okButtonText: "Btn 1"
                    }).then(() => console.log("cerrado 1")));
                    
                } else if (result === "Opcion2") {
                    this.dolater(() =>
                    
                    dialogs.alert({
                        title: "Aviso",
                        message: "mansaje 1",
                        okButtonText: "Aceptar"
                    }).then(() => console.log("cerrado 1")));
                }
            }
        
        ));
    }
    onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }
    onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>app.getRootView();
      sideDrawer.showDrawer();
    }
    onItemTapNoticiaDetalle(det): void {
        console.log(det);
    }
}
