import { classNames } from 'shared/config/lib/classNames/classNames';

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('someCls')).toBe('someCls');
  });
  test('with additional param', () => {
    expect(classNames('someCls', {}, ['cls1', 'cls2']))
      .toBe('someCls cls1 cls2');
  });
  test('with mods both true param', () => {
    expect(classNames(
      'someCls',
      { hovered: true, hide: true },
      ['cls1', 'cls2'],
    ))
      .toBe('someCls cls1 cls2 hovered hide');
  });
  test('with mods one true param', () => {
    expect(classNames(
      'someCls',
      { hovered: true, hide: false },
      ['cls1', 'cls2'],
    ))
      .toBe('someCls cls1 cls2 hovered');
  });
  test('with mods unidefined param', () => {
    expect(classNames(
      'someCls',
      { hovered: true, hide: undefined },
      ['cls1', 'cls2'],
    ))
      .toBe('someCls cls1 cls2 hovered');
  });
});
