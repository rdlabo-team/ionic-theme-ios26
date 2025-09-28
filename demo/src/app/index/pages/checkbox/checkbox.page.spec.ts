import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxPage } from './checkbox.page';
import { testConfig } from '../../../../../util/test.config';

describe('CheckboxPage', () => {
  let component: CheckboxPage;
  let fixture: ComponentFixture<CheckboxPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(CheckboxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
