import { flow, Params } from '@antv/g2plot';
import { deepAssign } from '@antv/g2plot/lib/utils';
import { DAILY_SCHEDULE_COLOR, MUSIC_COLOR, THEME, FONT_FAMILY, WATERDROP_COLOR, WATERDROP_STROKE } from './contants';
import {
  getMusicData,
  generateRandomAngle,
  generateRandomData,
  getDailyScheduleData,
  getContainerSizeType,
  keyBy,
} from './helpers';
import { ChartOptions } from './types';
import './shapes/breath-point';
import './shapes/waterdrop';

/**
 * 默认配置
 * @param options
 */
export const defaultOptions: ChartOptions = {
  height: 600,
  autoFit: true,
  // 主题：编辑器
  theme: 'vscode',
  // 日常作息
  dailySchedule: {
    color: DAILY_SCHEDULE_COLOR,
    time: 'morning',
  },
  // 喜欢的音乐
  music: {
    type: 'classic',
    color: MUSIC_COLOR,
  },
  // 水滴：喜欢的前端框架
  waterdrop: {
    selected: 'React',
  },
  centralText: {
    content: 'G2Plot',
    style: {
      fontSize: 34,
      fontFamily: FONT_FAMILY,
    },
  },
};

/**
 * 图例, tooltip 等
 * @private
 * @param params
 */
function chartAdaptor(params: Params<ChartOptions>): Params<ChartOptions> {
  const { chart } = params;
  chart.legend(false);
  chart.tooltip(false);

  return params;
}

/**
 * 主题
 * @param params
 */
function theme(params: Params<ChartOptions>): Params<ChartOptions> {
  const { chart, options } = params;
  const background = THEME[options.theme].dark.mainBack;
  chart.theme({ background });

  return params;
}

/**
 * Part 1: daily schedule
 * @param params
 */
