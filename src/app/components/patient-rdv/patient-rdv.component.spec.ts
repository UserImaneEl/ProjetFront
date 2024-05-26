import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRDVComponent } from './patient-rdv.component';

describe('PatientRDVComponent', () => {
  let component: PatientRDVComponent;
  let fixture: ComponentFixture<PatientRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientRDVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PatientRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
