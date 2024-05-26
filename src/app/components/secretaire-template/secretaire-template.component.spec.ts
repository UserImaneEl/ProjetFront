import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaireTemplateComponent } from './secretaire-template.component';

describe('SecretaireTemplateComponent', () => {
  let component: SecretaireTemplateComponent;
  let fixture: ComponentFixture<SecretaireTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SecretaireTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretaireTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
