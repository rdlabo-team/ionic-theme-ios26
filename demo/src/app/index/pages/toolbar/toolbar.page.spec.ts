import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToolbarPage } from './toolbar.page';
import { testConfig } from '../../../../../util/test.config';

describe('ToolbarPage', () => {
  let component: ToolbarPage;
  let fixture: ComponentFixture<ToolbarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(ToolbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
