# G2Plot-InfoGraphics

> G2Plot-InfoGraphics: plugin based on G2Plot v2. [LIVE DEMO](https://git.hust.cc/g2plot-infographics)

[![npm Version](https://img.shields.io/npm/v/g2plot-infographics.svg)](https://www.npmjs.com/package/g2plot-infographics)
[![npm License](https://img.shields.io/npm/l/g2plot-infographics.svg)](https://www.npmjs.com/package/g2plot-infographics)


## Install

```bash
$ npm i --save g2plot-infographics
```


## Usage

 - render

```ts
import { G2Plot } from '@antv/g2plot';
import { adaptor, defaultOptions } from 'g2plot-infographics';

const qr = new G2Plot('container', {
  data: 'Hello, g2plot infographics!',
  padding: 8,
  width: 120,
  height: 120,
  backgroundColor: 'white',
  foregroundColor: 'black',
  typeNumber: 0,
  correctLevel: 'H', // L M H Q
}, adaptor, defaultOptions);

qr.render();
```

 - update

```ts
qr.update({
  ...qr.options,
  data: 'hello world!',
});
```


## License

MIT@[hustcc](https://github.com/hustcc).
