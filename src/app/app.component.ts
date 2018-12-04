import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'ups-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-pocs';

  constructor(private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    this.config.loadingText = 'Loading Text';
}
}
