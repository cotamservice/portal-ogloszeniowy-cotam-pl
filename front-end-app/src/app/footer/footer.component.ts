import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  openRegistration(): void {
    this.redirectTo('registration');

  }

  redirectTo(pagename: string): void {
    this.router.navigate(['/' + pagename]);
  }
}
