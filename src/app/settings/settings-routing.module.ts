import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SettingsComponent } from "./settings.component";
import { SetingEditComponent } from "./setting.edit.component";

const routes: Routes = [
    { path: "", component: SettingsComponent },
    { path: "edit", component: SetingEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingsRoutingModule { }
