import { getElementRoot, raf } from '../utils';

import type { PopoverSize, PositionAlign, PositionReference, PositionSide, TriggerAction } from './popover-interface';
import { POPOVER_IOS_BODY_MARGIN } from './animations/ios.enter';

interface InteractionCallback {
  eventName: string;
  callback: (ev: any) => void; // TODO(FW-2832): type
}

export interface ReferenceCoordinates {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface PopoverPosition {
  top: number;
  left: number;
  referenceCoordinates?: ReferenceCoordinates;
  originX: string;
  originY: string;
}

export interface PopoverStyles {
  top: number;
  left: number;
  bottom?: number;
  originX: string;
  originY: string;
  checkSafeAreaLeft: boolean;
  checkSafeAreaRight: boolean;
  addPopoverBottomClass: boolean;
}

/**
 * Returns the recommended dimensions of the popover
 * that takes into account whether or not the width
 * should match the trigger width.
 */
export const getPopoverDimensions = (size: PopoverSize, contentEl: HTMLElement, triggerEl?: HTMLElement) => {
  const contentDimentions = contentEl.getBoundingClientRect();
  const contentHeight = contentDimentions.height;
  let contentWidth = contentDimentions.width;

  if (size === 'cover' && triggerEl) {
    const triggerDimensions = triggerEl.getBoundingClientRect();
    contentWidth = triggerDimensions.width;
  }

  return {
    contentWidth,
    contentHeight,
  };
};

export const configureDismissInteraction = (
  triggerEl: HTMLElement,
  triggerAction: TriggerAction,
  popoverEl: HTMLIonPopoverElement,
  parentPopoverEl: HTMLIonPopoverElement,
) => {
  let dismissCallbacks: InteractionCallback[] = [];
  const root = getElementRoot(parentPopoverEl);
  const parentContentEl = root.querySelector('.popover-content') as HTMLElement;

  switch (triggerAction) {
    case 'hover':
      dismissCallbacks = [
        {
          /**
           * Do not use mouseover here
           * as this will causes the event to
           * be dispatched on each underlying
           * element rather than on the popover
           * content as a whole.
           */
          eventName: 'mouseenter',
          callback: (ev: MouseEvent) => {
            /**
             * Do not dismiss the popover is we
             * are hovering over its trigger.
             * This would be easier if we used mouseover
             * but this would cause the event to be dispatched
             * more often than we would like, potentially
             * causing performance issues.
             */
            const element = document.elementFromPoint(ev.clientX, ev.clientY) as HTMLElement | null;
            if (element === triggerEl) {
              return;
            }

            popoverEl.dismiss(undefined, undefined, false);
          },
        },
      ];
      break;
    case 'context-menu':
    case 'click':
    default:
      dismissCallbacks = [
        {
          eventName: 'click',
          callback: (ev: MouseEvent) => {
            /**
             * Do not dismiss the popover is we
             * are hovering over its trigger.
             */
            const target = ev.target as HTMLElement;
            const closestTrigger = target.closest('[data-ion-popover-trigger]');
            if (closestTrigger === triggerEl) {
              /**
               * stopPropagation here so if the
               * popover has dismissOnSelect="true"
               * the popover does not dismiss since
               * we just clicked a trigger element.
               */
              ev.stopPropagation();
              return;
            }

            popoverEl.dismiss(undefined, undefined, false);
          },
        },
      ];
      break;
  }

  dismissCallbacks.forEach(({ eventName, callback }) => parentContentEl.addEventListener(eventName, callback));

  return () => {
    dismissCallbacks.forEach(({ eventName, callback }) => parentContentEl.removeEventListener(eventName, callback));
  };
};

/**
 * Configures the triggerEl to respond
 * to user interaction based upon the triggerAction
 * prop that devs have defined.
 */
export const configureTriggerInteraction = (triggerEl: HTMLElement, triggerAction: TriggerAction, popoverEl: HTMLIonPopoverElement) => {
  let triggerCallbacks: InteractionCallback[] = [];

  /**
   * Based upon the kind of trigger interaction
   * the user wants, we setup the correct event
   * listeners.
   */
  switch (triggerAction) {
    case 'hover':
      let hoverTimeout: ReturnType<typeof setTimeout> | undefined;

      triggerCallbacks = [
        {
          eventName: 'mouseenter',
          callback: async (ev: Event) => {
            ev.stopPropagation();

            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }

            /**
             * Hovering over a trigger should not
             * immediately open the next popover.
             */
            hoverTimeout = setTimeout(() => {
              raf(() => {
                popoverEl.presentFromTrigger(ev);
                hoverTimeout = undefined;
              });
            }, 100);
          },
        },
        {
          eventName: 'mouseleave',
          callback: (ev: MouseEvent) => {
            if (hoverTimeout) {
              clearTimeout(hoverTimeout);
            }

            /**
             * If mouse is over another popover
             * that is not this popover then we should
             * close this popover.
             */
            const target = ev.relatedTarget as HTMLElement | null;
            if (!target) {
              return;
            }

            if (target.closest('ion-popover') !== popoverEl) {
              popoverEl.dismiss(undefined, undefined, false);
            }
          },
        },
        {
          /**
           * stopPropagation here prevents the popover
           * from dismissing when dismiss-on-select="true".
           */
          eventName: 'click',
          callback: (ev: Event) => ev.stopPropagation(),
        },
        {
          eventName: 'ionPopoverActivateTrigger',
          callback: (ev: Event) => popoverEl.presentFromTrigger(ev, true),
        },
      ];

      break;
    case 'context-menu':
      triggerCallbacks = [
        {
          eventName: 'contextmenu',
          callback: (ev: Event) => {
            /**
             * Prevents the platform context
             * menu from appearing.
             */
            ev.preventDefault();
            popoverEl.presentFromTrigger(ev);
          },
        },
        {
          eventName: 'click',
          callback: (ev: Event) => ev.stopPropagation(),
        },
        {
          eventName: 'ionPopoverActivateTrigger',
          callback: (ev: Event) => popoverEl.presentFromTrigger(ev, true),
        },
      ];

      break;
    case 'click':
    default:
      triggerCallbacks = [
        {
          /**
           * Do not do a stopPropagation() here
           * because if you had two click triggers
           * then clicking the first trigger and then
           * clicking the second trigger would not cause
           * the first popover to dismiss.
           */
          eventName: 'click',
          callback: (ev: Event) => popoverEl.presentFromTrigger(ev),
        },
        {
          eventName: 'ionPopoverActivateTrigger',
          callback: (ev: Event) => popoverEl.presentFromTrigger(ev, true),
        },
      ];
      break;
  }

