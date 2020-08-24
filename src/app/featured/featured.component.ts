import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationEnd, Router } from "@angular/router";

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onBtnFuncionalidadTap(): void {
        console.log("Click en boton de ayuda");

        this.routerExtensions.navigate(["/featured/funcionalidad"], {
            transition: {
                name: "fade"
            }
        });
    }
}
