import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { FuncionalidadService } from "../../domain/funcionalidad.services";

@Component({
    selector: "Funcionalidad",
    templateUrl: "../funcionalidad/funcionalidad.component.html"
    // providers: [NoticiasService]
})
export class FuncionalidadComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions, private funcionalidad: FuncionalidadService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        // Init your component properties here.
       
    }

    onDrawerButtonTap(): void {
      const sideDrawer = <RadSideDrawer>app.getRootView();
      sideDrawer.showDrawer();
    }
    
}
