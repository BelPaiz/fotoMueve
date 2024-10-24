import { Injectable } from '@angular/core';
import { ref, uploadBytes } from "@firebase/storage";
import { Storage, getDownloadURL } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }
  
  async uploadFile(file: File): Promise<string> {
    const storageRef = ref(this.storage, file.name);
    const uploadTask = await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  }
  
  async uploadBlob(blob: Blob, filename: string): Promise<string> {
    const storageRef = ref(this.storage, filename);
    const uploadTask = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  }
}
