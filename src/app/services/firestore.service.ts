import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { orderBy, query } from 'firebase/firestore';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:Firestore) { }

  loginRegister(user:string){
    let col = collection (this.firestore, 'sesiones');
    addDoc(col, { fecha: new Date(), usuario: user })
  }

  getData(contador:number, sesioneCol:any[]){
    let col = collection(this.firestore, 'sesiones');
    const observable = collectionData(col);

    observable.subscribe((respuesta) => {
      sesioneCol = respuesta;
      contador = sesioneCol.length;
      console.log(respuesta);
    })

  }
  getDataChat(): Observable<any[]> {
    const col = collection(this.firestore, 'chat');
    const q = query(col, orderBy('time'));
    return collectionData(q);
  }
  chatNew(texto: string, usuario: string){
    let col = collection (this.firestore, 'chat');
    addDoc(col, { text: texto, time: new Date(), user: usuario })
  }
}