import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SportsNewsRoutingModule } from "./sportsnews-routing.module";
import { SportsNewsComponent } from "./sportsnews.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SportsNewsRoutingModule
    ],
    declarations: [
        SportsNewsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SportsNewsModule { }
