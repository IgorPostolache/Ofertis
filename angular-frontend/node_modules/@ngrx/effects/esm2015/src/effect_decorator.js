/**
 * @fileoverview added by tsickle
 * Generated from: src/effect_decorator.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { compose } from '@ngrx/store';
import { DEFAULT_EFFECT_CONFIG, } from './models';
import { getSourceForInstance } from './utils';
/** @type {?} */
const METADATA_KEY = '__@ngrx/effects__';
/**
 * @param {?=} config
 * @return {?}
 */
export function Effect(config = {}) {
    return (/**
     * @template T, K
     * @param {?} target
     * @param {?} propertyName
     * @return {?}
     */
    function (target, propertyName) {
        /** @type {?} */
        const metadata = Object.assign(Object.assign(Object.assign({}, DEFAULT_EFFECT_CONFIG), config), { // Overrides any defaults if values are provided
            propertyName });
        addEffectMetadataEntry(target, metadata);
    });
}
/**
 * @template T
 * @param {?} instance
 * @return {?}
 */
export function getEffectDecoratorMetadata(instance) {
    /** @type {?} */
    const effectsDecorators = compose(getEffectMetadataEntries, getSourceForInstance)(instance);
    return effectsDecorators;
}
/**
 * Type guard to detemine whether METADATA_KEY is already present on the Class
 * constructor
 * @template T
 * @param {?} sourceProto
 * @return {?}
 */
function hasMetadataEntries(sourceProto) {
    return sourceProto.constructor.hasOwnProperty(METADATA_KEY);
}
/**
 * Add Effect Metadata to the Effect Class constructor under specific key
 * @template T
 * @param {?} sourceProto
 * @param {?} metadata
 * @return {?}
 */
function addEffectMetadataEntry(sourceProto, metadata) {
    if (hasMetadataEntries(sourceProto)) {
        sourceProto.constructor[METADATA_KEY].push(metadata);
    }
    else {
        Object.defineProperty(sourceProto.constructor, METADATA_KEY, {
            value: [metadata],
        });
    }
}
/**
 * @template T
 * @param {?} sourceProto
 * @return {?}
 */
