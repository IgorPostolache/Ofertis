(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@ngrx/effects'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@ngrx/effects/testing', ['exports', '@ngrx/effects', 'rxjs'], factory) :
    (global = global || self, factory((global.ngrx = global.ngrx || {}, global.ngrx.effects = global.ngrx.effects || {}, global.ngrx.effects.testing = {}), global.ngrx.effects, global.rxjs));
}(this, (function (exports, effects, rxjs) { 'use strict';

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
            provide: effects.Actions,
            useFactory: ( /**
             * @return {?}
             */function () {
                if (typeof factoryOrSource === 'function') {
                    return new effects.Actions(rxjs.defer(factoryOrSource));
                }
                return new effects.Actions(factoryOrSource);
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

    exports.provideMockActions = provideMockActions;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngrx-effects-testing.umd.js.map
