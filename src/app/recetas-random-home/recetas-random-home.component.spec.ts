import { ComponentFixture, TestBed } from '@angular/core/testing';

import { recetasRandomHomeComponent } from './recetas-random-home.component';

describe('HousingLocationComponent', () => {
  let component: recetasRandomHomeComponent;
  let fixture: ComponentFixture<recetasRandomHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [recetasRandomHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(recetasRandomHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
