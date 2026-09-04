import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FavoritesService } from '../favorites';

@Component({
  selector: 'app-favorites',
  
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './favorites.html',
  styleUrl: './favorites.component.css',
})
export class Favorites implements OnInit {
  constructor(public favoritesService: FavoritesService) {}

  ngOnInit() {}
}