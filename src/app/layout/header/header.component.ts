import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ups-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public router: Router) { }
  ngOnInit() { }

  // Go to "Create Community"
  redirectToCreate() {
    this.router.navigate(['/community/create']);
  }

  // Go to "Communities"
  redirectToComunities() {
    this.router.navigate(['/community/communities']);
  }

}
