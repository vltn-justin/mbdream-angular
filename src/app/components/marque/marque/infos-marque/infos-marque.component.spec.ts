import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfosMarqueComponent } from './infos-marque.component';

describe('InfosMarqueComponent', () => {
  let component: InfosMarqueComponent;
  let fixture: ComponentFixture<InfosMarqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfosMarqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfosMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
