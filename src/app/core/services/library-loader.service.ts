import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum ExternalLibraries {
  GoogleLogin = 'https://apis.google.com/js/platform.js'
}

@Injectable({
  providedIn: 'root'
})
export class LibraryLoaderService {

  constructor() { }

  loadLibrary(lib: ExternalLibraries) {
    console.log('called load library using ', lib);
    return new Observable(observer => {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = lib;

      console.log('loadLibrary called', script);
      script.onload = () => { console.log('load complete'); observer.next(); observer.complete(); };
      script.onerror = () => observer.error();
      document.body.appendChild(script);
    })
  }
}
