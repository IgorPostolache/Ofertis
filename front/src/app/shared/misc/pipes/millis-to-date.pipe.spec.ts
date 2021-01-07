import { MillisToDatePipe } from './millis-to-date.pipe';

describe('MillisToDatePipe', () => {
  it('create an instance', () => {
    const pipe = new MillisToDatePipe();
    expect(pipe).toBeTruthy();
  });
});
