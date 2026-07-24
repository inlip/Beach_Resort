declare module 'node:sqlite' {
  export class StatementSync {
    run(...anonymousParameters: unknown[]): {
      changes: number;
      lastInsertRowid: number | bigint;
    };
    get(...anonymousParameters: unknown[]): unknown;
    all(...anonymousParameters: unknown[]): unknown[];
  }

  export class DatabaseSync {
    constructor(path: string);
    exec(sql: string): void;
    prepare(sql: string): StatementSync;
    close(): void;
  }
}
