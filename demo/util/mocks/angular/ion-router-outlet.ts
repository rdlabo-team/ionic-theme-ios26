import { BaseMock } from '../util/base.mock';

const METHODS = [
  'nativeEl',
  // 'tabsPrefix',
  // 'stackEvents',
  // 'activateEvents',
  // 'deactivateEvents',
  // 'animated',
  // 'ngOnDestroy',
  // 'getContext',
  // 'ngOnInit',
  // 'isActivated',
  // 'component',
  // 'activatedRoute',
  // 'activatedRouteData',
  // 'detach',
  // 'attach',
  // 'deactivate',
  // 'activateWith',
  // 'canGoBack',
  // 'pop',
  // 'getLastUrl',
  // 'getLastRouteView',
  // 'getRootView',
  // 'getActiveStackId',
];

export class IonRouterOutletMock extends BaseMock {
  constructor() {
    super('NavController', METHODS);

    this.spyObj.nativeEl.and.returnValue();
  }

  public static instance(): any {
    return new IonRouterOutletMock();
  }
}
