import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import * as appSettings from "tns-core-modules/application-settings";
const firebase = require("nativescript-plugin-firebase");
import { Message } from "nativescript-plugin-firebase";
import * as Toast from "nativescript-toasts";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
 
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
        
        if (isAndroid) { const sistemaoeprativo = "android";
                         console.log(sistemaoeprativo);
                         console.log(device.os); }
        appSettings.setString("nombreUsuario", "Antonio.Flores");

        firebase.init({
            onMessageReceivedCallback: (message: Message) => {
                // tslint:disable-next-line:no-invalid-template-strings
                console.log(`titulo: ${message.title}`);
                console.log(`cuerpo: ${message.body}`);
                console.log(`data: ${JSON.stringify(message.data)}`);
                Toast.show({text: "Notificacion: " + message.title, duration: Toast.DURATION.SHORT});
            },
            onPushTokenReceivedCallback: (token) => console.log("firebase push token: " + token)
        }).then(
            () => console.log("firebase.init done"),
            (error) => console.log(`firebse.init error: ${error}`));

    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
