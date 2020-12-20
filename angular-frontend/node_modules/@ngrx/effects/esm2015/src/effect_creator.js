/**
 * @fileoverview added by tsickle
 * Generated from: src/effect_creator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { DEFAULT_EFFECT_CONFIG, CREATE_EFFECT_METADATA_KEY, } from './models';
/**
 * \@description
 * Creates an effect from an `Observable` and an `EffectConfig`.
 *
 * \@usageNotes
 *
 * ** Mapping to a different action **
 * ```ts
 * effectName$ = createEffect(
 *   () => this.actions$.pipe(
 *     ofType(FeatureActions.actionOne),
 *     map(() => FeatureActions.actionTwo())
 *   )
 * );
 * ```
 *
 *  ** Non-dispatching effects **
 * ```ts
 * effectName$ = createEffect(
 *   () => this.actions$.pipe(
 *     ofType(FeatureActions.actionOne),
 *     tap(() => console.log('Action One Dispatched'))
 *   ),
 *   { dispatch: false }
 *   // FeatureActions.actionOne is not dispatched
 * );
 * ```
 * @template C, DT, OT, R
 * @param {?} source A function which returns an `Observable`.
 * @param {?=} config A `Partial<EffectConfig>` to configure the effect.  By default, `dispatch` is true and `useEffectsErrorHandler` is true.
 * @return {?} If `EffectConfig`#`dispatch` is true, returns `Observable<Action>`.  Else, returns `Observable<unknown>`.
 *
 */
