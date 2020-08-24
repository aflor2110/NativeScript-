import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { NewsComponent } from "./news.component";
import { SportsNewsComponent } from "./sports/sportsnews.component";

const routes: Routes = [
    { path: "", component: NewsComponent },
    { path: "sports", component: SportsNewsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NewsRoutingModule { }
