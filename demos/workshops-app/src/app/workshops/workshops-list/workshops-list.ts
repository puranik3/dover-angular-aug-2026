import { Component, OnInit } from '@angular/core';
import { Workshops } from '../workshops';
import IWorkshop from '../models/IWorkshop';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';
import { Item } from './item/item';

@Component({
  selector: 'app-workshops-list',
  imports: [
    NgbAlert,
    LoadingSpinner,
    ErrorAlert,
    Item
  ],
  templateUrl: './workshops-list.html',
  styleUrl: './workshops-list.scss',
})
export class WorkshopsList implements OnInit {
  workshops! : IWorkshop[];
  error!: Error;
  loading = true;
  page = 1;

  constructor( private w: Workshops ) {
    // this.w = w;
  }

  getWorkshops() {
    this.loading = true;

    this.w.getWorkshops(this.page).subscribe(
        {
            next: (workshops) => {
                this.workshops = workshops;
                this.loading = false;
                console.log(workshops);
            },
            error: (error) => {
                this.error = error;
                this.loading = false;
                console.log(error);
            },
        }
    );
  }

  ngOnInit() {
      this.getWorkshops();
  }

  changePage(by: number) {
    if (this.page == 1 && by < 0) {
        return;
    }

    this.page = this.page + by;
    
    this.getWorkshops();
  }

  refresh() {
    console.log( 'refresh' );
  }
}
