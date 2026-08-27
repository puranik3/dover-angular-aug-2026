import { Component, OnInit, signal } from '@angular/core';
import { Workshops } from '../workshops';
import { ActivatedRoute } from '@angular/router';
import IWorkshop from '../models/IWorkshop';
import { LoadingSpinner } from '../../common/loading-spinner/loading-spinner';
import { ErrorAlert } from '../../common/error-alert/error-alert';
import { DatePipe } from '@angular/common';
import { LocationPipe } from '../../common/location-pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-workshop-details',
  imports: [
    LoadingSpinner,
    ErrorAlert,
    DatePipe,
    LocationPipe,
    RouterModule
  ],
  templateUrl: './workshop-details.html',
  styleUrl: './workshop-details.scss',
})
export class WorkshopDetails implements OnInit {
  loading = signal(true);
  error = signal<Error | null>(null);
  workshop = signal<IWorkshop | null>(null);
  workshopId = signal(0);

  constructor(
    private workshopsService: Workshops,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
        this.loading.set(true);

        this.activatedRoute.paramMap.subscribe({
            next: (params) => {
                const idStr = params.get('id');
                this.workshopId.set(+(idStr as string));

                this.workshopsService
                    .getWorkshopById(this.workshopId())
                    .subscribe({
                        next: (workshop) => {
                            this.workshop.set(workshop);
                            this.loading.set(false);
                        },
                        error: (error) => {
                            this.error.set(error);
                            this.loading.set(false);
                        },
                    });
            },
        });
    }
}
