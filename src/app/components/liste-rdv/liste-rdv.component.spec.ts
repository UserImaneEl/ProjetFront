import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRDVComponent } from './liste-rdv.component';

describe('ListeRDVComponent', () => {
  let component: ListeRDVComponent;
  let fixture: ComponentFixture<ListeRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListeRDVComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListeRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
