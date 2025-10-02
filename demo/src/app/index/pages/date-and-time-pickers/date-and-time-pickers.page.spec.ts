import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateAndTimePickersPage } from './date-and-time-pickers.page';
import { testConfig } from '../../../../../util/test.config';

describe('DateAndTimePickersPage', () => {
  let component: DateAndTimePickersPage;
  let fixture: ComponentFixture<DateAndTimePickersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(DateAndTimePickersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
