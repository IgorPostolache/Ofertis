/**
 * @fileoverview added by tsickle
 * Generated from: src/effect_sources.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { Subject, merge } from 'rxjs';
import { dematerialize, exhaustMap, filter, groupBy, map, mergeMap, take, } from 'rxjs/operators';
import { reportInvalidActions, } from './effect_notification';
import { mergeEffects } from './effects_resolver';
import { isOnIdentifyEffects, isOnRunEffects, isOnInitEffects, } from './lifecycle_hooks';
import { EFFECTS_ERROR_HANDLER } from './tokens';
import { getSourceForInstance } from './utils';
export class EffectSources extends Subject {
    /**
     * @param {?} errorHandler
     * @param {?} effectsErrorHandler
     */
    constructor(errorHandler, effectsErrorHandler) {
        super();
        this.errorHandler = errorHandler;
        this.effectsErrorHandler = effectsErrorHandler;
    }
    /**
     * @param {?} effectSourceInstance
     * @return {?}
     */
    addEffects(effectSourceInstance) {
        this.next(effectSourceInstance);
    }
    /**
     * \@internal
     * @return {?}
     */
    toActions() {
        return this.pipe(groupBy(getSourceForInstance), mergeMap((/**
         * @param {?} source$
         * @return {?}
         */
        (source$) => {
            return source$.pipe(groupBy(effectsInstance));
        })), mergeMap((/**
         * @param {?} source$
         * @return {?}
         */
        (source$) => {
            /** @type {?} */
            const effect$ = source$.pipe(exhaustMap((/**
             * @param {?} sourceInstance
             * @return {?}
             */
            (sourceInstance) => {
                return resolveEffectSource(this.errorHandler, this.effectsErrorHandler)(sourceInstance);
            })), map((/**
             * @param {?} output
             * @return {?}
             */
            (output) => {
                reportInvalidActions(output, this.errorHandler);
                return output.notification;
            })), filter((/**
             * @param {?} notification
             * @return {?}
             */
            (notification) => notification.kind === 'N')), dematerialize());
            // start the stream with an INIT action
            // do this only for the first Effect instance
            /** @type {?} */
            const init$ = source$.pipe(take(1), filter(isOnInitEffects), map((/**
             * @param {?} instance
             * @return {?}
             */
            (instance) => instance.ngrxOnInitEffects())));
            return merge(effect$, init$);
        })));
    }
}
EffectSources.decorators = [
    { type: Injectable }
];
/** @nocollapse */
EffectSources.ctorParameters = () => [
    { type: ErrorHandler },
    { type: undefined, decorators: [{ type: Inject, args: [EFFECTS_ERROR_HANDLER,] }] }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    EffectSources.prototype.errorHandler;
    /**
     * @type {?}
     * @private
     */
    EffectSources.prototype.effectsErrorHandler;
}
/**
 * @param {?} sourceInstance
 * @return {?}
 */
function effectsInstance(sourceInstance) {
    if (isOnIdentifyEffects(sourceInstance)) {
        return sourceInstance.ngrxOnIdentifyEffects();
    }
    return '';
}
/**
 * @param {?} errorHandler
 * @param {?} effectsErrorHandler
 * @return {?}
 */
