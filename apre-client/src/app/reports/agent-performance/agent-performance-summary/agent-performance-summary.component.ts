/**
 * Author: Leslie Espino
 * Date: 11/08/2026
 * File: agent-performance-summary.component.ts
 * Description: Displays average agent performance scores
 * retrieved from the M-084 report API using the shared TableComponent.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TableComponent } from '../../../shared/table/table.component';

interface AgentPerformance {
  agentId: string;
  name: string;
  averagePerformance: number;
}

@Component({
  selector: 'app-agent-performance-summary',
  standalone: true,
  imports: [CommonModule, TableComponent],
  template: `
    <div class="agent-performance-report">
      <h1>Agent Performance Report</h1>

      <p *ngIf="loading">Loading agent performance data...</p>

      <p *ngIf="errorMessage" class="error">
        {{ errorMessage }}
      </p>

      <app-table
        *ngIf="!loading && !errorMessage && agents.length > 0"
        title="Agent Performance Summary"
        [data]="tableData"
        [headers]="tableHeaders"
        [sortableColumns]="tableHeaders"
        [recordsPerPage]="10"
        headerBackground="primary">
      </app-table>

      <p *ngIf="!loading && !errorMessage && agents.length === 0">
        No agent performance records available.
      </p>
    </div>
  `,
  styles: `
    .agent-performance-report {
      padding: 20px;
    }

    .error {
      color: #d32f2f;
    }
  `
})
export class AgentPerformanceSummaryComponent implements OnInit {
  agents: AgentPerformance[] = [];
  loading = true;
  errorMessage = '';

  tableHeaders = ['Agent ID', 'Agent Name', 'Average Performance'];

  get tableData() {
    return this.agents.map(agent => ({
      'Agent ID': agent.agentId,
      'Agent Name': agent.name,
      'Average Performance': agent.averagePerformance.toFixed(2)
    }));
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAgentPerformance();
  }

  /**
   * Retrieves agent performance data from the server API.
   */
  fetchAgentPerformance(): void {
    this.loading = true;
    this.errorMessage = '';

    this.http.get<AgentPerformance[]>(
      `${environment.apiBaseUrl}/reports/agent-performance/agent-performance-summary`
    ).subscribe({
      next: (data) => {
        this.agents = data;
        this.loading = false;
      },
      error: () => {
        this.agents = [];
        this.errorMessage = 'Unable to load agent performance data.';
        this.loading = false;
      }
    });
  }
}
