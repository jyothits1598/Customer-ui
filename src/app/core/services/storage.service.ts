import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  store(key: string, data: any) {
    let dataStr = JSON.stringify(data);
    localStorage.setItem(key, dataStr);
  }
}
