import React, { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';

export default function ModalShell({
  isOpen = true,
  onClose,
  ariaLabel,
  panelId,
  children,
  backdropClassName = '',
  overlayClassName = '',
  panelClassName = ''
}) {
  const [portalContainer, setPortalContainer] = useState(null);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose?.(); }}>
      {/* Keep page-scoped typography and focus styles through the portal. */}
      <div ref={setPortalContainer} className="contents">
        {portalContainer && (
          <DialogContent
            container={portalContainer}
            id={panelId}
            aria-label={ariaLabel}
            aria-modal="true"
            initialFocus={true}
            finalFocus={true}
            backdropClassName={backdropClassName}
            overlayClassName={overlayClassName}
            className={panelClassName}
          >
            {children}
          </DialogContent>
        )}
      </div>
    </Dialog>
  );
}
