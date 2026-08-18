import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public title = 'Workshops Application';
  public count = 0;

  public changeTitle() {
    this.title = "My first Angular Application";
    ++this.count;
  }
}
