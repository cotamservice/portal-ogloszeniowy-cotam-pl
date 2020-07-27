import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private elementPickedBackgroundColor = '#e9bc09';
  private categoryBackgroundColor = 'transparent';
  private lastPickedElementId = '';

  private loginFormId = 'login-form';
  private registrationIndywidualneFormId = 'registration-indywidualne-form';
  private registrationKomisFormId = 'registration-komis-form';
  private registrationBrokerFormId = 'registration-broker-form';
  private lastOpenFormId = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    if (this.router.url.endsWith("login")) {
      this.pickLogin();
    } else if (this.router.url.endsWith("registration")) {
      this.pickIndywidualne();
    }
  }

  pickElement(elementId: string): void {
    if (this.lastPickedElementId !== '') {
      document.getElementById(this.lastPickedElementId).style.backgroundColor = this.categoryBackgroundColor;
    }
    let pickedCategory = document.getElementById(elementId);
    pickedCategory.style.backgroundColor = this.elementPickedBackgroundColor;
    this.lastPickedElementId = elementId;
  }

  setRegistrationTitle(title: string): void {
    document.getElementById('registration-title').textContent = title;
  }

  openCloseForm(formId: string): void {
    if (this.lastOpenFormId !== '') {
      document.getElementById(this.lastOpenFormId).style.display = 'none';
    }
    this.lastOpenFormId = formId;
    document.getElementById(formId).style.display = 'block';
  }

  pickLogin(): void {
    this.pickElement('login');
    this.setRegistrationTitle('logowanie');
    this.openCloseForm(this.loginFormId);
  }

  pickIndywidualne(): void {
    this.pickElement('registration-indywidualne');
    this.setRegistrationTitle('rejestracja');
    this.openCloseForm(this.registrationIndywidualneFormId);
  }

  pickKomis(): void {
    this.pickElement('registration-komis');
    this.setRegistrationTitle('rejestracja');
    this.openCloseForm(this.registrationKomisFormId);
  }

  pickBroker(): void {
    this.pickElement('registration-broker');
    this.setRegistrationTitle('rejestracja');
    this.openCloseForm(this.registrationBrokerFormId);
  }
}
