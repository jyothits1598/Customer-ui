import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryLoaderService {

  constructor() { }

  loadBibrary(url: string) {
    return new Observable(observer => {
      
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => { console.log('load complete');observer.next(); observer.complete(); };
      script.onerror = () => observer.error();
    })
  }
}
