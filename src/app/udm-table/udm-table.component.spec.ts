
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { UdmTableComponent } from './udm-table.component';

describe('UdmTableComponent', () => {
  let component: UdmTableComponent;
  let fixture: ComponentFixture<UdmTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UdmTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
