import React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { cn } from '@/lib/utils';

function Dialog(props) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogClose(props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogPortal(props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn('motion-modal-backdrop fixed inset-0 z-50 bg-slate-950/70', className)}
      {...props}
    />
  );
}

// Adapted from shadcn's base-nova dialog: viewport positioning preserves both
// centered modals and bottom-aligned mobile sheets without transform overrides.
// Consumers supply their existing, Indonesian-labelled DialogClose controls.
function DialogContent({ container, className, backdropClassName, overlayClassName, children, ...props }) {
  return (
    <DialogPortal container={container}>
      <DialogOverlay className={backdropClassName} />
      <DialogPrimitive.Viewport
        data-slot="dialog-viewport"
        className={cn('fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6', overlayClassName)}
      >
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn('motion-modal-panel relative w-full bg-white shadow-2xl outline-none', className)}
          {...props}
        >
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPortal>
  );
}

export { Dialog, DialogClose, DialogContent, DialogOverlay, DialogPortal };
