import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopsList } from './workshops-list';

describe('WorkshopsList', () => {
  let component: WorkshopsList;
  let fixture: ComponentFixture<WorkshopsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkshopsList],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkshopsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
