import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientComponentComponent } from './add-patient-component.component';

describe('AddPatientComponentComponent', () => {
  let component: AddPatientComponentComponent;
  let fixture: ComponentFixture<AddPatientComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPatientComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPatientComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
