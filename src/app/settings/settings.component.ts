// import { Component, Input, OnInit } from "@angular/core";
import { Component, OnInit, AfterViewInit, NgZone, ViewChild, ElementRef, EventEmitter, Output, Pipe } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import * as appSettings from "tns-core-modules/application-settings";

@Component({
    selector: "Settings",
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    
    textFieldValue: string = "Texto inicial" ;
    @ViewChild("layout", {static: false}) layout: ElementRef;
    // @Input() inicial: string;

    constructor() {
        // Use the component constructor to inject providers.
    }
    // ngAfterViewInit(): void {
    //    throw new Error("Method not implemented.");
    // }

    ngOnInit(): void {
        // Init your component properties here.
        
        const nombreUsuario = appSettings.getString("nombreUsuario", "Anónimo");
        this.textFieldValue = appSettings.getString("nombreUsuario", "Anónimo");
        console.log(nombreUsuario);
        // console.log(this.inicial);
        // tslint:disable-next-line:label-position
        
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    onButtonTap(): void {
    
        // console.log("Button was pressed: " + this.inicial);
        console.log("this.textFieldValue: " + this.textFieldValue);
        // this.textFieldValue =  appSettings.getString("nombreUsuario", "Anónimo");
    
        console.log(this.textFieldValue);
    }

}
