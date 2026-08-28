import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-session',
  imports: [
    FormsModule,
    JsonPipe
  ],
  templateUrl: './add-session.html',
  styleUrl: './add-session.scss',
})
export class AddSession {
  
}
