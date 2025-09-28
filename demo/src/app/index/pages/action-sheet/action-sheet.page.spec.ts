import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionSheetPage } from './action-sheet.page';
import { testConfig } from '../../../../../util/test.config';

describe('ActionSheetPage', () => {
  let component: ActionSheetPage;
  let fixture: ComponentFixture<ActionSheetPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(ActionSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
