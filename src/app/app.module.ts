import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { EffectsModule } from "@ngrx/effects";
import { ActionReducerMap, StoreModule as NgRxStoreModule } from "@ngrx/store";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoticiasService } from "./domain/noticias.services";
import { FuncionalidadService } from "./domain/funcionalidad.services";

import {
    intializeNoticiasState,
    NoticiasEffects,
    NoticiasState,
    reducersNoticias
} from "./domain/noticias-state.module";

export interface AppState {
    noticias: NoticiasState;
}

const reducers: ActionReducerMap<AppState> = {
    noticias: reducersNoticias
};

const reducersInitialState = {
    noticias: intializeNoticiasState()
};

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState}),
        EffectsModule.forRoot([NoticiasEffects])
        
    ],
    declarations: [
        AppComponent
    ],
    providers: [NoticiasService, FuncionalidadService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
