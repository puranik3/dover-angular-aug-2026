import { Component, Input } from '@angular/core';
import IWorkshop from '../../models/IWorkshop';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LocationPipe } from '../../../common/location-pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faPencil, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

import { FavoritesService } from '../../favorites';

@Component({
  selector: 'app-item',
  imports: [ RouterLink, DatePipe, LocationPipe, FontAwesomeModule ],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class Item {
  @Input()
  workshop!: IWorkshop;

  // icons = {
  //   faPencil,
  //   faTrash,
  //   faStar,
  //   faStarEmpty,
  // };

  // constructor(public favoritesService: FavoritesService) {

  // }
}
