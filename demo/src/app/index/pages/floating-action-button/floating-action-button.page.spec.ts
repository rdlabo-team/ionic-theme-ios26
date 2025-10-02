import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FloatingActionButtonPage } from './floating-action-button.page';
import { testConfig } from '../../../../../util/test.config';

describe('FloatingActionButtonPage', () => {
  let component: FloatingActionButtonPage;
  let fixture: ComponentFixture<FloatingActionButtonPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(FloatingActionButtonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
