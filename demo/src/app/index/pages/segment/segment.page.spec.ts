import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegmentPage } from './segment.page';
import { testConfig } from '../../../../../util/test.config';

describe('SegmentPage', () => {
  let component: SegmentPage;
  let fixture: ComponentFixture<SegmentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(SegmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
