/**
 * Author: Leslie Espino
 * Date: 11/08/2026
 * File: agent-performance-summary.component.spec.ts
 * Description: Unit tests for the M-084 Agent Performance Report.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AgentPerformanceSummaryComponent } from './agent-performance-summary.component';
import { environment } from '../../../../environments/environment';

describe('AgentPerformanceSummaryComponent', () => {
  let component: AgentPerformanceSummaryComponent;
  let fixture: ComponentFixture<AgentPerformanceSummaryComponent>;
  let httpMock: HttpTestingController;

  const apiUrl =
    `${environment.apiBaseUrl}/reports/agent-performance/agent-performance-summary`;

  const mockAgents = [
    { agentId: '1', name: 'Agent A', averagePerformance: 90 },
    { agentId: '2', name: 'Agent B', averagePerformance: 85 }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentPerformanceSummaryComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AgentPerformanceSummaryComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test 1: Verify the component initializes.
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Verify the API response updates the component.
  it('should retrieve agent performance data', () => {
    fixture.detectChanges();

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');

    request.flush(mockAgents);

    expect(component.agents).toEqual(mockAgents);
    expect(component.loading).toBeFalse();
  });

  // Test 3: Verify the shared TableComponent displays the report data.
  it('should display agent performance results using TableComponent', () => {
    fixture.detectChanges();

    const request = httpMock.expectOne(apiUrl);
    request.flush(mockAgents);

    fixture.detectChanges();

    const table = fixture.nativeElement.querySelector('app-table');
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(table).toBeTruthy();
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Agent A');
    expect(rows[0].textContent).toContain('90.00');
    expect(rows[1].textContent).toContain('Agent B');
    expect(rows[1].textContent).toContain('85.00');
  });

});
