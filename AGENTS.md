# AGENTS.md

## 语言
- 始终使用简体中文回复

## 命令
- `pnpm dev` — 启动开发服务器
- `pnpm build` — 构建到 `dist/`
- `pnpm preview` — 预览生产构建
- `pnpm astro check` — 类型检查项目

## 架构
- Astro 6.x 静态站点；所有源码位于 `src/`
- `pages/` → 路由，`layouts/` → 页面布局，`components/` → 可复用的 `.astro`/UI 文件
- Node ≥ 22.12.0 必需（在 `engines` 中强制要求）

## 禁止编辑
- `.astro/` — 自动生成的类型目录
- `dist/` — 构建输出
