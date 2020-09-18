import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { GridLayout } from "tns-core-modules/ui/layouts/grid-layout";
import { Store } from "@ngrx/store";
import { AppState } from "../app.module";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    updates: Array<string>;
    all;

    constructor(public store: Store<AppState>) {
        // Use the component constructor to inject providers.
        store.select((state) => state.noticias.favorito).subscribe((favorito) => this.all = favorito);
        this.updates = [];
    }

    ngOnInit(): void {
        // Init your component properties here.
        this.store.select ((state) => state.noticias.favorito)
            .subscribe((data) => {
                const f = data;
                if (f != null) {
                    console.log("Valores" + f.fav);
                    this.updates.push(f.fav);
                }
            });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
    // tslint:disable-next-line:no-empty
    onItemTap(): void {
    }

    onLongPress(args: GestureEventData) {
        console.log("objeto que disparo el evento 1S: " + args.object);
        console.log("View que disparo el evento: " + args.view);
        console.log("Nombre de Evento: " + args.eventName);

        const grid = <GridLayout>args.object;
        grid.rotate = 0;
        grid.backgroundColor = "red";
        grid.animate({
            rotate: 360,
            duration: 2000
        });
        
    }
}
