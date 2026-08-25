import { Component, Input } from '@angular/core';
import IWorkshop from '../../models/IWorkshop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-item',
  imports: [ RouterLink ],
  templateUrl: './item.html',
  styleUrl: './item.scss',
})
export class Item {
  @Input()
  workshop!: IWorkshop;
}
