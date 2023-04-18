import { expect, describe, test } from 'vitest';
import postcss from 'postcss';
import postcssVieowport from '../dist/index';
import path from 'path';

describe('example', () => {
  test('normlize', async () => {
    expect(
      (
        await postcss([
          postcssVieowport({
            whiteAttrList: ['font-size'],
            whiteSelector: ['#white']
          })
        ]).process(
          'a {font-size: 24rpx};div {width: 1120rpx};#white {width: 333rpx}'
        )
      ).css
    ).toMatchSnapshot();
  });

  test('mediaQuery', async () => {
    expect(
      (
        await postcss([postcssVieowport({ mediaQuery: true })]).process(
          '@media screen and (min-width: 480rpx) {a {font-size: 24rpx};div {width: 1120rpx};#white {width: 333rpx}}'
        )
      ).css
    ).toMatchSnapshot();
  });

  test('whiteFileList', async () => {
    expect(
      (
        await postcss([
          postcssVieowport({ whiteFileList: ['example'] })
        ]).process(
          '@media screen and (min-width: 480rpx) {a {font-size: 24rpx};div {width: 1120rpx};#white {width: 333rpx}}',
          { from: path.resolve(__dirname, './example/app.css') }
        )
      ).css
    ).toMatchSnapshot();
  });
});
