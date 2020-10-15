import { OverlayRef } from '@angular/cdk/overlay';

export class ModalRef {
    overLayRef: OverlayRef

    constructor(overLayRef: OverlayRef) {
        this.overLayRef = overLayRef
    }

    dismiss() {
        this.overLayRef.dispose();
    }
}