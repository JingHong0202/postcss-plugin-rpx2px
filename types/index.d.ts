import { PluginCreator } from 'postcss';

type pluginParams = {
  unit?: string;
  whiteAttrList?: string[];
  whiteSelector?: string[];
  whiteFileList?: string[];
  designBaseVal?: number;
  unitPrecision?: number;
  mediaQuery?: boolean;
};
declare const plugin: (options: pluginParams) => PluginCreator<pluginParams>;

export { plugin as default };
