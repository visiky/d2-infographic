<h1 align="center">D2-Infographic for AntV * 2020 D2</h1>

<div align="center">
 
 [![npm Version](https://img.shields.io/npm/v/d2-infographic.svg)](https://www.npmjs.com/package/d2-infographic)
 [![npm License](https://img.shields.io/npm/l/d2-infographic.svg)](https://www.npmjs.com/package/d2-infographic)
 
</div>

> Infographic for D2 games, based on G2Plot v2. [LIVE DEMO](https://visiky.github.io/d2-infographic/)


## Online Game

<img src="https://gw.alipayobjects.com/zos/antfincdn/sfyKghJ1Zu/b0c10ad3-14f1-4d3a-97bb-23405654895f.png" width="414" height="357" />


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

MIT@[visiky](https://github.com/visiky).
