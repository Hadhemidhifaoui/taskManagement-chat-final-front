import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdministrateurComponent } from './update-administrateur.component';

describe('UpdateAdministrateurComponent', () => {
  let component: UpdateAdministrateurComponent;
  let fixture: ComponentFixture<UpdateAdministrateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAdministrateurComponent]
    });
    fixture = TestBed.createComponent(UpdateAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
