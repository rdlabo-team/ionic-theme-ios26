import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HealthPage } from './health-page.component';
import { testConfig } from '../../../../util/test.config';

describe('VirtualScrollHeaderPage', () => {
  let component: HealthPage;
  let fixture: ComponentFixture<HealthPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(HealthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