  triggerCallbacks.forEach(({ eventName, callback }) => triggerEl.addEventListener(eventName, callback));
  triggerEl.setAttribute('data-ion-popover-trigger', 'true');

  return () => {
    triggerCallbacks.forEach(({ eventName, callback }) => triggerEl.removeEventListener(eventName, callback));
    triggerEl.removeAttribute('data-ion-popover-trigger');
  };
};

/**
 * Returns the index of an ion-item in an array of ion-items.
 */
export const getIndexOfItem = (items: HTMLIonItemElement[], item: HTMLElement | null) => {
  if (!item || item.tagName !== 'ION-ITEM') {
    return -1;
  }

  return items.findIndex((el) => el === item);
};

/**
 * Given an array of elements and a currently focused ion-item
 * returns the next ion-item relative to the focused one or
 * undefined.
 */
export const getNextItem = (items: HTMLIonItemElement[], currentItem: HTMLElement | null) => {
  const currentItemIndex = getIndexOfItem(items, currentItem);
  return items[currentItemIndex + 1];
};

/**
 * Given an array of elements and a currently focused ion-item
 * returns the previous ion-item relative to the focused one or
 * undefined.
 */
export const getPrevItem = (items: HTMLIonItemElement[], currentItem: HTMLElement | null) => {
  const currentItemIndex = getIndexOfItem(items, currentItem);
  return items[currentItemIndex - 1];
};

/** Focus the internal button of the ion-item */
const focusItem = (item: HTMLIonItemElement) => {
  const root = getElementRoot(item);
  const button = root.querySelector('button');

  if (button) {
    raf(() => button.focus());
  }
};

/**
 * Positions a popover by taking into account
 * the reference point, preferred side, alignment
 * and viewport dimensions.
 */
