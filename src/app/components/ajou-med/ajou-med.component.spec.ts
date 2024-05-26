import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouMedComponent } from './ajou-med.component';

describe('AjouMedComponent', () => {
  let component: AjouMedComponent;
  let fixture: ComponentFixture<AjouMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjouMedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjouMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
