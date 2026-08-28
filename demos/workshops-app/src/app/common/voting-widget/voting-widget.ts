import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-voting-widget',
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './voting-widget.html',
  styleUrl: './voting-widget.scss',
})
export class VotingWidget {
  icons = {
    faCaretUp,
    faCaretDown
  };

  @Input()
  votes!: number;

  // The emitted event will pass to the parent how much to change the vote by (+1, -2 etc.)
  @Output()
  vote = new EventEmitter<number>();

  emitVote(by: number) {
      this.vote.emit(by);
  }  
}
