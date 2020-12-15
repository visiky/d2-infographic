import {
  AFTERNOON_DAILY_SCHEDULE,
  DAWN_DAILY_SCHEDULE,
  MIDNIGHT_DAILY_SCHEDULE,
  MORNING_DAILY_SCHEDULE,
  NIGHT_DAILY_SCHEDULE,
} from 'datas/dailySchedule';
import { CLASSIC, METAL, ELECTRONIC, POP } from 'datas/music';

/**
 * 获取音乐可视化的数据
 * @param type
 */
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
 * 获取日常作息可视化的数据
 * @param time
 */
export function getDailyScheduleData(time: 'morning' | 'afternoon' | 'dawn' | 'night' | 'midnight') {
  switch (time) {
    case 'morning':
      return MORNING_DAILY_SCHEDULE;
    case 'afternoon':
      return AFTERNOON_DAILY_SCHEDULE;
    case 'dawn':
      return DAWN_DAILY_SCHEDULE;
    case 'night':
      return NIGHT_DAILY_SCHEDULE;
    case 'midnight':
      return MIDNIGHT_DAILY_SCHEDULE;
    default:
      return [];
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

/**
 * 判断 chart 容器大小，返回设备大小类型
 */
export function getContainerSizeType(view) {
  const coordinate = view.getCoordinate();
  let d = coordinate.isPolar ? coordinate.getRadius() * 2 : 0;
  if (!d) {
    const width = coordinate.getWidth();
    const height = coordinate.getHeight();
    d = Math.min(width, height);
  }

  if (d < 280) {
    return 'small';
  }
  if (d < 400) {
    return 'medium';
  }
  if (d > 640) {
    return 'large';
  }
  return 'normal';
}

function baseAssignValue(object, key, value) {
  if (key == '__proto__') {
    Object.defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      value: value,
      writable: true,
    });
  } else {
    object[key] = value;
  }
}

/**
 * @description like lodash.keyBy
 * @example
 *
 * const array = [
 *   { 'dir': 'left', 'code': 97 },
 *   { 'dir': 'right', 'code': 100 }
 * ]
 *
 * keyBy(array, ({ code }) => String.fromCharCode(code))
 * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
 */
export function keyBy(array: object[], iteratee: Function) {
  return array.reduce((result, value) => (baseAssignValue(result, iteratee(value), value), result), {});
}
