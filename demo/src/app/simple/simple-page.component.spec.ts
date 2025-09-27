import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DemoPhotoEditorPage } from './simple-page.component';
import { testConfig } from '../../../../util/test.config';

describe('PhotoEditorPage', () => {
  let component: DemoPhotoEditorPage;
  let fixture: ComponentFixture<DemoPhotoEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: testConfig.providers,
    }).compileComponents();
    fixture = TestBed.createComponent(DemoPhotoEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
