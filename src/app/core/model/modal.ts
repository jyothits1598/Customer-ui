import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef } from '@angular/core';

export class ModalRef {
    overLayRef: OverlayRef
    onDismiss: () => void;

    constructor(overLayRef: OverlayRef) {
        this.overLayRef = overLayRef
    }

    dismiss() {
        if (this.onDismiss) this.onDismiss();
        this.overLayRef.dispose();
    }
}

export class ComponentModalRef<T> extends ModalRef {
    instance: T;
    constructor(overLayRef: OverlayRef, instance: T) {
        super(overLayRef);
        this.instance = instance;
    }
}

export interface ModalConfig {
    yPosition?: string,
    // TODO: implement disable auto close
    disableAutoClose?: boolean
}