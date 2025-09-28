import { BaseMock } from '../util/base.mock';

const METHODS = ['navigateForward', 'navigateBack', 'navigateRoot', 'back', 'pop', 'setDirection', 'setTopOutlet', 'consumeTransition'];

export class NavControllerMock extends BaseMock {
  constructor() {
    super('NavController', METHODS);

    this.spyObj.navigateForward.and.returnValue(Promise.resolve());
    this.spyObj.navigateBack.and.returnValue(Promise.resolve());
    this.spyObj.navigateRoot.and.returnValue(Promise.resolve());
    this.spyObj.back.and.returnValue(Promise.resolve());
    this.spyObj.pop.and.returnValue(Promise.resolve());
    this.spyObj.setDirection.and.returnValue();
    this.spyObj.setTopOutlet.and.returnValue();
    this.spyObj.consumeTransition.and.returnValue();
  }

  public static instance(): any {
    return new NavControllerMock();
  }
}
