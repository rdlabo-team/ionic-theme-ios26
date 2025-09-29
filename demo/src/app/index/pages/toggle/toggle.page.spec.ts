import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TogglePage } from './toggle.page';
import { testConfig } from '../../../../../util/test.config';

describe('TogglePage', () => {
  let component: TogglePage;
  let fixture: ComponentFixture<TogglePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(TogglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
