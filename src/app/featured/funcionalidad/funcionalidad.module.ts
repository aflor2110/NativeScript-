import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { FuncionalidadRoutingModule } from "./funcionalidad-routing.module";
import { FuncionalidadComponent } from "./funcionalidad.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        FuncionalidadRoutingModule
    ],
    declarations: [
        FuncionalidadComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class FuncionalidadModule { }
