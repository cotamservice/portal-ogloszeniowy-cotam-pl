import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private langSelectListId = 'lang-select-list';
  private currencySelectListId = 'currency-select-list';
  private countrySelectListId = 'country-select-list';
  private elementPickedBackgroundColor = '#3b8790';
  private categoryBackgroundColor = 'transparent';
  private lastPickedElementId = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  pickElement(elementId: string): void {
    if (this.lastPickedElementId !== '') {
      document.getElementById(this.lastPickedElementId).style.backgroundColor = this.categoryBackgroundColor;
    }
    let pickedCategory = document.getElementById(elementId);
    pickedCategory.style.backgroundColor = this.elementPickedBackgroundColor;
    this.lastPickedElementId = elementId;

  }

  pickCategory(elementId: string): void {
    this.pickElement(elementId);
    this.redirectTo('');
  }

  openCloseMenuSelector(selectListId: string): void {
    let selectList = document.getElementById(selectListId);
    let display = selectList.style.display;
    if (display === 'none' || display === '') {
      this.closeAllSelect();
      selectList.style.display = 'block';
    } else {
      selectList.style.display = 'none';
    }
  }

  pickOption(code: string, selectId: string, selectorListId): void {
    this.closeAllSelect();
    document.getElementById(selectId).childNodes[1].textContent = code;
  }

  closeAllSelect(): void {
    document.getElementById(this.langSelectListId).style.display = 'none';
    document.getElementById(this.currencySelectListId).style.display = 'none';
    document.getElementById(this.countrySelectListId).style.display = 'none';
  }

  redirectTo(pagename: string, param?: object): void {
    if(param!== undefined){
      this.router.navigate(['/' + pagename, param]);
    }else{
      this.router.navigate(['/' + pagename]);
    }


  }

  pickRegistration(): void {
    this.pickElement('account');
    this.redirectTo("login");
  }
}
