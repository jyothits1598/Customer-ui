import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
  ) { }
  
  ngOnInit(): void {
  }

  showsearchstoreList(){
    document.getElementById('search_list').style.display = 'block';
  }

  backsearch() {
    document.getElementById('search_list').style.display = 'none';
  }
}
