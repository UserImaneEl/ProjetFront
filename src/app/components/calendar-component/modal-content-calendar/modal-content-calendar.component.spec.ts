import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalContentCalendarComponent } from './modal-content-calendar.component';

describe('ModalContentComponent', () => {
  let component: ModalContentCalendarComponent;
  let fixture: ComponentFixture<ModalContentCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalContentCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalContentCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
