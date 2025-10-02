import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPage } from './select.page';
import { testConfig } from '../../../../../util/test.config';

describe('SelectPage', () => {
  let component: SelectPage;
  let fixture: ComponentFixture<SelectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(SelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
