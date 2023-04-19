import { PluginCreator } from 'postcss';

type pluginParams = {
  unit?: string;
  whiteAttrList?: string[];
  whiteSelector?: string[];
  whiteFileList?: string[];
  designBaseVal?: number;
  unitPrecision?: number;
  mediaQuery?: boolean;
  rootVal?: number;
};
declare const plugin: (options: pluginParams) => PluginCreator<pluginParams>;

export { plugin as default };
