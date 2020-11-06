import { OverlayRef } from '@angular/cdk/overlay';

export class PopoverRef {
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

export class ComponentPopoverRef<T> extends PopoverRef {
    instance: T;
    constructor(overLayRef: OverlayRef, instance: any) {
        super(overLayRef);
        this.instance = instance;
    }
}