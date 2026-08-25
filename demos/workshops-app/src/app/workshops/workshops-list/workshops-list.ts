import { Component, OnInit } from '@angular/core';
import { Workshops } from '../workshops';
import IWorkshop from '../models/IWorkshop';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';

@Component({
  selector: 'app-workshops-list',
  imports: [NgbAlert, LoadingSpinner, ErrorAlert],
  templateUrl: './workshops-list.html',
  styleUrl: './workshops-list.scss',
})
export class WorkshopsList implements OnInit {
  workshops! : IWorkshop[];
  error!: Error;
  loading: boolean = true;

  constructor( private w: Workshops ) {
    // this.w = w;
  }

  ngOnInit() {
    // we don't create our own service object
    // new Workshops();
    // only when we subscrive to the returned Observable is the HTTP GET request made
    this.w.getWorkshops().subscribe({
      next: ( workshops ) => {
        this.workshops = workshops;
        this.loading = false;
      },
      error: ( error ) => {
        this.error = error;
        this.loading = false;
      }
    });
  }

  refresh() {
    console.log( 'refresh' );
  }
}
