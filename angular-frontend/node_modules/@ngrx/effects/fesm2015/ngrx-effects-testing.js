import { Actions } from '@ngrx/effects';
import { defer } from 'rxjs';

/**
 * @fileoverview added by tsickle
 * Generated from: testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} factoryOrSource
 * @return {?}
 */
function provideMockActions(factoryOrSource) {
    return {
        provide: Actions,
        useFactory: (/**
         * @return {?}
         */
        () => {
            if (typeof factoryOrSource === 'function') {
                return new Actions(defer(factoryOrSource));
            }
            return new Actions(factoryOrSource);
        }),
        deps: [],
    };
}

/**
 * @fileoverview added by tsickle
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ngrx-effects-testing.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { provideMockActions };
//# sourceMappingURL=ngrx-effects-testing.js.map
