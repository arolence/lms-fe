import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentPageComponent } from './consent-page.component';

describe('UserErrorComponent', () => {
  let component: ConsentPageComponent;
  let fixture: ComponentFixture<ConsentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});