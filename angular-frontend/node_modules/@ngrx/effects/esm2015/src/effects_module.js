/**
 * @fileoverview added by tsickle
 * Generated from: src/effects_module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injector, NgModule, Optional, Self, SkipSelf, } from '@angular/core';
import { Actions } from './actions';
import { EffectSources } from './effect_sources';
import { EffectsFeatureModule } from './effects_feature_module';
import { defaultEffectsErrorHandler } from './effects_error_handler';
import { EffectsRootModule } from './effects_root_module';
import { EffectsRunner } from './effects_runner';
import { _FEATURE_EFFECTS, _ROOT_EFFECTS, _ROOT_EFFECTS_GUARD, EFFECTS_ERROR_HANDLER, FEATURE_EFFECTS, ROOT_EFFECTS, USER_PROVIDED_EFFECTS, } from './tokens';
export class EffectsModule {
    /**
     * @param {?=} featureEffects
     * @return {?}
     */
    static forFeature(featureEffects = []) {
        return {
            ngModule: EffectsFeatureModule,
            providers: [
                featureEffects,
                {
                    provide: _FEATURE_EFFECTS,
                    multi: true,
                    useValue: featureEffects,
                },
                {
                    provide: USER_PROVIDED_EFFECTS,
                    multi: true,
                    useValue: [],
                },
                {
                    provide: FEATURE_EFFECTS,
                    multi: true,
                    useFactory: createEffects,
                    deps: [Injector, _FEATURE_EFFECTS, USER_PROVIDED_EFFECTS],
                },
            ],
        };
    }
    /**
     * @param {?=} rootEffects
     * @return {?}
     */
    static forRoot(rootEffects = []) {
        return {
            ngModule: EffectsRootModule,
            providers: [
                {
                    provide: EFFECTS_ERROR_HANDLER,
                    useValue: defaultEffectsErrorHandler,
                },
                EffectsRunner,
                EffectSources,
                Actions,
                rootEffects,
                {
                    provide: _ROOT_EFFECTS,
                    useValue: [rootEffects],
                },
                {
                    provide: _ROOT_EFFECTS_GUARD,
                    useFactory: _provideForRootGuard,
                    deps: [
                        [EffectsRunner, new Optional(), new SkipSelf()],
                        [_ROOT_EFFECTS, new Self()],
                    ],
                },
                {
                    provide: USER_PROVIDED_EFFECTS,
                    multi: true,
                    useValue: [],
                },
                {
                    provide: ROOT_EFFECTS,
                    useFactory: createEffects,
                    deps: [Injector, _ROOT_EFFECTS, USER_PROVIDED_EFFECTS],
                },
            ],
        };
    }
}
EffectsModule.decorators = [
    { type: NgModule, args: [{},] }
];
/**
 * @param {?} injector
 * @param {?} effectGroups
 * @param {?} userProvidedEffectGroups
 * @return {?}
 */
export function createEffects(injector, effectGroups, userProvidedEffectGroups) {
    /** @type {?} */
    const mergedEffects = [];
    for (let effectGroup of effectGroups) {
        mergedEffects.push(...effectGroup);
    }
    for (let userProvidedEffectGroup of userProvidedEffectGroups) {
        mergedEffects.push(...userProvidedEffectGroup);
    }
    return createEffectInstances(injector, mergedEffects);
}
/**
 * @param {?} injector
 * @param {?} effects
 * @return {?}
 */
export function createEffectInstances(injector, effects) {
    return effects.map((/**
     * @param {?} effect
     * @return {?}
     */
    (effect) => injector.get(effect)));
}
/**
 * @param {?} runner
 * @param {?} rootEffects
 * @return {?}
 */
