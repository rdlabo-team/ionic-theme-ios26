import { BaseMock } from './base.mock';

const METHODS = ['create', 'dismiss', 'getTop'];

export class Overlay extends BaseMock {
  constructor() {
    super('Overlay', METHODS);

    this.spyObj.create.and.returnValue(Promise.resolve());
    this.spyObj.dismiss.and.returnValue(Promise.resolve());
    this.spyObj.getTop.and.returnValue(Promise.resolve());
  }
}
