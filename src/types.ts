import { Options } from '@antv/g2plot';

export interface ChartOptions extends Omit<Options, 'data' | 'legend' | 'tooltip' | 'label'> {
  /** 主题：4种编辑器主题 */
  readonly theme: 'vscode' | 'vim' | 'webstorm' | 'atom';

  /** PART 1: 日常作息 daily schedule visualization */
  readonly dailySchedule: {
    readonly time: 'morning' | 'afternoon' | 'dawn' | 'night' | 'midnight';
    readonly color: string[];
  };

  /** PART 2: music visualization */
  readonly music: {
    readonly type: 'classic' | 'metal' | 'electronic' | 'pop';
    readonly color: Options['color'];
    // todo 其他配置
  };

  /** PART 3: waterdrop visualization */
  readonly waterdrop: {
    readonly selected: 'React' | 'Bymyself' | 'Vue' | 'Angular';
  };

  /** PART 4: central-text 中心文本 */
  readonly centralText: {
    readonly content: string;
    readonly style?: {
      fontSize?: number;
      fontFamily?: string;
    };
  };
}
