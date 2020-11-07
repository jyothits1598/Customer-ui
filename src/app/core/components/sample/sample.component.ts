import { Component, OnInit } from '@angular/core';
import { SnackBarType } from '../../model/snack-bar';
// declare var gapi: any;
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
    gapi.load('auth2', () => {
      console.log('auth loaded');
      let auth: gapi.auth2.GoogleAuth = gapi.auth2.init({
        client_id: '369468801567-ncm9je96ikkbhf210j82ptf7uj7jttnj.apps.googleusercontent.com'
      })

      auth.then((resp) => {
        auth.signIn().then((success) => console.log('success', success.getId()), (error) => console.log(error));
      })
    });
  }

}
