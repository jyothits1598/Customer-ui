import { Component, OnInit } from '@angular/core';
import { SnackBarType } from '../../model/snack-bar';
import { ExternalLibraries, LibraryLoaderService } from '../../services/library-loader.service';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  constructor(private libLoad: LibraryLoaderService) {
  }
  ngOnInit(): void {
    // this.libLoad.loadLibrary(ExternalLibraries.GoogleLogin).subscribe(
    //   () => {
    //     gapi.load('auth2', () => {

    //       // let auth = gapi.auth2.init(
    //       //   { client_id: '369468801567-ncm9je96ikkbhf210j82ptf7uj7jttnj.apps.googleusercontent.com' }
    //       // )
    //       // gapi.signin2.render('my-signin2', {

    //       //   'scope': 'profile email',
    //       //   'longtitle': true,
    //       //   'theme': 'light',
    //       // });
    //       let auth = gapi.auth2.init({
    //         client_id: '369468801567-ncm9je96ikkbhf210j82ptf7uj7jttnj.apps.googleusercontent.com',
    //         scope: 'profile'
    //       }).then((auth) => {
    //         console.log('sign in then function, ', auth.signIn().then(
    //           (log) => { console.log('login resp') }
    //         ))
    //       })

    //     })
    //     // let auth = gapi.auth2.init(
    //     //   { client_id: '369468801567-ncm9je96ikkbhf210j82ptf7uj7jttnj.apps.googleusercontent.com' }
    //     // )
    //     // console.log('auth recieved, ', auth);
    //   }
    // )
  }

}
