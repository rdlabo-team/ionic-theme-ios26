import { vi } from 'vitest';

export abstract class BaseMock {
  protected spyObj: any;

  // eslint-disable-next-line
  constructor(baseName: string, methodNames: any[]) {
    this.spyObj = methodNames.reduce((o, m) => {
      o[m] = vi.fn();
      return o;
    }, {} as any);

    methodNames.forEach((methodName) => {
      // @ts-ignore
      this[methodName] = this.spyObj[methodName];
    });
  }
}
