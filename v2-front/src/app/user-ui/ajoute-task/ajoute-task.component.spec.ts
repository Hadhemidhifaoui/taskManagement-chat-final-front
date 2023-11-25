import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteTaskComponent } from './ajoute-task.component';

describe('AjouteTaskComponent', () => {
  let component: AjouteTaskComponent;
  let fixture: ComponentFixture<AjouteTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouteTaskComponent]
    });
    fixture = TestBed.createComponent(AjouteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
