import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchbarPage } from './searchbar.page';

describe('SearchbarPage', () => {
  let component: SearchbarPage;
  let fixture: ComponentFixture<SearchbarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
