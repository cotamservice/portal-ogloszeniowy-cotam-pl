import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-to-start-arrow',
  templateUrl: './to-start-arrow.component.html',
  styleUrls: ['./to-start-arrow.component.css']
})
export class ToStartArrowComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    this.addHideShowOnScrolling();
  }

  addHideShowOnScrolling(): void {
    document.addEventListener('scroll',
      function () {
        let currentScrollPos = window.scrollY;
        if (currentScrollPos > 0) {
          document.getElementById('arrow-to-start').style.visibility = 'visible';
          document.getElementById('arrow-to-start').style.opacity = '1';
        } else {
          document.getElementById('arrow-to-start').style.visibility = 'hidden';
          document.getElementById('arrow-to-start').style.opacity = '0';
        }
      })
  }
}
