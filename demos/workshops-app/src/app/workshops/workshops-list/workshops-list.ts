import { Component, OnInit } from '@angular/core';
import { Workshops } from '../workshops';
import IWorkshop from '../models/IWorkshop';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';
import { Item } from './item/item';
import { Router, ActivatedRoute } from '@angular/router';
import { Pagination } from '../../common/pagination/pagination';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workshops-list',
  imports: [
    NgbAlert,
    LoadingSpinner,
    ErrorAlert,
    Item,
    Pagination,
    FormsModule
  ],
  templateUrl: './workshops-list.html',
  styleUrl: './workshops-list.scss',
})
export class WorkshopsList implements OnInit {
  workshops! : IWorkshop[];
  filteredWorkshops! : IWorkshop[];
  error!: Error;
  loading = true;
  page = 1;

  filterKey = "";

  constructor(
    private w: Workshops,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // this.w = w;
  }

  getWorkshops() {
    this.loading = true;

    this.w.getWorkshops(this.page).subscribe(
        {
            next: (workshops) => {
                this.workshops = workshops;
                this.filteredWorkshops = workshops;
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

  // caaled as soon as the component loads
  ngOnInit() {
      this.getWorkshops();

      // this.activatedRoute.queryParamMap is an Observable that tracks changes to the query string -> thus whenever `page` in the query string changes, the next() method is called
      this.activatedRoute.queryParamMap.subscribe({
          next: (queryParams) => {
              const queryStr = queryParams.get('page');

              // when the page loads for the first time, there is no `page` query string parameter -> so we set page to 1. Later on there is some `page` value
              if (queryStr === null) {
                  this.page = 1;
              } else {
                  this.page = +queryStr; // convert `page` from string type to number
              }

              this.getWorkshops(); // page has changed -> get fresh data
          },
      });
    }

  changePage(by: number) {
    this.page = this.page + by;
    
    // this.getWorkshops();

    // set the query string in the route
    this.router.navigate(
      ['/workshops'],
      {
        queryParams: {
            page: this.page,
        },
    });
  }

  refresh() {
    console.log( 'refresh' );
  }

  filterWorkshops() {
    this.filteredWorkshops = this.workshops.filter((w) =>
        w.name.toLowerCase().includes(this.filterKey.toLowerCase())
    );
  }
}
