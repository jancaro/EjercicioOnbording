import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateLibraryComponent } from './private-library.component';

describe('PrivateLibraryComponent', () => {
  let component: PrivateLibraryComponent;
  let fixture: ComponentFixture<PrivateLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
