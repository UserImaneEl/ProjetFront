import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNoteComponent } from './modal-note.component';

describe('ModalNoteComponent', () => {
  let component: ModalNoteComponent;
  let fixture: ComponentFixture<ModalNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
