import {Component, Input, OnInit} from '@angular/core';

export class CarouselImg {
  index: number;
  activeListIndex: number;
  isActive: boolean;
  value: string;
}


@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit {
  @Input() values: string[];
  activeImg: CarouselImg;
  activeList: CarouselImg[];
  activeListFirstIndex: number;
  activeListLastIndex: number;


  constructor() {
  }

  ngOnInit(): void {
    this.activeListFirstIndex = 0;
    this.activeListLastIndex = this.values.length < 6 ? this.values.length - 1 : 4;
    this.setActiveList();
    this.setActive(undefined);
  }

  private setActiveList() {
    this.activeList = [];
    let index = 0;
    let activeListIndex = 0;
    for (let value of this.values) {
      if (index >= this.activeListFirstIndex && index <= this.activeListLastIndex) {
        let img = new CarouselImg();
        img.value = value;
        img.index = index;
        img.activeListIndex = activeListIndex;
        this.activeList.push(img);
        ++activeListIndex;
      }
      ++index;
    }
  }

  isPreviousImgExist(): boolean {
    return this.getActive().index > 0;
  }

  previousImg(): void {
    if (!this.isPreviousImgExist()) return;
    if (this.getActive().activeListIndex === 0) {
      this.activeListFirstIndex -= 1;
      this.activeListLastIndex -= this.activeListLastIndex > 4 ? 1 : 0;
      this.setActiveList();
      this.setActive(this.getActiveList()[0]);
    } else {
      this.setActive(this.getActiveList()[this.getActive().activeListIndex - 1]);
    }
  }

  isNextImgExist(): boolean {
    return (this.getActive().index + 1) < this.values.length;
  }

  nextImg(): void {
    if (!this.isNextImgExist()) return;
    if (this.getActive().activeListIndex === this.getActiveList().length - 1) {
      this.activeListFirstIndex += 1;
      this.activeListLastIndex += 1;
      this.setActiveList();
      this.setActive(this.getActiveList()[this.activeList.length - 1]);
    } else {
      this.setActive(this.getActiveList()[this.getActive().activeListIndex + 1]);
    }
  }

  isActive(img: CarouselImg): boolean {
    return img.isActive;
  }

  getActive(): CarouselImg {
    return this.activeImg;
  }

  setActive(img: CarouselImg) {
    if (img) {
      if (this.activeImg && this.activeImg.index !== img.index) {
        this.activeImg.isActive = false;
      }
      img.isActive = true;
      this.activeImg = img;
    } else {
      this.activeImg = this.getActiveList().length > 0 ? this.getActiveList()[0] : new CarouselImg();
      this.activeImg.isActive = true;
    }
  }

  getActiveList() {
    return this.activeList;
  }
}
