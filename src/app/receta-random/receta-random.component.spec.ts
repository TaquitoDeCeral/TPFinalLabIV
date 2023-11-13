import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaRandomComponent } from './receta-random.component';

describe('RecetaRandomComponent', () => {
  let component: RecetaRandomComponent;
  let fixture: ComponentFixture<RecetaRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetaRandomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecetaRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
