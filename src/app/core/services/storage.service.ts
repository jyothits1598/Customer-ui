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

  get(key: string) {
    let data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    else return null;
  }

  remove(key: string){
    localStorage.removeItem(key);
  }
}
