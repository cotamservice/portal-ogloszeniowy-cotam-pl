import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PostModel} from "../model/post.model";
import {PostService} from "../service/post/post.service";
import {CountryService} from "../service/country/country.service";

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {
  post: PostModel = this.postS.getPostForPreview();
  flagUrl: string = this.countryS.getFlagUrlByCode(this.post.country.toUpperCase());

  constructor(
    private postS: PostService,
    private router: Router,
    private countryS: CountryService,
  ) {
  }

  ngOnInit(): void {
    if (!this.postS.isPostForPreviewExist()) {
      // this.router.navigate(['/postadd']);
    }
    console.log('POST:');
    console.log(JSON.stringify(this.post));
  }

  getAllPhotos(): string[] {
    let res: string[] = [];
    for (let photosAndDescription of this.post.photosAndDescription) {
      for (let photos of photosAndDescription[0]) {
        res.push(photos);
      }
    }
    return res;
  }
}
/*
{
"category":"personal_cat",
"title":"Tytu ogoszenia",
"markName":"bmw",
"modelBodyName":"bmwbody2",
"modelName":"bmwmodel4",
"mileAge":150099,
"productionYear":2020,
"photosAndDescription":[[[],"opis"]],
"country":"PL",
"region":"PL-KP",
"city":"Kraków",
"range":52,
"salonId":"5f60b02718930105741bd09b",
"price":88522,
"isPriceNetto":true,
"isGiveInvoce":true,
"currency":"EUR",
"state":"5f620a8577d94d03c0e7ca1f",
"isDmg":true,
"isFirstDriver":true,
"isNoAccidents":true,
"hasCarBook":true,
"fuel":"5f6217dfe892a730605d27f4",
"engineDisplacement":5000,
"enginePower":400,
"engineDrive":"5f6217c460174b33f03c3dc0",
"engineGearbox":"5f6217eadf2bad09d8367fe6",
"bodySeats":5,
"bodyDoors":3,
"bodyColor":"blue",
"equipment":[["5f621a83b9b623260080ce1c"],["5f621a83b9b623260080ce1b"],["5f621a83b9b623260080ce1d"]],
"extraEquipment":["extra12341234"],
"vin":"123123123123",
"contactName":"Anton",
"contactEmail":"Password2Password2@gmail.com",
"contactPhone":[["213123123","ru","cv","cy"]],
"amountOfDays":10,
"startDate":"2020-09-29T22:00:00.000Z",
"resumption":true,"promotionDuration":10,
"userSubscriptionId":"5f6a451028890f306437998d",
"isActive":false,
"createOn":"2020-09-30T13:12:14.305Z",
"createById":"5f60b02718930105741bd099"
}
*/