function dailySchedule(params: Params<ChartOptions>): Params<ChartOptions> {
  const { chart, options } = params;

  const { time, color } = options.dailySchedule;
  const themeStyles = THEME[options.theme].dark;

  // view1 条形图
  const v1 = chart.createView();
  const innerRadius = 0.6;
  v1.coordinate({
    type: 'polar',
    cfg: { radius: 1, innerRadius /** 内环半径 */ },
  });

  v1.data(getDailyScheduleData(time))
    .scale('x', { type: 'cat' })
    .scale('y', { min: 0 });
  v1.axis('x', false);
  v1.axis('y', {
    label: null,
    line: null,
    grid: null,
  });
  v1.legend(false);
  v1.interval({ theme: { roseWidthRatio: 0.6 } })
    .position('x*y')
    .color('type')
    .label(false)
    .adjust({
      type: 'dodge',
      marginRatio: 1,
    })
    .style('time', (time) => {
      const times = ['midnight', 'morning', 'afternoon', 'dawn', 'night'];
      const idx = times.indexOf(time);
      return {
        fillOpacity: 0.45,
        lineCap: 'round',
        fill: color[idx !== -1 ? idx : 0],
      };
    });

  // 同步环图, 环图外的光圈（需要放置在环图下方）
  const v2 = chart.createView();
  v2.coordinate({ type: 'theta', cfg: { radius: innerRadius } });
  v2.data([{ y: 1 }]);
  v2.interval()
    .position('1*y')
    .style({
      // note: 不能设置 fill 为透明，否则 shadow 阴影失效
      fill: themeStyles.mainBack,
      ...(themeStyles.shadow || {}),
    });

  // view3 环形图 vis-donut
  const startX = (1 - innerRadius) / 2;
  const endX = 1 - startX;
  const v3 = chart.createView({
    region: {
      start: { x: startX, y: startX },
      end: { x: endX, y: endX },
    },
  });
  v3.coordinate({
    type: 'theta',
    cfg: {
      startAngle: (-Math.PI * 5) / 12,
      endAngle: (Math.PI * 3) / 2 + (Math.PI * 1) / 12,
      radius: 1,
      innerRadius: 0.95,
    },
  });

  v3.axis(false);
  v3.data([
    { x: 'midnight', y: 8 },
    { x: 'morning', y: 14 },
    { x: 'afternoon', y: 10 },
    { x: 'dawn', y: 8 },
    { x: 'night', y: 8 },
  ]);
  v3.interval()
    .position('1*y')
    .color('x', color)
    .adjust('stack')
    .label('x', (x) => {
      const cfg: any = {
        labelLine: false,
        // todo 不生效
        autoRotate: true,
        labelEmit: true,
        style: {
          fontFamily: FONT_FAMILY,
          fill: themeStyles.mainText,
          fillOpacity: 0.5,
          fontSize: 10,
        },
      };
      return cfg;
    })
    .style({
      stroke: themeStyles.mainBack,
      strokeWidth: 1,
    });

  // 同步环图, 环图外的光圈（需要放置在环图下方）
  const v4 = chart.createView();
  v4.coordinate({ type: 'theta', cfg: { radius: innerRadius * 0.95 } });
  v4.data([{ y: 1 }]);
  v4.interval()
    .position('1*y')
    .style({ fill: themeStyles.mainBack });

  v4.annotation().html({
    position: ['50%', '50%'],
    html: (container, view) => {
      const offsetX = -(v4.getCoordinate()?.getRadius() + 50 || 210);
      const offsetY = v4.getCoordinate()?.getRadius() * 0.55;
      container.style.position = 'relative';
      return `<div style="font-family:${FONT_FAMILY};color:${themeStyles.subText};font-weight:700;position:absolute;left:${offsetX}px;top:${offsetY}px;"><div style="text-align:right;">Daily</div><div style="text-align:right;">Schedule</div></div>`;
    },
  });

  // vis-time: 0、6、12、18 的时间刻度 (同步 vis-donut)
  const v5 = chart.createView({
    region: {
      start: { x: startX, y: startX },
      end: { x: 1 - startX, y: 1 - startX },
    },
  });
  const timeTickData = [
    { x: '0:00', y: 1 },
    { x: '6:00', y: 1 },
    { x: '12:00', y: 1 },
    { x: '18:00', y: 1 },
  ];
  v5.data(timeTickData);
  v5.coordinate({
    type: 'polar',
    cfg: { radius: 1 },
  });
  // note：axis 作为图表组件，也会影响整体布局的计算
  v5.axis(false);
  v5.interval()
    .position('x*y')
    .color('transparent')
    .label({
      fields: ['x'],
      callback: (x: string) => {
        const cfg: any = {
          style: {
            fill: themeStyles.mainText,
            fontSize: 10,
            fontFamily: FONT_FAMILY,
          },
          content: x,
          offset: 4,
          autoRotate: false,
          labelLine: {
            style: {
              stroke: themeStyles.mainText,
              strokeOpacity: 0.65,
              lineWidth: 0.8,
            },
          },
        };
        const dataIdx = timeTickData.map((d) => d.x).indexOf(x);
        if (dataIdx === 0) {
          cfg.style.textBaseline = 'bottom';
        }
        if (dataIdx === 1 /* in-right */) {
          cfg.style.textAlign = 'left';
          cfg.offsetX = 4;
        }
        if (dataIdx === 2) {
          cfg.style.textBaseline = 'top';
          cfg.offsetY = 4;
        }
        if (dataIdx === 3 /* in-left */) {
          cfg.style.textAlign = 'right';
          cfg.offsetX = -4;
        }
        return cfg;
      },
    });

  return params;
}

/**
 * Part 2: music 音乐可视化
 * @param params
 */
