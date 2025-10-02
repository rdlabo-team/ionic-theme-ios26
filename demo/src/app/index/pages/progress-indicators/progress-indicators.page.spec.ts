import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressIndicatorsPage } from './progress-indicators.page';
import { testConfig } from '../../../../../util/test.config';

describe('ProgressIndicatorsPage', () => {
  let component: ProgressIndicatorsPage;
  let fixture: ComponentFixture<ProgressIndicatorsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(ProgressIndicatorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
