import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import IWorkshop from './models/IWorkshop';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  /** 
      {
         1: { id: 1, name: 'Angular', ... },
         2: { id: 2, name: 'React', ... },
         3: { id: 3, name: 'Mongo DB', ... }
      }
  */
  private favorites: {
    [workshopId: number]: IWorkshop;
  } = {};

  private eventSource = new BehaviorSubject<IWorkshop[]>(
    Object.values(this.favorites)
  );
  
  constructor() {}

  public favorites$ = this.eventSource.asObservable();

  public addToFavorites(workshop: IWorkshop) {
    if (this.isFavorite(workshop.id)) {
      return;
    }

    this.favorites[workshop.id] = workshop;
    this.eventSource.next(Object.values(this.favorites));
  }

  public removeFromFavorites(workshopId: number) {
    delete this.favorites[workshopId];
    this.eventSource.next(Object.values(this.favorites));
  }

  public toggleFavorite(workshop: IWorkshop) {
    if (this.isFavorite(workshop?.id)) {
      this.removeFromFavorites(workshop?.id);
    } else {
      this.addToFavorites(workshop);
    }
  }

  public isFavorite(workshopId: number) {
    return !!this.favorites[workshopId];
  }
}