export function createEffect(source, config) {
    /** @type {?} */
    const effect = source();
    /** @type {?} */
    const value = Object.assign(Object.assign({}, DEFAULT_EFFECT_CONFIG), config);
    Object.defineProperty(effect, CREATE_EFFECT_METADATA_KEY, {
        value,
    });
    return (/** @type {?} */ (effect));
}
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getCreateEffectMetadata(instance) {
    /** @type {?} */
    const propertyNames = (/** @type {?} */ (Object.getOwnPropertyNames(instance)));
    /** @type {?} */
    const metadata = propertyNames
        .filter((/**
     * @param {?} propertyName
     * @return {?}
     */
    (propertyName) => instance[propertyName] &&
        instance[propertyName].hasOwnProperty(CREATE_EFFECT_METADATA_KEY)))
        .map((/**
     * @param {?} propertyName
     * @return {?}
     */
    (propertyName) => {
        /** @type {?} */
        const metaData = ((/** @type {?} */ (instance[propertyName])))[CREATE_EFFECT_METADATA_KEY];
        return Object.assign({ propertyName }, metaData);
    }));
    return metadata;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdF9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsT0FBTyxFQUdMLHFCQUFxQixFQUVyQiwwQkFBMEIsR0FDM0IsTUFBTSxVQUFVLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2Q2xCLE1BQU0sVUFBVSxZQUFZLENBTTFCLE1BQTJELEVBQzNELE1BQW1COztVQUViLE1BQU0sR0FBRyxNQUFNLEVBQUU7O1VBQ2pCLEtBQUssbUNBQ04scUJBQXFCLEdBQ3JCLE1BQU0sQ0FDVjtJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLDBCQUEwQixFQUFFO1FBQ3hELEtBQUs7S0FDTixDQUFDLENBQUM7SUFDSCxPQUFPLG1CQUFBLE1BQU0sRUFBd0MsQ0FBQztBQUN4RCxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsdUJBQXVCLENBRXJDLFFBQVc7O1VBQ0wsYUFBYSxHQUFHLG1CQUFBLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsRUFBa0I7O1VBRXRFLFFBQVEsR0FBd0IsYUFBYTtTQUNoRCxNQUFNOzs7O0lBQ0wsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUNmLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDdEIsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQywwQkFBMEIsQ0FBQyxFQUNwRTtTQUNBLEdBQUc7Ozs7SUFBQyxDQUFDLFlBQVksRUFBRSxFQUFFOztjQUNkLFFBQVEsR0FBRyxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBTyxDQUFDLENBQzlDLDBCQUEwQixDQUMzQjtRQUNELHVCQUNFLFlBQVksSUFDVCxRQUFRLEVBQ1g7SUFDSixDQUFDLEVBQUM7SUFFSixPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aW9uLCBBY3Rpb25DcmVhdG9yIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtcbiAgRWZmZWN0TWV0YWRhdGEsXG4gIEVmZmVjdENvbmZpZyxcbiAgREVGQVVMVF9FRkZFQ1RfQ09ORklHLFxuICBDcmVhdGVFZmZlY3RNZXRhZGF0YSxcbiAgQ1JFQVRFX0VGRkVDVF9NRVRBREFUQV9LRVksXG59IGZyb20gJy4vbW9kZWxzJztcblxudHlwZSBEaXNwYXRjaFR5cGU8VD4gPSBUIGV4dGVuZHMgeyBkaXNwYXRjaDogaW5mZXIgVSB9ID8gVSA6IHRydWU7XG50eXBlIE9ic2VydmFibGVUeXBlPFQsIE9yaWdpbmFsVHlwZT4gPSBUIGV4dGVuZHMgZmFsc2UgPyBPcmlnaW5hbFR5cGUgOiBBY3Rpb247XG50eXBlIEVmZmVjdFJlc3VsdDxPVD4gPSBPYnNlcnZhYmxlPE9UPiB8ICgoLi4uYXJnczogYW55W10pID0+IE9ic2VydmFibGU8T1Q+KTtcbnR5cGUgQ29uZGl0aW9uYWxseURpc2FsbG93QWN0aW9uQ3JlYXRvcjxEVCwgUmVzdWx0PiA9IERUIGV4dGVuZHMgZmFsc2VcbiAgPyB1bmtub3duIC8vIElmIERUIChEaXNwYXRjaFR5cGUgaXMgZmFsc2UsIHRoZW4gd2UgZG9uJ3QgZW5mb3JjZSBhbnkgcmV0dXJuIHR5cGVzKVxuICA6IFJlc3VsdCBleHRlbmRzIEVmZmVjdFJlc3VsdDxpbmZlciBPVD5cbiAgPyBPVCBleHRlbmRzIEFjdGlvbkNyZWF0b3JcbiAgICA/ICdBY3Rpb25DcmVhdG9yIGNhbm5vdCBiZSBkaXNwYXRjaGVkLiBEaWQgeW91IGZvcmdldCB0byBjYWxsIHRoZSBhY3Rpb24gY3JlYXRvciBmdW5jdGlvbj8nXG4gICAgOiB1bmtub3duXG4gIDogdW5rbm93bjtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENyZWF0ZXMgYW4gZWZmZWN0IGZyb20gYW4gYE9ic2VydmFibGVgIGFuZCBhbiBgRWZmZWN0Q29uZmlnYC5cbiAqXG4gKiBAcGFyYW0gc291cmNlIEEgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhbiBgT2JzZXJ2YWJsZWAuXG4gKiBAcGFyYW0gY29uZmlnIEEgYFBhcnRpYWw8RWZmZWN0Q29uZmlnPmAgdG8gY29uZmlndXJlIHRoZSBlZmZlY3QuICBCeSBkZWZhdWx0LCBgZGlzcGF0Y2hgIGlzIHRydWUgYW5kIGB1c2VFZmZlY3RzRXJyb3JIYW5kbGVyYCBpcyB0cnVlLlxuICogQHJldHVybnMgSWYgYEVmZmVjdENvbmZpZ2AjYGRpc3BhdGNoYCBpcyB0cnVlLCByZXR1cm5zIGBPYnNlcnZhYmxlPEFjdGlvbj5gLiAgRWxzZSwgcmV0dXJucyBgT2JzZXJ2YWJsZTx1bmtub3duPmAuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqXG4gKiAqKiBNYXBwaW5nIHRvIGEgZGlmZmVyZW50IGFjdGlvbiAqKlxuICogYGBgdHNcbiAqIGVmZmVjdE5hbWUkID0gY3JlYXRlRWZmZWN0KFxuICogICAoKSA9PiB0aGlzLmFjdGlvbnMkLnBpcGUoXG4gKiAgICAgb2ZUeXBlKEZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSksXG4gKiAgICAgbWFwKCgpID0+IEZlYXR1cmVBY3Rpb25zLmFjdGlvblR3bygpKVxuICogICApXG4gKiApO1xuICogYGBgXG4gKlxuICogICoqIE5vbi1kaXNwYXRjaGluZyBlZmZlY3RzICoqXG4gKiBgYGB0c1xuICogZWZmZWN0TmFtZSQgPSBjcmVhdGVFZmZlY3QoXG4gKiAgICgpID0+IHRoaXMuYWN0aW9ucyQucGlwZShcbiAqICAgICBvZlR5cGUoRmVhdHVyZUFjdGlvbnMuYWN0aW9uT25lKSxcbiAqICAgICB0YXAoKCkgPT4gY29uc29sZS5sb2coJ0FjdGlvbiBPbmUgRGlzcGF0Y2hlZCcpKVxuICogICApLFxuICogICB7IGRpc3BhdGNoOiBmYWxzZSB9XG4gKiAgIC8vIEZlYXR1cmVBY3Rpb25zLmFjdGlvbk9uZSBpcyBub3QgZGlzcGF0Y2hlZFxuICogKTtcbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWZmZWN0PFxuICBDIGV4dGVuZHMgRWZmZWN0Q29uZmlnLFxuICBEVCBleHRlbmRzIERpc3BhdGNoVHlwZTxDPixcbiAgT1QgZXh0ZW5kcyBPYnNlcnZhYmxlVHlwZTxEVCwgT1Q+LFxuICBSIGV4dGVuZHMgRWZmZWN0UmVzdWx0PE9UPlxuPihcbiAgc291cmNlOiAoKSA9PiBSICYgQ29uZGl0aW9uYWxseURpc2FsbG93QWN0aW9uQ3JlYXRvcjxEVCwgUj4sXG4gIGNvbmZpZz86IFBhcnRpYWw8Qz5cbik6IFIgJiBDcmVhdGVFZmZlY3RNZXRhZGF0YSB7XG4gIGNvbnN0IGVmZmVjdCA9IHNvdXJjZSgpO1xuICBjb25zdCB2YWx1ZTogRWZmZWN0Q29uZmlnID0ge1xuICAgIC4uLkRFRkFVTFRfRUZGRUNUX0NPTkZJRyxcbiAgICAuLi5jb25maWcsIC8vIE92ZXJyaWRlcyBhbnkgZGVmYXVsdHMgaWYgdmFsdWVzIGFyZSBwcm92aWRlZFxuICB9O1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWZmZWN0LCBDUkVBVEVfRUZGRUNUX01FVEFEQVRBX0tFWSwge1xuICAgIHZhbHVlLFxuICB9KTtcbiAgcmV0dXJuIGVmZmVjdCBhcyB0eXBlb2YgZWZmZWN0ICYgQ3JlYXRlRWZmZWN0TWV0YWRhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDcmVhdGVFZmZlY3RNZXRhZGF0YTxcbiAgVCBleHRlbmRzIHsgW3Byb3BzIGluIGtleW9mIFRdOiBPYmplY3QgfVxuPihpbnN0YW5jZTogVCk6IEVmZmVjdE1ldGFkYXRhPFQ+W10ge1xuICBjb25zdCBwcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5zdGFuY2UpIGFzIEFycmF5PGtleW9mIFQ+O1xuXG4gIGNvbnN0IG1ldGFkYXRhOiBFZmZlY3RNZXRhZGF0YTxUPltdID0gcHJvcGVydHlOYW1lc1xuICAgIC5maWx0ZXIoXG4gICAgICAocHJvcGVydHlOYW1lKSA9PlxuICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eU5hbWVdICYmXG4gICAgICAgIGluc3RhbmNlW3Byb3BlcnR5TmFtZV0uaGFzT3duUHJvcGVydHkoQ1JFQVRFX0VGRkVDVF9NRVRBREFUQV9LRVkpXG4gICAgKVxuICAgIC5tYXAoKHByb3BlcnR5TmFtZSkgPT4ge1xuICAgICAgY29uc3QgbWV0YURhdGEgPSAoaW5zdGFuY2VbcHJvcGVydHlOYW1lXSBhcyBhbnkpW1xuICAgICAgICBDUkVBVEVfRUZGRUNUX01FVEFEQVRBX0tFWVxuICAgICAgXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByb3BlcnR5TmFtZSxcbiAgICAgICAgLi4ubWV0YURhdGEsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gIHJldHVybiBtZXRhZGF0YTtcbn1cbiJdfQ==