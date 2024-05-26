import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouMedModalComponent } from './ajou-med-modal.component';

describe('AjouMedModalComponent', () => {
  let component: AjouMedModalComponent;
  let fixture: ComponentFixture<AjouMedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouMedModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouMedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
