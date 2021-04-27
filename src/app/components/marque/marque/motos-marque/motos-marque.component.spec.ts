import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotosMarqueComponent } from './motos-marque.component';

describe('MotosMarqueComponent', () => {
  let component: MotosMarqueComponent;
  let fixture: ComponentFixture<MotosMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotosMarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotosMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
