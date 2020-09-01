import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationEnd, Router } from "@angular/router";
import { FuncionalidadService } from "../domain/funcionalidad.services";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    constructor(private router: Router, private routerExtensions: RouterExtensions,
                private funcionalidad: FuncionalidadService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.funcionalidad.agregar("Funcionalidad 1");
        this.funcionalidad.agregar("Funcionalidad 2");
        this.funcionalidad.agregar("Funcionalidad 3");
        this.funcionalidad.agregar("Funcionalidad 4");
        this.funcionalidad.agregar("Funcionalidad 5");
        console.log(this.funcionalidad);

    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onBtnFuncionalidadTap(): void {
        console.log("Click btn de funcionalidad");

        this.routerExtensions.navigate(["funcionalidad"], {
            transition: {
                name: "fade"
            }
        });
    }
    onItemTapFunc(x): void {
        console.log("Selecciono funcionalidad");
        console.log(this.funcionalidad);
        console.dir(x);
    }
}
