import { expect, describe, test } from 'vitest';
import postcss from 'postcss';
import rpx2px from '../src/index';

describe('example', () => {
  test('normlize', async () => {
    expect(
      (
        await postcss([
          rpx2px({ whiteAttrList: ['font-size'], whiteSelector: ['#white'] })
        ]).process(
          'a {font-size: 24rpx};div {width: 1120rpx};#white {width: 333rpx}'
        )
      ).css
    ).toMatchSnapshot();
  });

  test('mediaQuery', async () => {
    expect(
      (
        await postcss([rpx2px({ mediaQuery: true })]).process(
          '@media screen and (min-width: 480rpx) {a {font-size: 24rpx};div {width: 1120rpx};#white {width: 333rpx}}'
        )
      ).css
    ).toMatchSnapshot();
  });

  test('whiteFileList', async () => {
    expect(
      (
        await postcss([rpx2px({ whiteFileList: ['example'] })]).process(
          '@media screen and (min-width: 480rpx) {a {font-size: 24rpx};div {width: 1120rpx};#white {width: 333rpx}}',
          { from: './example/app.css', to: './example/app.css' }
        )
      ).css
    ).toMatchSnapshot();
  });
});
