import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private langSelectListId = 'lang-select-list';
  private currencySelectListId = 'currency-select-list';
  private countrySelectListId = 'country-select-list';
  private categoryPickedBackgroundColor = '#45a1ac';
  private categoryBackgroundColor = 'transparent';
  private lastPickedCategoryId = '';
  constructor() {
  }

  ngOnInit(): void {
  }

  pickCategory(categoryId): void {
    if(this.lastPickedCategoryId !== '') {
      document.getElementById(this.lastPickedCategoryId).style.backgroundColor = this.categoryBackgroundColor;
    }
    let pickedCategory = document.getElementById(categoryId);
    pickedCategory.style.backgroundColor = this.categoryPickedBackgroundColor;
    this.lastPickedCategoryId = categoryId;

  }

  openCloseMenuSelector(selectListId): void {
    let selectList = document.getElementById(selectListId);
    let display = selectList.style.display;
    if (display === 'none' || display === '') {
      this.closeAllSelect();
      selectList.style.display = 'block';
    } else {
      selectList.style.display = 'none';
    }
  }

  pickOption(code, selectId, selectorListId): void {
    this.closeAllSelect();
    document.getElementById(selectId).childNodes[1].textContent = code;
  }

  closeAllSelect(): void {
    document.getElementById(this.langSelectListId).style.display = 'none';
    document.getElementById(this.currencySelectListId).style.display = 'none';
    document.getElementById(this.countrySelectListId).style.display = 'none';
  }
}
