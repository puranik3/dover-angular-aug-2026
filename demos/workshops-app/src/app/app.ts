import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from './menu/menu'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbAlert, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'workshops-app';
  numClicks = 0;
  isOpen = true;

  changeTitle() : void {
    this.title = "Workshops Application";
    ++this.numClicks;
  }


  toggle() {
    this.isOpen = false;
  }
}
