import { Injectable } from '@angular/core';

// Root injector will have the new Workshops() object - any part of the app can get this workshops object
@Injectable({
  providedIn: 'root',
})
export class Workshops {
  getWorkshops() {
    console.log( 'getWorkshops called' );
  }
}
