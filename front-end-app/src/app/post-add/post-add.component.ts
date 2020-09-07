import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  isPCFormOpen: boolean = true;
  isPhoneFormOpen: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  closeAllForms(): void {
    this.isPCFormOpen = false;
    this.isPhoneFormOpen = false;
  }

  openPCForm(): void {
    this.closeAllForms();
    this.isPCFormOpen = true;
  }

  openPhoneForm() {
    this.closeAllForms();
    this.isPhoneFormOpen = true;
  }
}
