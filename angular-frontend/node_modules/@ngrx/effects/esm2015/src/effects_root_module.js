/**
 * @fileoverview added by tsickle
 * Generated from: src/effects_root_module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, Optional } from '@angular/core';
import { createAction, Store, StoreRootModule, StoreFeatureModule, } from '@ngrx/store';
import { EffectsRunner } from './effects_runner';
import { EffectSources } from './effect_sources';
import { ROOT_EFFECTS, _ROOT_EFFECTS_GUARD } from './tokens';
/** @type {?} */
export const ROOT_EFFECTS_INIT = '@ngrx/effects/init';
/** @type {?} */
export const rootEffectsInit = createAction(ROOT_EFFECTS_INIT);
export class EffectsRootModule {
    /**
     * @param {?} sources
     * @param {?} runner
     * @param {?} store
     * @param {?} rootEffects
     * @param {?} storeRootModule
     * @param {?} storeFeatureModule
     * @param {?} guard
     */
    constructor(sources, runner, store, rootEffects, storeRootModule, storeFeatureModule, guard) {
        this.sources = sources;
        runner.start();
        rootEffects.forEach((/**
         * @param {?} effectSourceInstance
         * @return {?}
         */
        (effectSourceInstance) => sources.addEffects(effectSourceInstance)));
        store.dispatch({ type: ROOT_EFFECTS_INIT });
    }
    /**
     * @param {?} effectSourceInstance
     * @return {?}
     */
    addEffects(effectSourceInstance) {
        this.sources.addEffects(effectSourceInstance);
    }
}
EffectsRootModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
EffectsRootModule.ctorParameters = () => [
    { type: EffectSources },
    { type: EffectsRunner },
    { type: Store },
    { type: Array, decorators: [{ type: Inject, args: [ROOT_EFFECTS,] }] },
    { type: StoreRootModule, decorators: [{ type: Optional }] },
    { type: StoreFeatureModule, decorators: [{ type: Optional }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [_ROOT_EFFECTS_GUARD,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    EffectsRootModule.prototype.sources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19yb290X21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19yb290X21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsWUFBWSxFQUVaLEtBQUssRUFDTCxlQUFlLEVBQ2Ysa0JBQWtCLEdBQ25CLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFVBQVUsQ0FBQzs7QUFFN0QsTUFBTSxPQUFPLGlCQUFpQixHQUFHLG9CQUFvQjs7QUFDckQsTUFBTSxPQUFPLGVBQWUsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQUM7QUFHOUQsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7Ozs7OztJQUM1QixZQUNVLE9BQXNCLEVBQzlCLE1BQXFCLEVBQ3JCLEtBQWlCLEVBQ0ssV0FBa0IsRUFDNUIsZUFBZ0MsRUFDaEMsa0JBQXNDLEVBR2xELEtBQVU7UUFSRixZQUFPLEdBQVAsT0FBTyxDQUFlO1FBVTlCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVmLFdBQVcsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLENBQzNDLE9BQU8sQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsRUFDekMsQ0FBQztRQUVGLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLG9CQUF5QjtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7OztZQXhCRixRQUFRLFNBQUMsRUFBRTs7OztZQU5ILGFBQWE7WUFEYixhQUFhO1lBSnBCLEtBQUs7d0NBaUJGLE1BQU0sU0FBQyxZQUFZO1lBaEJ0QixlQUFlLHVCQWlCWixRQUFRO1lBaEJYLGtCQUFrQix1QkFpQmYsUUFBUTs0Q0FDUixRQUFRLFlBQ1IsTUFBTSxTQUFDLG1CQUFtQjs7Ozs7OztJQVAzQixvQ0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgY3JlYXRlQWN0aW9uLFxuICBTdG9yZU1vZHVsZSxcbiAgU3RvcmUsXG4gIFN0b3JlUm9vdE1vZHVsZSxcbiAgU3RvcmVGZWF0dXJlTW9kdWxlLFxufSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBFZmZlY3RzUnVubmVyIH0gZnJvbSAnLi9lZmZlY3RzX3J1bm5lcic7XG5pbXBvcnQgeyBFZmZlY3RTb3VyY2VzIH0gZnJvbSAnLi9lZmZlY3Rfc291cmNlcyc7XG5pbXBvcnQgeyBST09UX0VGRkVDVFMsIF9ST09UX0VGRkVDVFNfR1VBUkQgfSBmcm9tICcuL3Rva2Vucyc7XG5cbmV4cG9ydCBjb25zdCBST09UX0VGRkVDVFNfSU5JVCA9ICdAbmdyeC9lZmZlY3RzL2luaXQnO1xuZXhwb3J0IGNvbnN0IHJvb3RFZmZlY3RzSW5pdCA9IGNyZWF0ZUFjdGlvbihST09UX0VGRkVDVFNfSU5JVCk7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBFZmZlY3RzUm9vdE1vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc291cmNlczogRWZmZWN0U291cmNlcyxcbiAgICBydW5uZXI6IEVmZmVjdHNSdW5uZXIsXG4gICAgc3RvcmU6IFN0b3JlPGFueT4sXG4gICAgQEluamVjdChST09UX0VGRkVDVFMpIHJvb3RFZmZlY3RzOiBhbnlbXSxcbiAgICBAT3B0aW9uYWwoKSBzdG9yZVJvb3RNb2R1bGU6IFN0b3JlUm9vdE1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSBzdG9yZUZlYXR1cmVNb2R1bGU6IFN0b3JlRmVhdHVyZU1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoX1JPT1RfRUZGRUNUU19HVUFSRClcbiAgICBndWFyZDogYW55XG4gICkge1xuICAgIHJ1bm5lci5zdGFydCgpO1xuXG4gICAgcm9vdEVmZmVjdHMuZm9yRWFjaCgoZWZmZWN0U291cmNlSW5zdGFuY2UpID0+XG4gICAgICBzb3VyY2VzLmFkZEVmZmVjdHMoZWZmZWN0U291cmNlSW5zdGFuY2UpXG4gICAgKTtcblxuICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogUk9PVF9FRkZFQ1RTX0lOSVQgfSk7XG4gIH1cblxuICBhZGRFZmZlY3RzKGVmZmVjdFNvdXJjZUluc3RhbmNlOiBhbnkpIHtcbiAgICB0aGlzLnNvdXJjZXMuYWRkRWZmZWN0cyhlZmZlY3RTb3VyY2VJbnN0YW5jZSk7XG4gIH1cbn1cbiJdfQ==