import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionPage } from './accordion.page';
import { testConfig } from '../../../../../util/test.config';

describe('AccordionPage', () => {
  let component: AccordionPage;
  let fixture: ComponentFixture<AccordionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(AccordionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
