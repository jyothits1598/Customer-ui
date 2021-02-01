import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef } from '@angular/core';

export class ModalRef {
    overLayRef: OverlayRef

    constructor(overLayRef: OverlayRef) {
        this.overLayRef = overLayRef
    }

    dismiss() {
        this.overLayRef.dispose();
    }
}

export class ComponentModalRef extends ModalRef {
    instance: any;
    constructor(overLayRef: OverlayRef, instance: any) {
        super(overLayRef);
        this.instance = instance;
    }
}

export interface ModalConfig {
    yPosition?: string,
    isDismissable?: boolean
}