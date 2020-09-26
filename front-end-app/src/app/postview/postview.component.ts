import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.css']
})
export class PostviewComponent implements OnInit {
  test: any;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    console.log('POSTVIEW ONINIT METHOD');
    this.test = this.route.params.subscribe(params => {
      console.log('PARAMS:');
      console.log(params);
    });
    console.log('TEST: ' + this.test);
  }

}
