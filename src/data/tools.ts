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
];
