import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from '../../../common/toast';


import { Sessions } from '../../sessions';
import ISession from '../../models/ISession';

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
  constructor(
      private activatedRoute: ActivatedRoute,
      private sessionsService: Sessions,
      private router: Router,
      private toastService: Toast
  ) {}
  
  addSession(addSessionForm: NgForm) {
        const id = +(this.activatedRoute.snapshot.parent?.paramMap.get(
            'id'
        ) as string);

        const newSession = {
            ...addSessionForm.value,
            workshopId: id,
            upvoteCount: 0,
            sequenceId: +addSessionForm.value.sequenceId,
            duration: +addSessionForm.value.duration,
        } as Omit<ISession, 'id'>;

        console.log(newSession);
        
        this.sessionsService.addSession(newSession).subscribe({
            next: (addedSession) => {
                // alert(`Added session with id = ${addedSession.id}`);

                this.toastService.add({
                  message: `Added session with id = ${addedSession.id}`,
                  className: 'bg-success text-light',
                  duration: 5000,
                });
                
                // You can also use navigateByUrl()
                this.router.navigate(['/workshops', id]);
            },
            error: (error) => {
              this.toastService.add({
                  message: `Unable to add the session - ${error.message}`,
                  className: 'bg-danger text-light',
                  duration: 5000,
              });
            },
        });
    }
}
