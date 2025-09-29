import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RangePage } from './range.page';
import { testConfig } from '../../../../../util/test.config';

describe('RangePage', () => {
  let component: RangePage;
  let fixture: ComponentFixture<RangePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(RangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
