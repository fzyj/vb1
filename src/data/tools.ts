export interface Tool {
  href: string;
  title: string;
  desc: string;
  icon: string;
}

export const tools: Tool[] = [
  {
    href: '/base64',
    title: 'Base64 编码/解码',
    desc: '文本与文件转换',
    icon: '🔤',
  },
  {
    href: '/case-converter',
    title: '变量命名转换',
    desc: 'Camel/Snake/Kebab 等格式互转',
    icon: '🔠',
  },
  {
    href: '/pdf-to-image',
    title: 'PDF 转图片',
    desc: '逐页输出或合成长图',
    icon: '🖼️',
  },
  {
    href: '/todo',
    title: '待办清单',
    desc: '管理日常待办事项',
    icon: '✅',
  },
  {
    href: '/json-editor',
    title: 'JSON 编辑器',
    desc: '格式化、校验与编辑 JSON',
    icon: '📋',
  },
  {
    href: '/markdown',
    title: 'Markdown 编辑器',
    desc: '实时预览与导出 HTML',
    icon: '📝',
  },
  {
    href: '/pomodoro',
    title: '番茄钟',
    desc: '专注工作计时器',
    icon: '🍅',
  },
  {
    href: '/currency',
    title: '货币汇率转换',
    desc: '实时汇率换算、多币对比与历史查询',
    icon: '💱',
  },
];
