import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxPage } from './checkbox.page';

describe('CheckboxPage', () => {
  let component: CheckboxPage;
  let fixture: ComponentFixture<CheckboxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
