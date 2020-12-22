import { OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EffectSources } from './effect_sources';
import * as ɵngcc0 from '@angular/core';
export declare class EffectsRunner implements OnDestroy {
    private effectSources;
    private store;
    private effectsSubscription;
    constructor(effectSources: EffectSources, store: Store<any>);
    start(): void;
    ngOnDestroy(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<EffectsRunner, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<EffectsRunner>;
}

//# sourceMappingURL=effects_runner.d.ts.map