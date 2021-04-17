import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoAddComponent } from './moto-add.component';

describe('MotoAddComponent', () => {
  let component: MotoAddComponent;
  let fixture: ComponentFixture<MotoAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotoAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
