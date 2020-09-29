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
  activeImgFS: CarouselImg;
  activeListFS: CarouselImg[];
  activeListFirstIndexFS: number;
  activeListLastIndexFS: number;
  isFullScreen: boolean;


  constructor() {
  }

  ngOnInit(): void {
    this.activeListFirstIndexFS = this.activeListFirstIndex = 0;
    this.activeListLastIndexFS = this.activeListLastIndex = this.values.length < 6 ? this.values.length - 1 : 4;
    this.setActiveList();
    this.setActive(undefined);
  }

  private setActiveList() {
    if (this.isFullScreen) {
      this.activeListFS = [];
    } else {
      this.activeList = [];
    }

    let index = 0;
    let activeListIndex = 0;
    for (let value of this.values) {
      if (index >= this.getActiveFirstIndex() && index <= this.getActiveLastIndex()) {
        let img = new CarouselImg();
        img.value = value;
        img.index = index;
        img.activeListIndex = activeListIndex;
        this.getActiveList().push(img);
        ++activeListIndex;
      }
      ++index;
    }
  }

  private setActiveFirstIndex(val: number) {
    if (this.isFullScreen) {
      this.activeListFirstIndexFS = val;
    } else {
      this.activeListFirstIndex = val;
    }
  }

  private getActiveFirstIndex() {
    return this.isFullScreen ? this.activeListFirstIndexFS : this.activeListFirstIndex;
  }

  private setActiveLastIndex(val: number) {
    if (this.isFullScreen) {
      this.activeListLastIndexFS = val;
    } else {
      this.activeListLastIndex = val;
    }
  }

  private getActiveLastIndex() {
    return this.isFullScreen ? this.activeListLastIndexFS : this.activeListLastIndex;
  }


  isPreviousImgExist(): boolean {
    return this.getActive().index > 0;
  }

  previousImg(): void {
    if (!this.isPreviousImgExist()) return;
    if (this.getActive().activeListIndex === 0) {
      this.setActiveFirstIndex(this.getActiveFirstIndex() - 1);
      this.setActiveLastIndex(this.getActiveLastIndex() - (this.getActiveLastIndex() > 4 ? 1 : 0));
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
      this.setActiveFirstIndex(this.getActiveFirstIndex() + 1);
      this.setActiveLastIndex(this.getActiveLastIndex() + 1);
      this.setActiveList();
      this.setActive(this.getActiveList()[this.getActiveList().length - 1]);
    } else {
      this.setActive(this.getActiveList()[this.getActive().activeListIndex + 1]);
    }
  }

  isActive(img: CarouselImg): boolean {
    return img.isActive;
  }

  getActive(): CarouselImg {
    return this.isFullScreen ? this.getActiveFS() : this.getActiveSS();
  }

  getActiveFS(): CarouselImg {
    return this.activeImgFS;
  }

  getActiveSS(): CarouselImg {
    return this.activeImg;
  }

  setActive(img: CarouselImg) {
    let activeImg: CarouselImg = this.getActive();
    if (img) {
      for (let ele of this.getActiveList()) {
        if (activeImg && activeImg.index === ele.index) {
          ele.isActive = false;
        }
        if (img.index === ele.index) {
          ele.isActive = true;
        }
      }
      img.isActive = true;
      activeImg = img;
    } else {
      activeImg = this.getActiveList().length > 0 ? this.getActiveList()[0] : new CarouselImg();
      activeImg.isActive = true;
    }

    if (this.isFullScreen) {
      this.activeImgFS = activeImg;
    } else {
      this.activeImg = activeImg;
    }
  }

  getActiveList() {
    return this.isFullScreen ? this.getActiveListFS() : this.getActiveListSS();
  }

  getActiveListSS() {
    return this.activeList;
  }

  getActiveListFS() {
    return this.activeListFS;
  }

  closeFullScreen() {
    this.isFullScreen = false;
  }

  openFullScreen() {
    let firstIndex = this.getActiveFirstIndex();
    let lastIndex = this.getActiveLastIndex();
    let activeImg = this.getActive();
    this.isFullScreen = true;
    if (activeImg) {
      this.setActiveFirstIndex(firstIndex);
      this.setActiveLastIndex(lastIndex);
      this.setActiveList();
      this.setActive(activeImg);
    } else {
      this.setActiveList();
      this.setActive(undefined);
    }
  }
}
