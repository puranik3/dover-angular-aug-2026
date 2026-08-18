import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkshop } from './add-workshop';

describe('AddWorkshop', () => {
  let component: AddWorkshop;
  let fixture: ComponentFixture<AddWorkshop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWorkshop],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkshop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
