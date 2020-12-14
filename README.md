# D2-Infographic

> Infographic for D2 games, based on G2Plot v2. [LIVE DEMO](https://me-momo.github.io/d2-infographic/)

[![npm Version](https://img.shields.io/npm/v/d2-infographic.svg)](https://www.npmjs.com/package/d2-infographic)
[![npm License](https://img.shields.io/npm/l/d2-infographic.svg)](https://www.npmjs.com/package/d2-infographic)


## Install

```bash
$ npm i --save d2-infographic
```


## Usage

 - render

```ts
import { G2Plot } from '@antv/g2plot';
import { adaptor, defaultOptions } from 'd2-infographic';

const infographic = new G2Plot('container', {
  centralText: {
    content: 'Hi, AntV',
    style: {
      fontSize: 24
    }
  }
}, adaptor, defaultOptions);

infographic.render();
```

 - update

```ts
infographic.update({
  music: { type: 'metal' },
});
```


## License

MIT@[me-momo](https://github.com/me-momo).
