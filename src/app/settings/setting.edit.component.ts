import { Component, Input, OnInit, Inject } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { SettingsModule } from "./settings.module";

@Component({
    selector: "EditForm",
    moduleId: module.id,
    templateUrl: "./setting.edit.component.html"
   
})
export class SetingEditComponent implements OnInit {
    textFieldValue: string = "";

    constructor(private routerExtension: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        const nombreUsuario = appSettings.getString("nombreUsuario");
        this.textFieldValue = nombreUsuario;
        console.log("vale esto " + this.textFieldValue);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onButtonTap(): void {
        appSettings.setString("nombreUsuario", this.textFieldValue);
        const nombreUsuario = appSettings.getString("nombreUsuario");
      //  this.SettCom.nombreUs=   this.textFieldValue;
        console.log("Nuevo Valor " + this.textFieldValue);
        
        this.routerExtension.navigate(["settings"], { clearHistory: true });
    }
}
