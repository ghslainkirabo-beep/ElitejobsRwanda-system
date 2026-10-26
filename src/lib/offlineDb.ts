import Dexie, { Table } from 'dexie';

export interface LocalVisitor {
  id?: number;
  badgeId: string;
  fullName: string;
  nationalId: string;
  phone: string;
  purpose: string;
  hostEmployee: string;
  checkInTime: string;
  synced: boolean;
}

export interface LocalAttendance {
  id?: number;
  userId: string;
  username: string;
  checkInTime: string;
  status: string;
  synced: boolean;
}

export class StandaloneDatabase extends Dexie {
  visitors!: Table<LocalVisitor>;
  attendanceLogs!: Table<LocalAttendance>;

  constructor() {
    super('EliteJobsStandaloneDB');
    this.version(1).stores({
      visitors: '++id, badgeId, nationalId, synced',
      attendanceLogs: '++id, userId, checkInTime, synced'
    });
  }
}

export const offlineDb = new StandaloneDatabase();