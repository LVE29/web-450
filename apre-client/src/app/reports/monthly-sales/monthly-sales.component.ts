
/**
 * Author: Leslie Espino
 * Date: 11/1/2026
 * File: monthly-sales.component.ts
 * Description: Displays monthly sales totals using the shared chart component.
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ChartComponent } from '../../shared/chart/chart.component';

interface MonthlySales {
  year: number;
  month: number;
  totalSales: number;
}

@Component({
  selector: 'app-monthly-sales',
  standalone: true,
  imports: [ChartComponent],
  template: `
    <h1>Monthly Sales Report</h1>

    <div class="monthly-sales-container">
      @if (loading) {
        <p>Loading monthly sales...</p>
      } @else if (errorMessage) {
        <p role="alert">{{ errorMessage }}</p>
      } @else if (totalSales.length > 0) {
        <div class="card chart-card">
          <app-chart
            [type]="'bar'"
            [label]="'Monthly Sales'"
            [data]="totalSales"
            [labels]="months">
          </app-chart>
        </div>
      } @else {
        <p>No monthly sales data available.</p>
      }
    </div>
  `,
  styles: [`
    .monthly-sales-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .chart-card {
      width: 70%;
      margin: 20px 0;
    }
  `]
})
export class MonthlySalesComponent implements OnInit {
  totalSales: number[] = [];
  months: string[] = [];
  loading = true;
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMonthlySales();
  }

  loadMonthlySales(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<MonthlySales[]>(
      `${environment.apiBaseUrl}/reports/sales/monthly`
    ).subscribe({
      next: (data) => {
        this.totalSales = data.map(sale => sale.totalSales);
        this.months = data.map(sale => {
          const monthName = new Date(
            Date.UTC(sale.year, sale.month - 1, 1)
          ).toLocaleString('en-US', {
            month: 'short',
            timeZone: 'UTC'
          });

          return `${monthName} ${sale.year}`;
        });

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching monthly sales:', err);
        this.errorMessage = 'Unable to load monthly sales data.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