export function _provideForRootGuard(runner, rootEffects) {
    // check whether any effects are actually passed
    /** @type {?} */
    const hasEffects = !(rootEffects.length === 1 && rootEffects[0].length === 0);
    if (hasEffects && runner) {
        throw new TypeError(`EffectsModule.forRoot() called twice. Feature modules should use EffectsModule.forFeature() instead.`);
    }
    return 'guarded';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWZmZWN0c19tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL2VmZmVjdHMvc3JjL2VmZmVjdHNfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFFBQVEsRUFFUixRQUFRLEVBQ1IsUUFBUSxFQUNSLElBQUksRUFDSixRQUFRLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDckUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDMUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsZUFBZSxFQUNmLFlBQVksRUFDWixxQkFBcUIsR0FDdEIsTUFBTSxVQUFVLENBQUM7QUFHbEIsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQ2YsaUJBQThCLEVBQUU7UUFFaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULGNBQWM7Z0JBQ2Q7b0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsS0FBSyxFQUFFLElBQUk7b0JBQ1gsUUFBUSxFQUFFLGNBQWM7aUJBQ3pCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLEtBQUssRUFBRSxJQUFJO29CQUNYLFFBQVEsRUFBRSxFQUFFO2lCQUNiO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixLQUFLLEVBQUUsSUFBSTtvQkFDWCxVQUFVLEVBQUUsYUFBYTtvQkFDekIsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixDQUFDO2lCQUMxRDthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FDWixjQUEyQixFQUFFO1FBRTdCLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVDtvQkFDRSxPQUFPLEVBQUUscUJBQXFCO29CQUM5QixRQUFRLEVBQUUsMEJBQTBCO2lCQUNyQztnQkFDRCxhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsT0FBTztnQkFDUCxXQUFXO2dCQUNYO29CQUNFLE9BQU8sRUFBRSxhQUFhO29CQUN0QixRQUFRLEVBQUUsQ0FBQyxXQUFXLENBQUM7aUJBQ3hCO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxtQkFBbUI7b0JBQzVCLFVBQVUsRUFBRSxvQkFBb0I7b0JBQ2hDLElBQUksRUFBRTt3QkFDSixDQUFDLGFBQWEsRUFBRSxJQUFJLFFBQVEsRUFBRSxFQUFFLElBQUksUUFBUSxFQUFFLENBQUM7d0JBQy9DLENBQUMsYUFBYSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUM7cUJBQzVCO2lCQUNGO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLEtBQUssRUFBRSxJQUFJO29CQUNYLFFBQVEsRUFBRSxFQUFFO2lCQUNiO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxZQUFZO29CQUNyQixVQUFVLEVBQUUsYUFBYTtvQkFDekIsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQztpQkFDdkQ7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUFuRUYsUUFBUSxTQUFDLEVBQUU7Ozs7Ozs7O0FBc0VaLE1BQU0sVUFBVSxhQUFhLENBQzNCLFFBQWtCLEVBQ2xCLFlBQTJCLEVBQzNCLHdCQUF1Qzs7VUFFakMsYUFBYSxHQUFnQixFQUFFO0lBRXJDLEtBQUssSUFBSSxXQUFXLElBQUksWUFBWSxFQUFFO1FBQ3BDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQztLQUNwQztJQUVELEtBQUssSUFBSSx1QkFBdUIsSUFBSSx3QkFBd0IsRUFBRTtRQUM1RCxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsdUJBQXVCLENBQUMsQ0FBQztLQUNoRDtJQUVELE9BQU8scUJBQXFCLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBQ3hELENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxxQkFBcUIsQ0FDbkMsUUFBa0IsRUFDbEIsT0FBb0I7SUFFcEIsT0FBTyxPQUFPLENBQUMsR0FBRzs7OztJQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7QUFDdkQsQ0FBQzs7Ozs7O0FBRUQsTUFBTSxVQUFVLG9CQUFvQixDQUNsQyxNQUFxQixFQUNyQixXQUFvQjs7O1VBR2QsVUFBVSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUM3RSxJQUFJLFVBQVUsSUFBSSxNQUFNLEVBQUU7UUFDeEIsTUFBTSxJQUFJLFNBQVMsQ0FDakIsc0dBQXNHLENBQ3ZHLENBQUM7S0FDSDtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBJbmplY3RvcixcbiAgTW9kdWxlV2l0aFByb3ZpZGVycyxcbiAgTmdNb2R1bGUsXG4gIE9wdGlvbmFsLFxuICBTZWxmLFxuICBTa2lwU2VsZixcbiAgVHlwZSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3Rpb25zIH0gZnJvbSAnLi9hY3Rpb25zJztcbmltcG9ydCB7IEVmZmVjdFNvdXJjZXMgfSBmcm9tICcuL2VmZmVjdF9zb3VyY2VzJztcbmltcG9ydCB7IEVmZmVjdHNGZWF0dXJlTW9kdWxlIH0gZnJvbSAnLi9lZmZlY3RzX2ZlYXR1cmVfbW9kdWxlJztcbmltcG9ydCB7IGRlZmF1bHRFZmZlY3RzRXJyb3JIYW5kbGVyIH0gZnJvbSAnLi9lZmZlY3RzX2Vycm9yX2hhbmRsZXInO1xuaW1wb3J0IHsgRWZmZWN0c1Jvb3RNb2R1bGUgfSBmcm9tICcuL2VmZmVjdHNfcm9vdF9tb2R1bGUnO1xuaW1wb3J0IHsgRWZmZWN0c1J1bm5lciB9IGZyb20gJy4vZWZmZWN0c19ydW5uZXInO1xuaW1wb3J0IHtcbiAgX0ZFQVRVUkVfRUZGRUNUUyxcbiAgX1JPT1RfRUZGRUNUUyxcbiAgX1JPT1RfRUZGRUNUU19HVUFSRCxcbiAgRUZGRUNUU19FUlJPUl9IQU5ETEVSLFxuICBGRUFUVVJFX0VGRkVDVFMsXG4gIFJPT1RfRUZGRUNUUyxcbiAgVVNFUl9QUk9WSURFRF9FRkZFQ1RTLFxufSBmcm9tICcuL3Rva2Vucyc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBFZmZlY3RzTW9kdWxlIHtcbiAgc3RhdGljIGZvckZlYXR1cmUoXG4gICAgZmVhdHVyZUVmZmVjdHM6IFR5cGU8YW55PltdID0gW11cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxFZmZlY3RzRmVhdHVyZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRWZmZWN0c0ZlYXR1cmVNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgZmVhdHVyZUVmZmVjdHMsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfRkVBVFVSRV9FRkZFQ1RTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiBmZWF0dXJlRWZmZWN0cyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFVTRVJfUFJPVklERURfRUZGRUNUUyxcbiAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgICB1c2VWYWx1ZTogW10sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBGRUFUVVJFX0VGRkVDVFMsXG4gICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgICAgdXNlRmFjdG9yeTogY3JlYXRlRWZmZWN0cyxcbiAgICAgICAgICBkZXBzOiBbSW5qZWN0b3IsIF9GRUFUVVJFX0VGRkVDVFMsIFVTRVJfUFJPVklERURfRUZGRUNUU10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChcbiAgICByb290RWZmZWN0czogVHlwZTxhbnk+W10gPSBbXVxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEVmZmVjdHNSb290TW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBFZmZlY3RzUm9vdE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogRUZGRUNUU19FUlJPUl9IQU5ETEVSLFxuICAgICAgICAgIHVzZVZhbHVlOiBkZWZhdWx0RWZmZWN0c0Vycm9ySGFuZGxlcixcbiAgICAgICAgfSxcbiAgICAgICAgRWZmZWN0c1J1bm5lcixcbiAgICAgICAgRWZmZWN0U291cmNlcyxcbiAgICAgICAgQWN0aW9ucyxcbiAgICAgICAgcm9vdEVmZmVjdHMsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBfUk9PVF9FRkZFQ1RTLFxuICAgICAgICAgIHVzZVZhbHVlOiBbcm9vdEVmZmVjdHNdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogX1JPT1RfRUZGRUNUU19HVUFSRCxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBfcHJvdmlkZUZvclJvb3RHdWFyZCxcbiAgICAgICAgICBkZXBzOiBbXG4gICAgICAgICAgICBbRWZmZWN0c1J1bm5lciwgbmV3IE9wdGlvbmFsKCksIG5ldyBTa2lwU2VsZigpXSxcbiAgICAgICAgICAgIFtfUk9PVF9FRkZFQ1RTLCBuZXcgU2VsZigpXSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVVNFUl9QUk9WSURFRF9FRkZFQ1RTLFxuICAgICAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgICAgIHVzZVZhbHVlOiBbXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFJPT1RfRUZGRUNUUyxcbiAgICAgICAgICB1c2VGYWN0b3J5OiBjcmVhdGVFZmZlY3RzLFxuICAgICAgICAgIGRlcHM6IFtJbmplY3RvciwgX1JPT1RfRUZGRUNUUywgVVNFUl9QUk9WSURFRF9FRkZFQ1RTXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWZmZWN0cyhcbiAgaW5qZWN0b3I6IEluamVjdG9yLFxuICBlZmZlY3RHcm91cHM6IFR5cGU8YW55PltdW10sXG4gIHVzZXJQcm92aWRlZEVmZmVjdEdyb3VwczogVHlwZTxhbnk+W11bXVxuKTogYW55W10ge1xuICBjb25zdCBtZXJnZWRFZmZlY3RzOiBUeXBlPGFueT5bXSA9IFtdO1xuXG4gIGZvciAobGV0IGVmZmVjdEdyb3VwIG9mIGVmZmVjdEdyb3Vwcykge1xuICAgIG1lcmdlZEVmZmVjdHMucHVzaCguLi5lZmZlY3RHcm91cCk7XG4gIH1cblxuICBmb3IgKGxldCB1c2VyUHJvdmlkZWRFZmZlY3RHcm91cCBvZiB1c2VyUHJvdmlkZWRFZmZlY3RHcm91cHMpIHtcbiAgICBtZXJnZWRFZmZlY3RzLnB1c2goLi4udXNlclByb3ZpZGVkRWZmZWN0R3JvdXApO1xuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZUVmZmVjdEluc3RhbmNlcyhpbmplY3RvciwgbWVyZ2VkRWZmZWN0cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFZmZlY3RJbnN0YW5jZXMoXG4gIGluamVjdG9yOiBJbmplY3RvcixcbiAgZWZmZWN0czogVHlwZTxhbnk+W11cbik6IGFueVtdIHtcbiAgcmV0dXJuIGVmZmVjdHMubWFwKChlZmZlY3QpID0+IGluamVjdG9yLmdldChlZmZlY3QpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9wcm92aWRlRm9yUm9vdEd1YXJkKFxuICBydW5uZXI6IEVmZmVjdHNSdW5uZXIsXG4gIHJvb3RFZmZlY3RzOiBhbnlbXVtdXG4pOiBhbnkge1xuICAvLyBjaGVjayB3aGV0aGVyIGFueSBlZmZlY3RzIGFyZSBhY3R1YWxseSBwYXNzZWRcbiAgY29uc3QgaGFzRWZmZWN0cyA9ICEocm9vdEVmZmVjdHMubGVuZ3RoID09PSAxICYmIHJvb3RFZmZlY3RzWzBdLmxlbmd0aCA9PT0gMCk7XG4gIGlmIChoYXNFZmZlY3RzICYmIHJ1bm5lcikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICBgRWZmZWN0c01vZHVsZS5mb3JSb290KCkgY2FsbGVkIHR3aWNlLiBGZWF0dXJlIG1vZHVsZXMgc2hvdWxkIHVzZSBFZmZlY3RzTW9kdWxlLmZvckZlYXR1cmUoKSBpbnN0ZWFkLmBcbiAgICApO1xuICB9XG4gIHJldHVybiAnZ3VhcmRlZCc7XG59XG4iXX0=