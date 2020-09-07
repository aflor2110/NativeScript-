import { Injectable } from "@angular/core";

@Injectable()
export class NoticiasService {
private noticias: Array<string> = [];
private noticiasDetalle: Array<string> = [];

agregar(s: string) {
    this.noticias.push(s);
}

buscar(s: string) {
    return this.noticias;
}

agregaDetalle(comenta: string, usuario: string, puntaje: string) {
    this.noticiasDetalle.push(comenta, usuario, puntaje);
}
buscarDetalle() {
    return this.noticiasDetalle;
}

}
