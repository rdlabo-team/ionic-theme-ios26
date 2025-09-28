import { Overlay } from '../util/overlay';

export class PopoverControllerMock extends Overlay {
  public static instance(): any {
    return new PopoverControllerMock();
  }
}
