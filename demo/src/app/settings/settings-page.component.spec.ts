import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsPage } from './settings-page.component';
import { testConfig } from '../../../../util/test.config';

describe('VirtualScrollHeaderPage', () => {
  let component: SettingsPage;
  let fixture: ComponentFixture<SettingsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(SettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
