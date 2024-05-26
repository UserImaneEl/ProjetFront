import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinTemplateComponent } from './medecin-template.component';

describe('MedecinTemplateComponent', () => {
  let component: MedecinTemplateComponent;
  let fixture: ComponentFixture<MedecinTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedecinTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedecinTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