export const getPopoverPosition = (
  isRTL: boolean,
  contentWidth: number,
  contentHeight: number,
  reference: PositionReference,
  side: PositionSide,
  align: PositionAlign,
  defaultPosition: PopoverPosition,
  triggerEl?: HTMLElement,
  event?: MouseEvent | CustomEvent,
): PopoverPosition => {
  let referenceCoordinates = {
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  /**
   * Calculate position relative to the
   * x-y coordinates in the event that
   * was passed in
   */
  switch (reference) {
    case 'event':
      if (!event) {
        return defaultPosition;
      }

      const mouseEv = event as MouseEvent;

      referenceCoordinates = {
        top: mouseEv.clientY,
        left: mouseEv.clientX,
        width: 1,
        height: 1,
      };

      break;

    /**
     * Calculate position relative to the bounding
     * box on either the trigger element
     * specified via the `trigger` prop or
     * the target specified on the event
     * that was passed in.
     */
    case 'trigger':
    default:
      const customEv = event as CustomEvent;

      /**
       * ionShadowTarget is used when we need to align the
       * popover with an element inside of the shadow root
       * of an Ionic component. Ex: Presenting a popover
       * by clicking on the collapsed indicator inside
       * of `ion-breadcrumb` and centering it relative
       * to the indicator rather than `ion-breadcrumb`
       * as a whole.
       */
      const actualTriggerEl = (triggerEl || customEv?.detail?.ionShadowTarget || customEv?.target) as HTMLElement | null;
      if (!actualTriggerEl) {
        return defaultPosition;
      }
      const triggerBoundingBox = actualTriggerEl.getBoundingClientRect();
      referenceCoordinates = {
        top: triggerBoundingBox.top,
        left: triggerBoundingBox.left,
        width: triggerBoundingBox.width,
        height: triggerBoundingBox.height,
      };

      break;
  }

  /**
   * Get top/left offset that would allow
   * popover to be positioned on the
   * preferred side of the reference.
   */
  const coordinates = calculatePopoverSide(side, referenceCoordinates, contentWidth, contentHeight, isRTL);

  /**
   * Get the top/left adjustments that
   * would allow the popover content
   * to have the correct alignment.
   */
  const alignedCoordinates = calculatePopoverAlign(align, side, referenceCoordinates, contentWidth, contentHeight);

  const top = coordinates.top + alignedCoordinates.top;
  const left = coordinates.left + alignedCoordinates.left;

  const { originX, originY } = calculatePopoverOrigin(side, align, isRTL);

  return { top, left, referenceCoordinates, originX, originY };
};

/**
 * Determines the transform-origin
 * of the popover animation so that it
 * is in line with what the side and alignment
 * prop values are. Currently only used
 * with the MD animation.
 */
const calculatePopoverOrigin = (side: PositionSide, align: PositionAlign, isRTL: boolean) => {
  switch (side) {
    case 'top':
      return { originX: getOriginXAlignment(align), originY: 'bottom' };
    case 'bottom':
      return { originX: getOriginXAlignment(align), originY: 'top' };
    case 'left':
      return { originX: 'right', originY: getOriginYAlignment(align) };
    case 'right':
      return { originX: 'left', originY: getOriginYAlignment(align) };
    case 'start':
      return { originX: isRTL ? 'left' : 'right', originY: getOriginYAlignment(align) };
    case 'end':
      return { originX: isRTL ? 'right' : 'left', originY: getOriginYAlignment(align) };
  }
};

const getOriginXAlignment = (align: PositionAlign) => {
  switch (align) {
    case 'start':
      return 'left';
    case 'center':
      return 'center';
    case 'end':
      return 'right';
  }
};

const getOriginYAlignment = (align: PositionAlign) => {
  switch (align) {
    case 'start':
      return 'top';
    case 'center':
      return 'center';
    case 'end':
      return 'bottom';
  }
};

/**
 * Calculates the required top/left
 * values needed to position the popover
 * content on the side specified in the
 * `side` prop.
 */
const calculatePopoverSide = (
  side: PositionSide,
  triggerBoundingBox: ReferenceCoordinates,
  contentWidth: number,
  contentHeight: number,
  isRTL: boolean,
) => {
  const sideLeft = {
    top: triggerBoundingBox.top,
    left: triggerBoundingBox.left - contentWidth,
  };
  const sideRight = {
    top: triggerBoundingBox.top,
    left: triggerBoundingBox.left + triggerBoundingBox.width,
  };

  switch (side) {
    case 'top':
      return {
        top: triggerBoundingBox.top - contentHeight,
        left: triggerBoundingBox.left,
      };
    case 'right':
      return sideRight;
    case 'bottom':
      return {
        top: triggerBoundingBox.top + triggerBoundingBox.height,
        left: triggerBoundingBox.left,
      };
    case 'left':
      return sideLeft;
    case 'start':
      return isRTL ? sideRight : sideLeft;
    case 'end':
      return isRTL ? sideLeft : sideRight;
  }
};

/**
 * Calculates the required top/left
 * offset values needed to provide the
 * correct alignment regardless while taking
 * into account the side the popover is on.
 */
const calculatePopoverAlign = (
  align: PositionAlign,
  side: PositionSide,
  triggerBoundingBox: ReferenceCoordinates,
  contentWidth: number,
  contentHeight: number,
) => {
  switch (align) {
    case 'center':
      return calculatePopoverCenterAlign(side, triggerBoundingBox, contentWidth, contentHeight);
    case 'end':
      return calculatePopoverEndAlign(side, triggerBoundingBox, contentWidth, contentHeight);
    case 'start':
    default:
      return { top: 0, left: 0 };
  }
};

/**
 * Calculate the end alignment for
 * the popover. If side is on the x-axis
 * then the align values refer to the top
 * and bottom margins of the content.
 * If side is on the y-axis then the
 * align values refer to the left and right
 * margins of the content.
 */
const calculatePopoverEndAlign = (
  side: PositionSide,
  triggerBoundingBox: ReferenceCoordinates,
  contentWidth: number,
  contentHeight: number,
) => {
  switch (side) {
    case 'start':
    case 'end':
    case 'left':
    case 'right':
      return {
        top: -(contentHeight - triggerBoundingBox.height),
        left: 0,
      };
    case 'top':
    case 'bottom':
    default:
      return {
        top: 0,
        left: -(contentWidth - triggerBoundingBox.width),
      };
  }
};

/**
 * Calculate the center alignment for
 * the popover. If side is on the x-axis
 * then the align values refer to the top
 * and bottom margins of the content.
 * If side is on the y-axis then the
 * align values refer to the left and right
 * margins of the content.
 */
const calculatePopoverCenterAlign = (
  side: PositionSide,
  triggerBoundingBox: ReferenceCoordinates,
  contentWidth: number,
  contentHeight: number,
) => {
  switch (side) {
    case 'start':
    case 'end':
    case 'left':
    case 'right':
      return {
        top: -(contentHeight / 2 - triggerBoundingBox.height / 2),
        left: 0,
      };
    case 'top':
    case 'bottom':
    default:
      return {
        top: 0,
        left: -(contentWidth / 2 - triggerBoundingBox.width / 2),
      };
  }
};

/**
 * Adjusts popover positioning coordinates
 * such that popover does not appear offscreen
 * or overlapping safe area bounds.
 */
export const calculateWindowAdjustment = (
  side: PositionSide,
  coordTop: number,
  coordLeft: number,
  bodyPadding: number,
  bodyWidth: number,
  bodyHeight: number,
  contentWidth: number,
  contentHeight: number,
  safeAreaMargin: number,
  contentOriginX: string,
  contentOriginY: string,
  triggerCoordinates?: ReferenceCoordinates,
  eventElementRect?: DOMRect,
  isReplace: boolean = false,
): PopoverStyles => {
  const triggerTop = triggerCoordinates ? triggerCoordinates.top + triggerCoordinates.height : bodyHeight / 2 - contentHeight / 2;
  const triggerHeight = triggerCoordinates ? triggerCoordinates.height : 0;
  let left = coordLeft;
  let top = !isReplace ? coordTop + POPOVER_IOS_BODY_MARGIN : coordTop - triggerHeight;
  let bottom;
  let originX = contentOriginX;
  let originY = contentOriginY;
  let checkSafeAreaLeft = false;
  let checkSafeAreaRight = false;
  let addPopoverBottomClass = false;

  /**
   * Adjust popover so it does not
   * go off the left of the screen.
   */
  if (left < bodyPadding + safeAreaMargin) {
    left = !eventElementRect ? bodyPadding : eventElementRect.left;
    if (left === 0) {
      left = safeAreaMargin;
    }
    checkSafeAreaLeft = true;
    originX = 'left';
    /**
     * Adjust popover so it does not
     * go off the right of the screen.
     */
  } else if (contentWidth + bodyPadding + left + safeAreaMargin > bodyWidth) {
    checkSafeAreaRight = true;
    left = !eventElementRect ? bodyWidth - contentWidth - bodyPadding : eventElementRect.right - contentWidth;
    if (left + contentWidth === bodyWidth) {
      left = left - safeAreaMargin;
    }
    originX = 'right';
  }

  /**
   * Adjust popover so it does not
   * go off the top of the screen.
   * If popover is on the left or the right of
   * the trigger, then we should not adjust top
   * margins.
   */
  const compareTop = triggerCoordinates ? triggerCoordinates.top + triggerCoordinates.height / 2 : bodyHeight / 2 - contentHeight / 2;
  if (compareTop > bodyHeight / 2 && (side === 'top' || side === 'bottom')) {
    if (triggerTop - contentHeight > 0) {
      /**
       * While we strive to align the popover with the trigger
       * on smaller screens this is not always possible. As a result,
       * we adjust the popover up so that it does not hang
       * off the bottom of the screen. However, we do not want to move
       * the popover up so much that it goes off the top of the screen.
       *
       * We chose 12 here so that the popover position looks a bit nicer as
       * it is not right up against the edge of the screen.
       */
      if (!isReplace) {
        top = Math.max(12, triggerTop - contentHeight - triggerHeight) - POPOVER_IOS_BODY_MARGIN;
      } else {
        top = Math.max(12, triggerTop - contentHeight);
      }
      originY = 'bottom';
      addPopoverBottomClass = true;

      /**
       * If not enough room for popover to appear
       * above trigger, then cut it off.
       */
    } else {
      bottom = bodyPadding;
    }
  }

  return {
    top,
    left,
    bottom,
    originX,
    originY,
    checkSafeAreaLeft,
    checkSafeAreaRight,
    addPopoverBottomClass,
  };
};