function getEffectMetadataEntries(sourceProto) {
    return hasMetadataEntries(sourceProto)
        ? sourceProto.constructor[METADATA_KEY]
        : [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0X2RlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZWZmZWN0cy9zcmMvZWZmZWN0X2RlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdEMsT0FBTyxFQUNMLHFCQUFxQixHQUl0QixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxTQUFTLENBQUM7O01BRXpDLFlBQVksR0FBRyxtQkFBbUI7Ozs7O0FBRXhDLE1BQU0sVUFBVSxNQUFNLENBQUMsU0FBdUIsRUFBRTtJQUM5Qzs7Ozs7O0lBQU8sVUFDTCxNQUFTLEVBQ1QsWUFBZTs7Y0FFVCxRQUFRLGlEQUNULHFCQUFxQixHQUNyQixNQUFNLEtBQUUsZ0RBQWdEO1lBQzNELFlBQVksR0FDYjtRQUNELHNCQUFzQixDQUFJLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM5QyxDQUFDLEVBQUM7QUFDSixDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsMEJBQTBCLENBQ3hDLFFBQVc7O1VBRUwsaUJBQWlCLEdBQXdCLE9BQU8sQ0FDcEQsd0JBQXdCLEVBQ3hCLG9CQUFvQixDQUNyQixDQUFDLFFBQVEsQ0FBQztJQUVYLE9BQU8saUJBQWlCLENBQUM7QUFDM0IsQ0FBQzs7Ozs7Ozs7QUFNRCxTQUFTLGtCQUFrQixDQUN6QixXQUFjO0lBTWQsT0FBTyxXQUFXLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUM5RCxDQUFDOzs7Ozs7OztBQUdELFNBQVMsc0JBQXNCLENBQzdCLFdBQWMsRUFDZCxRQUEyQjtJQUUzQixJQUFJLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ25DLFdBQVcsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ3REO1NBQU07UUFDTCxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFO1lBQzNELEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztTQUNsQixDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7Ozs7OztBQUVELFNBQVMsd0JBQXdCLENBQy9CLFdBQWM7SUFFZCxPQUFPLGtCQUFrQixDQUFDLFdBQVcsQ0FBQztRQUNwQyxDQUFDLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDdkMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21wb3NlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQge1xuICBERUZBVUxUX0VGRkVDVF9DT05GSUcsXG4gIEVmZmVjdENvbmZpZyxcbiAgRWZmZWN0TWV0YWRhdGEsXG4gIEVmZmVjdFByb3BlcnR5S2V5LFxufSBmcm9tICcuL21vZGVscyc7XG5pbXBvcnQgeyBnZXRTb3VyY2VGb3JJbnN0YW5jZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBNRVRBREFUQV9LRVkgPSAnX19AbmdyeC9lZmZlY3RzX18nO1xuXG5leHBvcnQgZnVuY3Rpb24gRWZmZWN0KGNvbmZpZzogRWZmZWN0Q29uZmlnID0ge30pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIDxUIGV4dGVuZHMgT2JqZWN0LCBLIGV4dGVuZHMgRWZmZWN0UHJvcGVydHlLZXk8VD4+KFxuICAgIHRhcmdldDogVCxcbiAgICBwcm9wZXJ0eU5hbWU6IEtcbiAgKSB7XG4gICAgY29uc3QgbWV0YWRhdGE6IEVmZmVjdE1ldGFkYXRhPFQ+ID0ge1xuICAgICAgLi4uREVGQVVMVF9FRkZFQ1RfQ09ORklHLFxuICAgICAgLi4uY29uZmlnLCAvLyBPdmVycmlkZXMgYW55IGRlZmF1bHRzIGlmIHZhbHVlcyBhcmUgcHJvdmlkZWRcbiAgICAgIHByb3BlcnR5TmFtZSxcbiAgICB9O1xuICAgIGFkZEVmZmVjdE1ldGFkYXRhRW50cnk8VD4odGFyZ2V0LCBtZXRhZGF0YSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFZmZlY3REZWNvcmF0b3JNZXRhZGF0YTxUPihcbiAgaW5zdGFuY2U6IFRcbik6IEVmZmVjdE1ldGFkYXRhPFQ+W10ge1xuICBjb25zdCBlZmZlY3RzRGVjb3JhdG9yczogRWZmZWN0TWV0YWRhdGE8VD5bXSA9IGNvbXBvc2UoXG4gICAgZ2V0RWZmZWN0TWV0YWRhdGFFbnRyaWVzLFxuICAgIGdldFNvdXJjZUZvckluc3RhbmNlXG4gICkoaW5zdGFuY2UpO1xuXG4gIHJldHVybiBlZmZlY3RzRGVjb3JhdG9ycztcbn1cblxuLyoqXG4gKiBUeXBlIGd1YXJkIHRvIGRldGVtaW5lIHdoZXRoZXIgTUVUQURBVEFfS0VZIGlzIGFscmVhZHkgcHJlc2VudCBvbiB0aGUgQ2xhc3NcbiAqIGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIGhhc01ldGFkYXRhRW50cmllczxUIGV4dGVuZHMgT2JqZWN0PihcbiAgc291cmNlUHJvdG86IFRcbik6IHNvdXJjZVByb3RvIGlzIHR5cGVvZiBzb3VyY2VQcm90byAmIHtcbiAgY29uc3RydWN0b3I6IHR5cGVvZiBzb3VyY2VQcm90by5jb25zdHJ1Y3RvciAmIHtcbiAgICBbTUVUQURBVEFfS0VZXTogRWZmZWN0TWV0YWRhdGE8VD5bXTtcbiAgfTtcbn0ge1xuICByZXR1cm4gc291cmNlUHJvdG8uY29uc3RydWN0b3IuaGFzT3duUHJvcGVydHkoTUVUQURBVEFfS0VZKTtcbn1cblxuLyoqIEFkZCBFZmZlY3QgTWV0YWRhdGEgdG8gdGhlIEVmZmVjdCBDbGFzcyBjb25zdHJ1Y3RvciB1bmRlciBzcGVjaWZpYyBrZXkgKi9cbmZ1bmN0aW9uIGFkZEVmZmVjdE1ldGFkYXRhRW50cnk8VCBleHRlbmRzIG9iamVjdD4oXG4gIHNvdXJjZVByb3RvOiBULFxuICBtZXRhZGF0YTogRWZmZWN0TWV0YWRhdGE8VD5cbikge1xuICBpZiAoaGFzTWV0YWRhdGFFbnRyaWVzKHNvdXJjZVByb3RvKSkge1xuICAgIHNvdXJjZVByb3RvLmNvbnN0cnVjdG9yW01FVEFEQVRBX0tFWV0ucHVzaChtZXRhZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNvdXJjZVByb3RvLmNvbnN0cnVjdG9yLCBNRVRBREFUQV9LRVksIHtcbiAgICAgIHZhbHVlOiBbbWV0YWRhdGFdLFxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEVmZmVjdE1ldGFkYXRhRW50cmllczxUIGV4dGVuZHMgb2JqZWN0PihcbiAgc291cmNlUHJvdG86IFRcbik6IEVmZmVjdE1ldGFkYXRhPFQ+W10ge1xuICByZXR1cm4gaGFzTWV0YWRhdGFFbnRyaWVzKHNvdXJjZVByb3RvKVxuICAgID8gc291cmNlUHJvdG8uY29uc3RydWN0b3JbTUVUQURBVEFfS0VZXVxuICAgIDogW107XG59XG4iXX0=