import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IWorkshop from './models/IWorkshop';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

// Root injector will have the new Workshops() object - any part of the app can get this workshops object
@Injectable({
  providedIn: 'root',
})
export class Workshops {
  private apiUrl = environment.apiUrl;

  constructor( private http: HttpClient ) {
  }

  getWorkshops( page: number = 1  ) {
    // this.http.get(), post() etc. return an RxJS Observable object
    return this.http.get<IWorkshop[]>(
      `${this.apiUrl}/workshops`,
    {
        params: {
          _page: page
        }
      },
      
    );
  }

  getWorkshopById(workshopId: number) {
    return this.http.get<IWorkshop>(
        `${this.apiUrl}/workshops/${workshopId}`,
    );
  }
}
