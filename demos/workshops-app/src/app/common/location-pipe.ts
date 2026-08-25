import { Pipe, PipeTransform } from '@angular/core';
import { ILocation } from '../workshops/models/IWorkshop';

@Pipe({
  name: 'location',
})
export class LocationPipe implements PipeTransform {
  transform(
    location: ILocation,
    format: 'short' | 'long' = 'long',
    numChars = 80
  ): unknown {
    let locationStr = `${location.address}, ${location.city}, ${location.state}`;

    if (format === 'short') {
      let locationStrTemp = locationStr.substring(0, numChars);

      if ( locationStr.length > numChars ) {
        locationStr = locationStrTemp + '...';
      }
    }

    return locationStr;
  }
}
