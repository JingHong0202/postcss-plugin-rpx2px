import type { PluginCreator, Rule } from 'postcss';

type pluginParams = {
  unit?: string;
  whiteAttrList?: string[];
  whiteSelector?: string[];
  whiteFileList?: string[];
  designBaseVal?: number;
  unitPrecision?: number;
  mediaQuery?: boolean;
};

const plugin: PluginCreator<pluginParams> = (
  options = { unit: 'rpx', unitPrecision: 2, designBaseVal: 750 }
) => {
  const unitReg = new RegExp(`(\\d+)${options.unit || 'rpx'}`, 'ig');
  const transform = (matchStr: string, num: number) => {
    const base = options.designBaseVal || 750;
    return `${(750 * (+num / +base)).toFixed(options.unitPrecision || 2)}px`;
  };
  let isWhiteFile = false;
  return {
    postcssPlugin: 'postcss-rpx2px',
    prepare(result) {
      return {
        Once(root) {
          if (!options.whiteFileList?.length) return;
          const source = root.source,
            input = source?.input;
          if (!input?.file) return;
          isWhiteFile = !options.whiteFileList.every(file => {
            return input.file?.indexOf(file) !== -1;
          });
        },
        Declaration(decl) {
          if (
            options?.whiteAttrList?.includes(decl.prop) ||
            options?.whiteSelector?.includes(
              String((<Rule>decl.parent).selector)
            ) ||
            isWhiteFile
          ) {
            return;
          }

          decl.value = decl.value.replace(unitReg, transform);
        },

        AtRule: {
          media: atRule => {
            if (!options.mediaQuery || isWhiteFile) return;
            atRule.params = atRule.params.replace(unitReg, transform);
          }
        }
      };
    }
  };
};

plugin.postcss = true;
module.exports = plugin;
export default plugin;
