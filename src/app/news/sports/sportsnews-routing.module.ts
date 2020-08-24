import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SportsNewsComponent } from "./sportsnews.component";

const routes: Routes = [
    { path: "", component: SportsNewsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SportsNewsRoutingModule { }
