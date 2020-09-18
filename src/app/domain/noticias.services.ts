import { Injectable } from "@angular/core";

import { getJSON, request } from "tns-core-modules/http";

import * as couchbaseModule from "nativescript-couchbase";

const sqlite = require ("nativescript-sqlite");

@Injectable()
export class NoticiasService {
api: string = "https://3a48aaeed847.ngrok.io";
database: couchbaseModule.Couchbase;
// private noticias: Array<string> = [];
private noticiasDetalle: Array<string> = [];
private resulados2: Array<string>;
private favNoticias: Array<string>;

constructor() {
    this.database = new couchbaseModule.Couchbase("test-database");

    this.getDb((db) => {
        console.dir(db);
        db.each("select * from logs",
          (err, fila) => console.log("Fila: ", fila),
          (err, totales) => console.log("Filas totales", totales)
        );
      }, () => console.log("Error on getDB"));

    this.getDbfav((db) => {
        console.dir(db);
        db.each("select * from favoritos",
          (err, fila) => console.log("Fila fav: ", fila),
          (err, totales) => console.log("Filas totales fav", totales)
        );
      }, () => console.log("Error on getDB"));
}

getDbfav(fnOk, fnError) {
    return new sqlite("my_db_logs", (err, db) => {
      if (err) {
        console.error("Error al abrir DB!", err);
      } else {
        console.log("BD abierta: ", db.isOpen() ? "Si" : "No");
        db.execSQL("CREATE TABLE IF NOT EXISTS favoritos (id INTEGER PRIMARY KEY AUTOINCREMENT, nomFav TEXT)")
          .then((id) => {
            console.log("CREATE TABLE favorito OK");
            fnOk(db);
          }, (error) => {
            console.log("CREATE TABLE ERROR favorito", error);
            fnError(error);
          });
      }
    });
  }

getDb(fnOk, fnError) {
    return new sqlite("my_db_logs", (err, db) => {
      if (err) {
        console.error("Error al abrir DB!", err);
      } else {
        console.log("BD abierta: ", db.isOpen() ? "Si" : "No");
        db.execSQL("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)")
          .then((id) => {
            console.log("CREATE TABLE OK");
            fnOk(db);
          }, (error) => {
            console.log("CREATE TABLE ERROR", error);
            fnError(error);
          });
      }
    });
  }

agregar(s: string) {
        // this.noticias.push(s);
        return request({
            url: this.api + "/favs",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify({
                nuevo: s
            })
        });
    }

favs() {
    return getJSON(this.api + "/favs");
}

buscar(s: string) {
    this.getDb((db) => {
        db.execSQL("insert into logs (texto) values (?)", [s],
        (err, id) => console.log ("nuevo id: ", id));
    }, () => console.log("error on getDB"));

    // const documentId = this.database.createDocument({texto: s});
    // console.log("nuevo id couchbase: ", documentId);
    console.log(this.api + "/get?q=" + s);

    return getJSON(this.api + "/get?q=" + s);

}

buscarDetalle() {
    return this.noticiasDetalle;
}
agregarFavorito(nomFav2: string) {
    console.log ("nuevo agregar fav: " + nomFav2);
    this.getDbfav((db) => {
        db.execSQL("insert into favoritos (nomFav) values (?)", [nomFav2],
        (err, id) => console.log ("nuevo id favoritos: ", id));
    }, () => console.log("error on getDB favoritos"));

    const documentId = this.database.createDocument({nomFav: nomFav2});
    console.log("nuevo id couchbase: ", documentId);
    console.log("agreado favorito " + nomFav2);
}
agregaDetalle(comenta: string, usuario: string, puntaje: string) {
    this.noticiasDetalle.push(comenta, usuario, puntaje);
}

buscarFavorito() {
    this.getDbfav((db) => {
      db.all("SELECT DISTINCT nomFav FROM favoritos").then((rows) => {
          this.resulados2 = [];
          // tslint:disable-next-line:forin
          for (const row in rows) {
              this.resulados2.push(rows[row]);
              console.log("arreglo posicion!" + rows[row]);
              console.log("arreglo posicion favarra!" + this.resulados2[row]);
        }
    }, (error) => {
            console.log("SELECT ERROR", error);
    });
    }, () => console.log("error on getDB"));

    /*getJSON(this.api + "/get?q=").then((r:any)=>{
      this.favArray2 = r;
     });
     for(var row2 in this.favArray) {
        this.resulados2.push(this.favArray2[this.favArray[row2]]);
        console.log("arreglo result2 eso tengo!" + this.favArray2[this.favArray[row2]]);
    };*/
    return this.resulados2;
}

}
