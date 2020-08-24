import { Injectable } from "@angular/core";

@Injectable()
export class FuncionalidadService {
private funcionalidad: Array<string> = [];

agregar(s: string) {
    this.funcionalidad.push(s);
}

buscar() {
    return this.funcionalidad;
}
}
