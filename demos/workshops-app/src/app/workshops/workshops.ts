import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import IWorkshop from './models/IWorkshop';

// Root injector will have the new Workshops() object - any part of the app can get this workshops object
@Injectable({
  providedIn: 'root',
})
export class Workshops {
  constructor( private http: HttpClient ) {
  }

  getWorkshops( page: number = 1  ) {
    // this.http.get(), post() etc. return an RxJS Observable object
    return this.http.get<IWorkshop[]>(
      `https://workshops-server.onrender.com/workshops`,
    {
        params: {
          _page: page
        }
      }
    );
  }
}
