import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetTimeSeriesComponent } from './time-sheet-time-series.component';

describe('TimeSheetTimeSeriesComponent', () => {
  let component: TimeSheetTimeSeriesComponent;
  let fixture: ComponentFixture<TimeSheetTimeSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSheetTimeSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetTimeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
