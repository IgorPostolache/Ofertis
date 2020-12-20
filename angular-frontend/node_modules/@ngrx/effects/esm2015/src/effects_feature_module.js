/**
 * @fileoverview added by tsickle
 * Generated from: src/effects_feature_module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, Optional } from '@angular/core';
import { StoreRootModule, StoreFeatureModule } from '@ngrx/store';
import { EffectsRootModule } from './effects_root_module';
import { FEATURE_EFFECTS } from './tokens';
export class EffectsFeatureModule {
    /**
     * @param {?} root
     * @param {?} effectSourceGroups
     * @param {?} storeRootModule
     * @param {?} storeFeatureModule
     */
    constructor(root, effectSourceGroups, storeRootModule, storeFeatureModule) {
        effectSourceGroups.forEach((/**
         * @param {?} group
         * @return {?}
         */
        (group) => group.forEach((/**
         * @param {?} effectSourceInstance
         * @return {?}
         */
        (effectSourceInstance) => root.addEffects(effectSourceInstance)))));
    }
}
EffectsFeatureModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
EffectsFeatureModule.ctorParameters = () => [
    { type: EffectsRootModule },
    { type: Array, decorators: [{ type: Inject, args: [FEATURE_EFFECTS,] }] },
    { type: StoreRootModule, decorators: [{ type: Optional }] },
    { type: StoreFeatureModule, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19mZWF0dXJlX21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0c19mZWF0dXJlX21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFHM0MsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7OztJQUMvQixZQUNFLElBQXVCLEVBQ0Usa0JBQTJCLEVBQ3hDLGVBQWdDLEVBQ2hDLGtCQUFzQztRQUVsRCxrQkFBa0IsQ0FBQyxPQUFPOzs7O1FBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUNuQyxLQUFLLENBQUMsT0FBTzs7OztRQUFDLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxDQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQ3RDLEVBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWJGLFFBQVEsU0FBQyxFQUFFOzs7O1lBSEgsaUJBQWlCO3dDQU9yQixNQUFNLFNBQUMsZUFBZTtZQVJsQixlQUFlLHVCQVNuQixRQUFRO1lBVGEsa0JBQWtCLHVCQVV2QyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JlUm9vdE1vZHVsZSwgU3RvcmVGZWF0dXJlTW9kdWxlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRWZmZWN0c1Jvb3RNb2R1bGUgfSBmcm9tICcuL2VmZmVjdHNfcm9vdF9tb2R1bGUnO1xuaW1wb3J0IHsgRkVBVFVSRV9FRkZFQ1RTIH0gZnJvbSAnLi90b2tlbnMnO1xuXG5ATmdNb2R1bGUoe30pXG5leHBvcnQgY2xhc3MgRWZmZWN0c0ZlYXR1cmVNb2R1bGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICByb290OiBFZmZlY3RzUm9vdE1vZHVsZSxcbiAgICBASW5qZWN0KEZFQVRVUkVfRUZGRUNUUykgZWZmZWN0U291cmNlR3JvdXBzOiBhbnlbXVtdLFxuICAgIEBPcHRpb25hbCgpIHN0b3JlUm9vdE1vZHVsZTogU3RvcmVSb290TW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIHN0b3JlRmVhdHVyZU1vZHVsZTogU3RvcmVGZWF0dXJlTW9kdWxlXG4gICkge1xuICAgIGVmZmVjdFNvdXJjZUdyb3Vwcy5mb3JFYWNoKChncm91cCkgPT5cbiAgICAgIGdyb3VwLmZvckVhY2goKGVmZmVjdFNvdXJjZUluc3RhbmNlKSA9PlxuICAgICAgICByb290LmFkZEVmZmVjdHMoZWZmZWN0U291cmNlSW5zdGFuY2UpXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19