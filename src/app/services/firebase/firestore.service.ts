import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, Firestore, getDocs, limit, orderBy, query, QueryFieldFilterConstraint, QueryOrderByConstraint, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  async pushOne(table: string, object: any): Promise<void> {
    let dataCollection = collection(this.firestore, table);    
    await addDoc(dataCollection, object);
  }


  fetchAll(table: string, order: QueryOrderByConstraint): Observable<any> {
    let col = collection(this.firestore,table);
    const sortedQuery = query(col, order);
    const observable = collectionData(sortedQuery);
    return observable;
  }
  

  async fetchOne(table: string, where: QueryFieldFilterConstraint): Promise<any> {
    let col = collection(this.firestore, table);
    const fetchQuery = query(col, where, limit(1));
    const querySnapshot = await getDocs(fetchQuery);
    return querySnapshot.docs[0]?.data();
  }


  async updateOne(table: string, where: QueryFieldFilterConstraint, data: any): Promise<void> {
    let col = collection(this.firestore, table);
    const fetchQuery = query(col, where, limit(1));
    const querySnapshot = await getDocs(fetchQuery);
    querySnapshot.forEach((doc) => {
      updateDoc(doc.ref, data);
    });
  }


  // async updateMany(table: string, where: QueryFieldFilterConstraint, data: any): Promise<void> {
  //   let col = collection(this.firestore, table);
  //   const fetchQuery = query(col, where);
  //   const querySnapshot = await getDocs(fetchQuery);
  //   querySnapshot.forEach((doc) => {
  //     updateDoc(doc.ref, data);
  //   });
  // }
  

  async deleteOne(table: string, where: QueryFieldFilterConstraint): Promise<void> {
    let col = collection(this.firestore, table);
    const fetchQuery = query(col, where, limit(1));
    const querySnapshot = await getDocs(fetchQuery);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }
  

  async deleteMany(table: string, where: QueryFieldFilterConstraint): Promise<void> {
    let col = collection(this.firestore, table);
    const fetchQuery = query(col, where);
    const querySnapshot = await getDocs(fetchQuery);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }
}
