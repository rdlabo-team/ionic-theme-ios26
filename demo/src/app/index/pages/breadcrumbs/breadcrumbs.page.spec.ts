import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbsPage } from './breadcrumbs.page';
import { testConfig } from '../../../../../util/test.config';

describe('BreadcrumbsPage', () => {
  let component: BreadcrumbsPage;
  let fixture: ComponentFixture<BreadcrumbsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(BreadcrumbsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
