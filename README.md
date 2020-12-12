# G2Plot-Infographic

> G2Plot-Infographic: plugin based on G2Plot v2. [LIVE DEMO](https://me-momo.github.io/G2Plot-Infographic/)

[![npm Version](https://img.shields.io/npm/v/g2plot-infographic.svg)](https://www.npmjs.com/package/g2plot-infographic)
[![npm License](https://img.shields.io/npm/l/g2plot-infographic.svg)](https://www.npmjs.com/package/g2plot-infographic)


## Install

```bash
$ npm i --save g2plot-infographic
```


## Usage

 - render

```ts
import { G2Plot } from '@antv/g2plot';
import { adaptor, defaultOptions } from 'g2plot-infographic';

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
