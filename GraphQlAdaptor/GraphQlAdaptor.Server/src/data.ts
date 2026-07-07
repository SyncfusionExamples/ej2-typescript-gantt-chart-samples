import { GanttTask } from './types';

function normalizeDate(date: string): string {
  return new Date(date).toISOString();
}

export const taskDetails: GanttTask[] = [
  {
    TaskID: 1,
    TaskName: 'Planning and Permits',
    StartDate: normalizeDate('2025-04-02'),
    EndDate: normalizeDate('2025-04-10'),
    Duration: 7,
    Progress: 100,
    // ParentId: null
  },
  {
    TaskID: 2,
    TaskName: 'Site Evaluation',
    StartDate: normalizeDate('2025-04-02'),
    EndDate: normalizeDate('2025-04-06'),
    Duration: 4,
    Progress: 100,
    ParentId: 1
  },
  {
    TaskID: 3,
    TaskName: 'Site Evaluation',
    StartDate: normalizeDate('2025-04-02'),
    EndDate: normalizeDate('2025-04-04'),
    Duration: 2,
    Progress: 100,
    ParentId: 1
  }
];
