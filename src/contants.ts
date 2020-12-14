// 资源
export const FONT_FAMILY = `Avenir, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif`;

export const DAILY_SCHEDULE_COLOR = [
  'l(0) 0:#6232B4 1:#81CCEA',
  'l(0) 0:#C0F08B 1:#A7E8EA',
  'l(0) 0:#FBD215 1:#B3E79A',
  'l(0) 0:#F8BF39 1:#E26AC4',
  'l(0) 0:#F262BD 1:#4D35AB',
];

export const MUSIC_COLOR = ['#6D5EFF', '#F5BE15', '#5B8FF9', '#EE8CB7', '#60DCAB', '#76D4F9'];

export const WATERDROP_COLOR = {
  React: '#5ED3F3',
  Bymyself: '#C2C8D5',
  Vue: '#3FB37F',
  Angular: '#BC052B',
};

export const WATERDROP_STROKE = {
  React: 'rgba(94,211,243,0.5)',
  Angular: 'rgba(215,2,47,0.5)',
  Vue: 'rgba(63,179,127,0.5)',
  Bymyself: 'rgba(194,200,213,0.5)',
};

const darkTipColor = 'rgba(255, 255, 255, 0.45)';
const lightTipColor = 'rgba(0, 0, 0, 0.45)';

export const THEME = {
  webstorm: {
    light: {
      mainBack: '#F9FAFB',
      mainText: '#2B2C2D',
      subText: '#72124F',
      tipText: lightTipColor,
    },
    dark: {
      mainBack: '#292B2C',
      mainText: '#fff',
      subText: '#FFD576',
      tipText: darkTipColor,
      shadow: {
        fillOpacity: 1,
        shadowColor: 'rgba(255,255,255,0.38)',
        shadowBlur: 100,
      },
    },
  },
  vscode: {
    light: {
      mainBack: '#FEFFFF',
      mainText: '#2B2C2D',
      subText: '#6D2453',
      tipText: lightTipColor,
    },
    dark: {
      mainBack: '#202122',
      mainText: '#fff',
      subText: '#1F96F3',
      tipText: darkTipColor,
      shadow: {
        fillOpacity: 1,
        shadowColor: 'rgba(255,255,255,0.38)',
        shadowBlur: 140,
      },
    },
  },
  vim: {
    light: {
      mainBack: '#F0EBD8',
      mainText: '#403A33',
      subText: '#B2286D',
      tipText: lightTipColor,
    },
    dark: {
      mainBack: '#002D37',
      mainText: '#4FD6E9',
      subText: '#FFBB22',
      tipText: darkTipColor,
      shadow: {
        fillOpacity: 0.45,
        shadowColor: '#4AD8EA',
        shadowBlur: 100,
      },
    },
  },
  atom: {
    light: {
      mainBack: '#F9FAFB',
      mainText: '#252426',
      subText: '#AA3FAA',
      tipText: lightTipColor,
    },
    dark: {
      mainBack: '#262D36',
      mainText: '#fff',
      subText: '#31CFD3',
      tipText: darkTipColor,
      shadow: {
        fillOpacity: 1,
        shadowColor: 'rgba(255,255,255,0.38)',
        shadowBlur: 140,
      },
    },
  },
};
