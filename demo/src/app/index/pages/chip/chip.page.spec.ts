import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChipPage } from './chip.page';
import { testConfig } from '../../../../../util/test.config';

describe('ChipPage', () => {
  let component: ChipPage;
  let fixture: ComponentFixture<ChipPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(ChipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
