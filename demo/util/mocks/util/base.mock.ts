export abstract class BaseMock {
  protected spyObj: any;

  // eslint-disable-next-line
  constructor(baseName: string, methodNames: any[]) {
    this.spyObj = jasmine.createSpyObj(baseName, methodNames);

    methodNames.forEach((methodName) => {
      // @ts-ignore
      this[methodName] = this.spyObj[methodName];
    });
  }
}
