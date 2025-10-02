import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverPage } from './popover.page';
import { testConfig } from '../../../../../util/test.config';

describe('PopoverPage', () => {
  let component: PopoverPage;
  let fixture: ComponentFixture<PopoverPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(PopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
