import { Component, OnInit } from '@angular/core';
import { Workshops } from '../workshops';

@Component({
  selector: 'app-workshops-list',
  imports: [],
  templateUrl: './workshops-list.html',
  styleUrl: './workshops-list.scss',
})
export class WorkshopsList implements OnInit {
  //  w : Workshops;

  constructor( private w: Workshops ) {
    // this.w = w;
  }

  ngOnInit() {
    // we don't create out own service object
    // new Workshops();
    this.w.getWorkshops();
  }
}