function music(params: Params<ChartOptions>): Params<ChartOptions> {
  const { chart, options } = params;

  const { music } = options;

  const musicData = getMusicData(music.type);
  const v1 = chart.createView({
    region: {
      start: { x: 0.16, y: 0.16 },
      end: { x: 0.84, y: 0.84 },
    },
  });
  v1.data(musicData);
  v1.coordinate({
    type: 'polar',
    cfg: {
      radius: 0.8,
      innerRadius: 0.4,
    },
  });
  v1.axis(false);
  v1.line()
    .position('x*y')
    .color('type', music.color)
    .style('type', (type) => {
      const types = Object.keys(keyBy(musicData, (d) => d.type));
      const cfg: any = { lineWidth: 0.8, strokeOpacity: 0.3 };
      const typeIdx = types.indexOf(type);
      // 倒数第一条 0.3 透明度，倒数第二条 0.5 透明度, 依次 0.8, 0.9
      if (types.length - typeIdx === 1) {
        cfg.strokeOpacity = 0.3;
      } else if (types.length - typeIdx === 2) {
        cfg.strokeOpacity = 0.5;
      } else if (typeIdx === 2) {
        cfg.strokeOpacity = 0.8;
      } else if (typeIdx === 1) {
        cfg.strokeOpacity = 0.9;
      } else if (typeIdx === 0) {
        cfg.strokeOpacity = 1;
      }

      return cfg;
    })
    .shape('type', (type) => {
      // todo 完善
      if (['Lead_guitar', 'Electri_bass', 'Rhythm_guitar'].indexOf(type) !== -1) {
        return 'smooth';
      }
      return music.type === 'classic' || music.type === 'pop' ? 'smooth' : '';
    });

  v1.point()
    .position('x*y')
    .color('type', music.color)
    .style('x*y*type', (x, y, type) => {
      const datum = { x, y, type };
      const cfg: any = { r: 0, lineWidth: 0 };
      const musicDataIdx = musicData.findIndex((d) => d.type === datum.type && d.x === datum.x && d.y === datum.y);
      if (music.type === 'metal') {
        cfg.r = musicDataIdx % 3 === 0 ? 0 : 1.5;
      }
      if (music.type === 'classic') {
        cfg.r = 2;
      }
      if (music.type === 'electronic') {
        cfg.r = 1.5;
      }
      // 流行音乐 🎵：第一和第三条和第六条线是曲线，其余直线，第 5 条带圆形○标记
      if (music.type === 'pop') {
        cfg.r = datum.type === 'Rhythm_guitar' ? 2 : 0;
      }
      return cfg;
    })
    .shape('type', () => {
      return music.type === 'metal' ? 'triangle' : music.type === 'classic' ? 'diamond' : 'breath-point';
    });

  const themeStyles = THEME[options.theme].dark;
  v1.annotation().html({
    position: ['50%', '0%'],
    offsetX: -8,
    html: (container) => {
      const offsetX = v1.getCoordinate()?.getRadius() * 0.7;
      const offsetY = v1.getCoordinate()?.getRadius();
      container.style.position = 'relative';
      return `<div style="font-family:${FONT_FAMILY};color:${themeStyles.subText};font-weight:700;font-size:10;position:absolute;left:${offsetX}px;top:${offsetY}px;">Music</div>`;
    },
  });
  return params;
}

/**
 * Part 3: waterdrop 喜欢的前端框架可视化
 * @param params
 */
function waterdrop(params: Params<ChartOptions>): Params<ChartOptions> {
  const { chart, options } = params;
  const { waterdrop } = options;

  const themeStyles = THEME[options.theme].dark;

  const v1 = chart.createView();
  v1.coordinate({
    type: 'polar',
    cfg: {
      radius: 0.48 /** 比 0.46 大一点 */,
      ...generateRandomAngle(),
    },
  });
  v1.axis(false);
  v1.data(generateRandomData(waterdrop.selected));
  v1.interval()
    .position('x*y')
    .color('x', (x) => {
      return WATERDROP_COLOR[x];
    })
    .label({
      fields: ['x'],
      callback: (x: string) => {
        const framework = waterdrop.selected || 'Bymyself';
        const selected = framework === x;
        return {
          autoRotate: true,
          labelEmit: true,
          content: selected ? (x === 'Bymyself' ? 'My lib' : x) : ' ',
          offset: '-45%',
          style: {
            fill: themeStyles.mainBack,
            fontSize: 10,
            fontFamily: FONT_FAMILY,
          },
        };
      },
    })
    .size('', () => {
      const d = v1.getCoordinate().getRadius() * 2;
      return (d * Math.PI) / 18;
    })
    .shape('waterdrop')
    .style('x', (x) => {
      const framework = waterdrop.selected;
      const selected = framework === x || (framework === 'Bymyself' && x === 'Bymyself');
      const containerType = getContainerSizeType(v1);
      return {
        fillOpacity: selected ? 1 : 0.65,
        lineWidth: selected ? (containerType === 'small' ? 1.2 : containerType === 'large' ? 2 : 1.5) : 0,
        stroke: WATERDROP_STROKE[x],
      };
    });

  return params;
}

function centralText(params: Params<ChartOptions>): Params<ChartOptions> {
  const { chart, options } = params;
  const { centralText } = options;

  const themeStyles = THEME[options.theme].dark;

  const v1 = chart.createView();
  v1.coordinate('polar');
  v1.data([]);
  v1.annotation().text({
    position: ['50%', '50%'],
    content: centralText.content || ' ',
    style: deepAssign(
      {},
      {
        fill: themeStyles.mainText,
        textAlign: 'center',
        textBaseline: 'middle',
        fontWeight: 700,
      },
      centralText.style,
    ),
  });

  return params;
}

/**
 * 适配器
 * @param params
 */
export function adaptor(params: Params<ChartOptions>) {
  // flow 的方式处理所有的配置到 G2 API
  return flow(chartAdaptor, theme, dailySchedule, music, waterdrop, centralText)(params);
}