function resolveEffectSource(errorHandler, effectsErrorHandler) {
    return (/**
     * @param {?} sourceInstance
     * @return {?}
     */
    (sourceInstance) => {
        /** @type {?} */
        const mergedEffects$ = mergeEffects(sourceInstance, errorHandler, effectsErrorHandler);
        if (isOnRunEffects(sourceInstance)) {
            return sourceInstance.ngrxOnRunEffects(mergedEffects$);
        }
        return mergedEffects$;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X3NvdXJjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdF9zb3VyY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBNEIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNoRSxPQUFPLEVBQ0wsYUFBYSxFQUNiLFVBQVUsRUFDVixNQUFNLEVBQ04sT0FBTyxFQUNQLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxHQUNMLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEIsT0FBTyxFQUNMLG9CQUFvQixHQUVyQixNQUFNLHVCQUF1QixDQUFDO0FBRS9CLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBS0wsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxlQUFlLEdBQ2hCLE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUcvQyxNQUFNLE9BQU8sYUFBYyxTQUFRLE9BQVk7Ozs7O0lBQzdDLFlBQ1UsWUFBMEIsRUFFMUIsbUJBQXdDO1FBRWhELEtBQUssRUFBRSxDQUFDO1FBSkEsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFMUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUdsRCxDQUFDOzs7OztJQUVELFVBQVUsQ0FBQyxvQkFBeUI7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Ozs7O0lBS0QsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FDZCxPQUFPLENBQUMsb0JBQW9CLENBQUMsRUFDN0IsUUFBUTs7OztRQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDbkIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxFQUNGLFFBQVE7Ozs7UUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztrQkFDYixPQUFPLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FDMUIsVUFBVTs7OztZQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7Z0JBQzVCLE9BQU8sbUJBQW1CLENBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxtQkFBbUIsQ0FDekIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNwQixDQUFDLEVBQUMsRUFDRixHQUFHOzs7O1lBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDYixvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNoRCxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUM7WUFDN0IsQ0FBQyxFQUFDLEVBQ0YsTUFBTTs7OztZQUNKLENBQUMsWUFBWSxFQUF3QyxFQUFFLENBQ3JELFlBQVksQ0FBQyxJQUFJLEtBQUssR0FBRyxFQUM1QixFQUNELGFBQWEsRUFBRSxDQUNoQjs7OztrQkFJSyxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FDeEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNQLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFDdkIsR0FBRzs7OztZQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxDQUNoRDtZQUVELE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7O1lBckRGLFVBQVU7Ozs7WUEvQkYsWUFBWTs0Q0FtQ2hCLE1BQU0sU0FBQyxxQkFBcUI7Ozs7Ozs7SUFEN0IscUNBQWtDOzs7OztJQUNsQyw0Q0FDZ0Q7Ozs7OztBQW1EcEQsU0FBUyxlQUFlLENBQUMsY0FBbUI7SUFDMUMsSUFBSSxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUN2QyxPQUFPLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0tBQy9DO0lBRUQsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDOzs7Ozs7QUFFRCxTQUFTLG1CQUFtQixDQUMxQixZQUEwQixFQUMxQixtQkFBd0M7SUFFeEM7Ozs7SUFBTyxDQUFDLGNBQWMsRUFBRSxFQUFFOztjQUNsQixjQUFjLEdBQUcsWUFBWSxDQUNqQyxjQUFjLEVBQ2QsWUFBWSxFQUNaLG1CQUFtQixDQUNwQjtRQUVELElBQUksY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sY0FBYyxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQyxFQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVycm9ySGFuZGxlciwgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb24sIE9ic2VydmFibGUsIFN1YmplY3QsIG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZW1hdGVyaWFsaXplLFxuICBleGhhdXN0TWFwLFxuICBmaWx0ZXIsXG4gIGdyb3VwQnksXG4gIG1hcCxcbiAgbWVyZ2VNYXAsXG4gIHRha2UsXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtcbiAgcmVwb3J0SW52YWxpZEFjdGlvbnMsXG4gIEVmZmVjdE5vdGlmaWNhdGlvbixcbn0gZnJvbSAnLi9lZmZlY3Rfbm90aWZpY2F0aW9uJztcbmltcG9ydCB7IEVmZmVjdHNFcnJvckhhbmRsZXIgfSBmcm9tICcuL2VmZmVjdHNfZXJyb3JfaGFuZGxlcic7XG5pbXBvcnQgeyBtZXJnZUVmZmVjdHMgfSBmcm9tICcuL2VmZmVjdHNfcmVzb2x2ZXInO1xuaW1wb3J0IHtcbiAgb25JZGVudGlmeUVmZmVjdHNLZXksXG4gIG9uUnVuRWZmZWN0c0tleSxcbiAgT25SdW5FZmZlY3RzLFxuICBvbkluaXRFZmZlY3RzLFxuICBpc09uSWRlbnRpZnlFZmZlY3RzLFxuICBpc09uUnVuRWZmZWN0cyxcbiAgaXNPbkluaXRFZmZlY3RzLFxufSBmcm9tICcuL2xpZmVjeWNsZV9ob29rcyc7XG5pbXBvcnQgeyBFRkZFQ1RTX0VSUk9SX0hBTkRMRVIgfSBmcm9tICcuL3Rva2Vucyc7XG5pbXBvcnQgeyBnZXRTb3VyY2VGb3JJbnN0YW5jZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRWZmZWN0U291cmNlcyBleHRlbmRzIFN1YmplY3Q8YW55PiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsXG4gICAgQEluamVjdChFRkZFQ1RTX0VSUk9SX0hBTkRMRVIpXG4gICAgcHJpdmF0ZSBlZmZlY3RzRXJyb3JIYW5kbGVyOiBFZmZlY3RzRXJyb3JIYW5kbGVyXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBhZGRFZmZlY3RzKGVmZmVjdFNvdXJjZUluc3RhbmNlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm5leHQoZWZmZWN0U291cmNlSW5zdGFuY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgdG9BY3Rpb25zKCk6IE9ic2VydmFibGU8QWN0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMucGlwZShcbiAgICAgIGdyb3VwQnkoZ2V0U291cmNlRm9ySW5zdGFuY2UpLFxuICAgICAgbWVyZ2VNYXAoKHNvdXJjZSQpID0+IHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZSQucGlwZShncm91cEJ5KGVmZmVjdHNJbnN0YW5jZSkpO1xuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoc291cmNlJCkgPT4ge1xuICAgICAgICBjb25zdCBlZmZlY3QkID0gc291cmNlJC5waXBlKFxuICAgICAgICAgIGV4aGF1c3RNYXAoKHNvdXJjZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzb2x2ZUVmZmVjdFNvdXJjZShcbiAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIsXG4gICAgICAgICAgICAgIHRoaXMuZWZmZWN0c0Vycm9ySGFuZGxlclxuICAgICAgICAgICAgKShzb3VyY2VJbnN0YW5jZSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgbWFwKChvdXRwdXQpID0+IHtcbiAgICAgICAgICAgIHJlcG9ydEludmFsaWRBY3Rpb25zKG91dHB1dCwgdGhpcy5lcnJvckhhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIG91dHB1dC5ub3RpZmljYXRpb247XG4gICAgICAgICAgfSksXG4gICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgKG5vdGlmaWNhdGlvbik6IG5vdGlmaWNhdGlvbiBpcyBOb3RpZmljYXRpb248QWN0aW9uPiA9PlxuICAgICAgICAgICAgICBub3RpZmljYXRpb24ua2luZCA9PT0gJ04nXG4gICAgICAgICAgKSxcbiAgICAgICAgICBkZW1hdGVyaWFsaXplKClcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBzdGFydCB0aGUgc3RyZWFtIHdpdGggYW4gSU5JVCBhY3Rpb25cbiAgICAgICAgLy8gZG8gdGhpcyBvbmx5IGZvciB0aGUgZmlyc3QgRWZmZWN0IGluc3RhbmNlXG4gICAgICAgIGNvbnN0IGluaXQkID0gc291cmNlJC5waXBlKFxuICAgICAgICAgIHRha2UoMSksXG4gICAgICAgICAgZmlsdGVyKGlzT25Jbml0RWZmZWN0cyksXG4gICAgICAgICAgbWFwKChpbnN0YW5jZSkgPT4gaW5zdGFuY2UubmdyeE9uSW5pdEVmZmVjdHMoKSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbWVyZ2UoZWZmZWN0JCwgaW5pdCQpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGVmZmVjdHNJbnN0YW5jZShzb3VyY2VJbnN0YW5jZTogYW55KSB7XG4gIGlmIChpc09uSWRlbnRpZnlFZmZlY3RzKHNvdXJjZUluc3RhbmNlKSkge1xuICAgIHJldHVybiBzb3VyY2VJbnN0YW5jZS5uZ3J4T25JZGVudGlmeUVmZmVjdHMoKTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUVmZmVjdFNvdXJjZShcbiAgZXJyb3JIYW5kbGVyOiBFcnJvckhhbmRsZXIsXG4gIGVmZmVjdHNFcnJvckhhbmRsZXI6IEVmZmVjdHNFcnJvckhhbmRsZXJcbik6IChzb3VyY2VJbnN0YW5jZTogYW55KSA9PiBPYnNlcnZhYmxlPEVmZmVjdE5vdGlmaWNhdGlvbj4ge1xuICByZXR1cm4gKHNvdXJjZUluc3RhbmNlKSA9PiB7XG4gICAgY29uc3QgbWVyZ2VkRWZmZWN0cyQgPSBtZXJnZUVmZmVjdHMoXG4gICAgICBzb3VyY2VJbnN0YW5jZSxcbiAgICAgIGVycm9ySGFuZGxlcixcbiAgICAgIGVmZmVjdHNFcnJvckhhbmRsZXJcbiAgICApO1xuXG4gICAgaWYgKGlzT25SdW5FZmZlY3RzKHNvdXJjZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZUluc3RhbmNlLm5ncnhPblJ1bkVmZmVjdHMobWVyZ2VkRWZmZWN0cyQpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXJnZWRFZmZlY3RzJDtcbiAgfTtcbn1cbiJdfQ==