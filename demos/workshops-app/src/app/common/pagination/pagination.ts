import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input()
  page!: number;

  @Output()
  pageChange = new EventEmitter<number>();

  changePage(by: number) {
    if (this.page + by <= 0) {
        return;
    }

    // child passing the required data to the parent
    this.pageChange.emit(by);
  }
}
