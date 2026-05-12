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
];
