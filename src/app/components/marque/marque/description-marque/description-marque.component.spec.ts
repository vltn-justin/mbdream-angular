import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionMarqueComponent } from './description-marque.component';

describe('DescriptionMarqueComponent', () => {
  let component: DescriptionMarqueComponent;
  let fixture: ComponentFixture<DescriptionMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionMarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
