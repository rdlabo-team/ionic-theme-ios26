import { BaseMock } from '../util/base.mock';

const METHODS = ['navigateForward', 'navigateBack', 'navigateRoot', 'back', 'pop', 'setDirection', 'setTopOutlet', 'consumeTransition'];

export class NavControllerMock extends BaseMock {
  constructor() {
    super('NavController', METHODS);

    this.spyObj.navigateForward.mockReturnValue(Promise.resolve());
    this.spyObj.navigateBack.mockReturnValue(Promise.resolve());
    this.spyObj.navigateRoot.mockReturnValue(Promise.resolve());
    this.spyObj.back.mockReturnValue(Promise.resolve());
    this.spyObj.pop.mockReturnValue(Promise.resolve());
    this.spyObj.setDirection.mockReturnValue(undefined);
    this.spyObj.setTopOutlet.mockReturnValue(undefined);
    this.spyObj.consumeTransition.mockReturnValue(undefined);
  }

  public static instance(): any {
    return new NavControllerMock();
  }
}
