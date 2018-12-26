import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ups-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) { }
  ngOnInit() { }

  redirectToCreate() {
    this.router.navigate(['/community/create']);
  }

  redirectToComunities() {
    this.router.navigate(['/communities']);
  }

}
