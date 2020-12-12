import { CLASSIC, METAL, ELECTRONIC, POP } from 'datas/music';

export function getMusicData(type: 'classic' | 'metal' | 'electronic' | 'pop') {
  switch (type) {
    case 'classic':
      return CLASSIC;
    case 'metal':
      return METAL;
    case 'electronic':
      return ELECTRONIC;
    case 'pop':
      return POP;
    default:
      return CLASSIC;
  }
}

/**
 * util 生成随机角度，用来控制水滴角度和方向
 */
export function generateRandomAngle() {
  //
  const startAngle = (Math.PI / 2) * Math.random() * (Math.random() > 0.5 ? -0.5 : 1);
  const endAngle = Math.PI * 2 + (Math.PI / 6) * Math.random();
  return { startAngle, endAngle };
}

/**
 * 根据最喜欢的前端框架，生成随机数据，绘制水滴
 * @param framework
 */
export function generateRandomData(framework: 'React' | 'Bymyself' | 'Vue' | 'Angular') {
  /** 前端框架的一些渲染配置：vis-waterdrop（4种💧，角度随机） */
  const FrameworkData = [
    { x: 'React', y: 11 },
    { x: 'Bymyself', y: 8 + Math.random() },
    { x: 'Vue', y: 8 + Math.random() },
    { x: 'Angular', y: 7 + Math.random() },
  ];

  const favoriteFrameworkIndex = FrameworkData.findIndex((d) => d.x === framework);
  if (favoriteFrameworkIndex !== -1) {
    // 交换 y 轴
    FrameworkData[0].y = FrameworkData[favoriteFrameworkIndex].y;
    FrameworkData[favoriteFrameworkIndex].y = 11;
  }

  return FrameworkData;
}
