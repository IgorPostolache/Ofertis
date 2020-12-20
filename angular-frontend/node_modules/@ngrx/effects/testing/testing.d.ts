import { FactoryProvider } from '@angular/core';
import { Observable } from 'rxjs';
/**
 * @description
 * Creates mock actions provider.
 *
 * @param source Actions' source
 */
export declare function provideMockActions(source: Observable<any>): FactoryProvider;
/**
 * @description
 * Creates mock actions provider.
 *
 * @param factory Actions' source creation function
 *
 * @usageNotes
 *
 * **With `TestBed.configureTestingModule`**
 *
 * ```ts
 * describe('Books Effects', () => {
 *   let actions$: Observable<any>;
 *   let effects: BooksEffects;
 *
 *   beforeEach(() => {
 *     TestBed.configureTestingModule({
 *       providers: [
 *         provideMockActions(() => actions$),
 *         BooksEffects,
 *       ],
 *     });
 *
 *     actions$ = TestBed.inject(Actions);
 *     effects = TestBed.inject(BooksEffects);
 *   });
 * });
 * ```
 *
 * **With `Injector.create`**
 *
 * ```ts
 * describe('Counter Effects', () => {
 *   let injector: Injector;
 *   let actions$: Observable<any>;
 *   let effects: CounterEffects;
 *
 *   beforeEach(() => {
 *     injector = Injector.create({
 *       providers: [
 *         provideMockActions(() => actions$),
 *         CounterEffects,
 *       ],
 *     });
 *
 *     actions$ = injector.get(Actions);
 *     effects = injector.get(CounterEffects);
 *   });
 * });
 * ```
 */
export declare function provideMockActions(factory: () => Observable<any>): FactoryProvider;
