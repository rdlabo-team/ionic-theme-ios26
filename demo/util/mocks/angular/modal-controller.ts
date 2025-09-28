import { Overlay } from '../util/overlay';

export class ModalControllerMock extends Overlay {
  public static instance(): any {
    return new ModalControllerMock();
  }
}
