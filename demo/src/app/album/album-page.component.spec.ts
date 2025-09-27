import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumPage } from './album-page.component';
import { testConfig } from '../../../../util/test.config';

describe('ScrollHeaderPage', () => {
  let component: AlbumPage;
  let fixture: ComponentFixture<AlbumPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(AlbumPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
