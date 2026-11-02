
/**
 * Author: Leslie Espino
 * Date: 11/1/2026
 * File: monthly-sales.component.spec.ts
 * Description: Unit tests for the Monthly Sales Report component.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController
} from '@angular/common/http/testing';
import { MonthlySalesComponent } from './monthly-sales.component';
import { environment } from '../../../environments/environment';

describe('MonthlySalesComponent', () => {
  let component: MonthlySalesComponent;
  let fixture: ComponentFixture<MonthlySalesComponent>;
  let httpMock: HttpTestingController;

  const apiUrl = `${environment.apiBaseUrl}/reports/sales/monthly`;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlySalesComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlySalesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should display monthly sales data from the API', () => {
    fixture.detectChanges();

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');

    request.flush([
      { year: 2026, month: 1, totalSales: 2500 },
      { year: 2026, month: 2, totalSales: 3200 }
    ]);

    expect(component.totalSales).toEqual([2500, 3200]);
    expect(component.months).toEqual(['Jan 2026', 'Feb 2026']);
    expect(component.loading).toBeFalse();
  });

  it('should handle an empty monthly sales response', () => {
    fixture.detectChanges();

    const request = httpMock.expectOne(apiUrl);
    request.flush([]);

    expect(component.totalSales).toEqual([]);
    expect(component.months).toEqual([]);
    expect(fixture.nativeElement.textContent)
      .toContain('No monthly sales data available.');
  });

  it('should display an error message if the API request fails', () => {
    fixture.detectChanges();

    const request = httpMock.expectOne(apiUrl);
    request.flush(
      { message: 'Server error' },
      { status: 500, statusText: 'Internal Server Error' }
    );

    expect(component.errorMessage)
      .toBe('Unable to load monthly sales data.');
    expect(component.loading).toBeFalse();
    expect(fixture.nativeElement.textContent)
      .toContain('Unable to load monthly sales data.');
  });
});
