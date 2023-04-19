# postcss-plugin-viewport

> 用于将自定义 css 单位转换为自适应单位 如：（vw、rem）的一个 postcss 插件

### params

```typescript
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
```

### notice

> 传 rootVal，自动采用 rem，没有则默认使用 vw
