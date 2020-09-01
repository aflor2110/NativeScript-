import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { NoticiasService } from "../domain/noticias.services";

@Component({
    selector: "News",
    templateUrl: "./news.component.html"
  //  providers: [NoticiasService]
})
export class NewsComponent implements OnInit {

    constructor(private router: Router, private routerExtensions: RouterExtensions, private noticias: NoticiasService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.noticias.agregar("Sports News 1");
        this.noticias.agregar("Sports News 2");
        this.noticias.agregar("Sports News 3");
        this.noticias.agregar("Sports News 4");

        console.log(this.noticias);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    onButtonHelpTap(): void {
        
        console.log("Click en boton de ayuda");

        this.routerExtensions.navigate(["sportsnews"], {
            transition: {
                name: "fade"
            }
        });
    }

    onItemTapFunc(x): void {
        console.log("Selecciono Noticia 1");
        console.log(this.noticias);
        console.dir(x);
        this.routerExtensions.navigate(["sportsnews"], {
            transition: {
                name: "fade"
            }
        });
    }

}
