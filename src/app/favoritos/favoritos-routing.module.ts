import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { FavoritosComponent } from "./favoritos.component";

const routes: Routes = [
    { path: "", component: FavoritosComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class FavoritosRoutingModule { }
