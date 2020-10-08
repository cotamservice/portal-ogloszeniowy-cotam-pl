import {Component, OnInit} from '@angular/core';
import {GusService} from "../service/gus/gus.service";
import {CountryService} from "../service/country/country.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private countryS: CountryService) {
  }

  ngOnInit(): void {
  }

  click() {
    console.log(this.countryS.getNameByCode('FR'));
    for (let code in this.countryS.getIsoCountries()) {
      let name = this.countryS.getIsoCountries()[code]['name'];
      console.log("CODE: " + code + " NAME: " + name);
    }
  }
}
