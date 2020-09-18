import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { action } from "tns-core-modules/ui/dialogs";

// Estado
export class Noticia {
    constructor(public titulo: string) {}
}
// leer
// tslint:disable-next-line:max-classes-per-file
export class NoticiaLeer {
    constructor(public fav: string) {}
}

// tslint:disable-next-line:interface-name
export interface NoticiasState {
    items: Array<Noticia>;
    sugerida: Noticia;
    favorito: NoticiaLeer;
}

export function intializeNoticiasState() {
    return{
        items: [],
        sugerida: null,
        favorito: null
    };
}

// acciones
export enum NoticiasActionTypes {
    INIT_MY_DATA = "[Noticias] Init My Data",
    NUEVA_NOTICIA = "[Noticias] Nueva",
    SUGERIR_NOTICIA = "[Noticias] sugerir",
    NOTICIA_LEER = "[Noticias] Nueva Leer"
}

// tslint:disable-next-line:max-classes-per-file
export class InitMyDataAction implements Action {
    type = NoticiasActionTypes.INIT_MY_DATA;
    constructor(public titulares: Array<string>) {}
}

// tslint:disable-next-line:max-classes-per-file
export class NuevaNoticiaAction implements Action {
    type = NoticiasActionTypes.NUEVA_NOTICIA;
    constructor(public noticia: Noticia) {}
}

// tslint:disable-next-line:max-classes-per-file
export class SugerirAction implements Action {
    type = NoticiasActionTypes.SUGERIR_NOTICIA;
    constructor(public noticia: Noticia) {}
}

// tslint:disable-next-line:max-classes-per-file
export class LeerNoticiaAction implements Action {
    type = NoticiasActionTypes.NOTICIA_LEER;
    constructor(public favoritos: NoticiaLeer) {}
}

export type NoticiasViajesActions = NuevaNoticiaAction | InitMyDataAction | LeerNoticiaAction;

// reducer
export function reducersNoticias(
    state: NoticiasState,
    // tslint:disable-next-line:no-shadowed-variable
    action: NoticiasViajesActions
): NoticiasState {
    switch (action.type) {
        case NoticiasActionTypes.INIT_MY_DATA: {
            const titulares: Array<string> = (action as InitMyDataAction).titulares;
            
            return {
                ...state,
                items: titulares.map((t) => new Noticia(t))
            };
        }
        case NoticiasActionTypes.NUEVA_NOTICIA: {
            return {
                ...state,
                items: [...state.items, (action as NuevaNoticiaAction).noticia]
            };
        }
        case NoticiasActionTypes.SUGERIR_NOTICIA: {
            return {
                ...state,
                sugerida: (action as SugerirAction).noticia
            };
        }
        case NoticiasActionTypes.NOTICIA_LEER: {
            return {
                ...state,
                favorito: (action as LeerNoticiaAction).favoritos
            };
        }
    }

    return state;
}

// effects
// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class NoticiasEffects {
    @Effect()
    nuevoAgregado$: Observable<Action> = this.actions$.pipe(
        ofType(NoticiasActionTypes.NUEVA_NOTICIA),
        // tslint:disable-next-line:no-shadowed-variable
        map((action: NuevaNoticiaAction) => new SugerirAction(action.noticia))
    );

    constructor(private actions$: Actions) {}
}
