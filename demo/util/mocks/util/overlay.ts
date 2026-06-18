import { BaseMock } from './base.mock';

const METHODS = ['create', 'dismiss', 'getTop'];

export class Overlay extends BaseMock {
  constructor() {
    super('Overlay', METHODS);

    this.spyObj.create.mockReturnValue(Promise.resolve());
    this.spyObj.dismiss.mockReturnValue(Promise.resolve());
    this.spyObj.getTop.mockReturnValue(Promise.resolve());
  }
}
