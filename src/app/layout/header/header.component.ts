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

  /**
   * This method will allow us to go to "Create Community"
   */
  redirectToCreate() {
    this.router.navigate(['/community/create']);
  }

/**
  * This method will allow us to go to the "Communities" section,
  * in which you will see all the communities that have been created.
  */
  redirectToComunities() {
    this.router.navigate(['/community/communities']);
  }

}
