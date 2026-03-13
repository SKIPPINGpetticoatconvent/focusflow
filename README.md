# FocusFlow - Smart Pomodoro Task Tracker

<p align="center">
  <img src="https://img.shields.io/badge/SvelteKit-5.0-blue?style=for-the-badge&logo=svelte" alt="SvelteKit">
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-3.4-blue?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Supabase-Ready-green?style=for-the-badge" alt="Supabase">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/🗺️-English-blue" alt="English">
  <img src="https://img.shields.io/badge/🗺️-中文-blue" alt="Chinese">
</p>

## 📚 目录 | Table of Contents

- [关于 | About](#about)
- [功能 | Features](#features)
- [技术栈 | Tech Stack](#tech-stack)
- [快速开始 | Quick Start](#quick-start)
- [项目结构 | Project Structure](#project-structure)
- [Supabase 配置 | Supabase Setup](#supabase-setup)
- [Vercel 部署 | Vercel Deployment](#vercel-deployment)
- [演示 | Demo](#demo)

---

## 🍅 关于 | About

**FocusFlow** 是一款强大的生产力工具，结合了番茄工作法 (Pomodoro Technique) 和 AI 驱动的任务管理。

使用 SvelteKit + TypeScript + Tailwind CSS 构建，提供流畅的动画效果和优秀的用户体验。

FocusFlow is a powerful productivity tool combining the Pomodoro Technique with AI-powered task management.

Built with SvelteKit + TypeScript + Tailwind CSS, featuring smooth animations and excellent user experience.

---

## ✨ 功能 | Features

### 核心功能 | Core Features

| 功能          | Feature         | 描述                    | Description                              |
| ------------- | --------------- | ----------------------- | ---------------------------------------- |
| 🍅 番茄钟     | Pomodoro Timer  | 实时计时 + 呼吸动效     | Real-time timer with breathing animation |
| 📋 任务管理   | Task Management | CRUD + 拖拽排序 + 筛选  | CRUD + drag-drop + filtering             |
| 📊 统计仪表盘 | Stats Dashboard | 今日/周专注时长、完成率 | Daily/weekly focus time, completion rate |
| 🤖 AI 助手    | AI Assistant    | Groq API 驱动任务生成   | Groq API powered task generation         |
| 👥 多工作空间 | Multi-workspace | 个人 + 团队工作空间     | Personal + team workspaces               |
| 🔐 用户认证   | User Auth       | 邮箱/Google 登录        | Email/Google authentication              |

### 动画效果 | Animations

- **番茄钟呼吸灯效果** - Pomodoro breathing glow effect
- **任务增删平滑动画** - Smooth task add/remove animations
- **拖拽排序动画** - Drag and drop reordering
- **页面过渡动画** - Page transition effects

---

## 🛠️ 技术栈 | Tech Stack

| 类别    | Category      | 技术                              | Technology                        |
| ------- | ------------- | --------------------------------- | --------------------------------- |
| 框架    | Framework     | SvelteKit 2.x                     | SvelteKit 2.x                     |
| 语言    | Language      | TypeScript 5.x                    | TypeScript 5.x                    |
| 样式    | Styling       | Tailwind CSS 3.x                  | Tailwind CSS 3.x                  |
| UI 组件 | UI Components | shadcn-svelte                     | shadcn-svelte                     |
| 动画    | Animation     | svelte/transition, svelte/animate | svelte/transition, svelte/animate |
| 数据库  | Database      | Supabase (PostgreSQL)             | Supabase (PostgreSQL)             |
| AI      | AI            | Groq API                          | Groq API                          |
| 图表    | Charts        | Chart.js                          | Chart.js                          |
| 部署    | Deployment    | Vercel (@sveltejs/adapter-vercel) | Vercel (@sveltejs/adapter-vercel) |

---

## 🚀 快速开始 | Quick Start

### 前置要求 | Prerequisites

- Node.js 18+
- npm / pnpm / yarn

### 安装 | Installation

```bash
# 克隆项目
git clone https://github.com/your-repo/focusflow.git
cd focusflow

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173

---

## 📁 项目结构 | Project Structure

```
focusflow/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte          # Root layout
│   │   ├── +page.svelte            # Home (redirect)
│   │   ├── (auth)/
│   │   │   ├── login/+page.svelte   # Login page
│   │   │   └── register/+page.svelte
│   │   └── (app)/
│   │       ├── +layout.svelte       # App layout with sidebar
│   │       ├── dashboard/+page.svelte
│   │       ├── workspaces/+page.svelte
│   │       └── settings/+page.svelte
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/                  # shadcn-svelte components
│   │   │   ├── PomodoroTimer.svelte
│   │   │   ├── TaskList.svelte
│   │   │   ├── StatsDashboard.svelte
│   │   │   ├── AIAssistant.svelte
│   │   │   └── Sidebar.svelte
│   │   ├── stores/                  # Svelte stores
│   │   ├── mock/                    # Mock data (demo mode)
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts                 # TypeScript types
│   ├── app.css                      # Global styles
│   └── app.html                     # HTML template
├── static/                          # Static assets
├── package.json
├── svelte.config.js
├── tailwind.config.ts
└── vite.config.ts
```

---

## 🗄️ Supabase 配置 | Supabase Setup

### 1. 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 获取 URL 和 anon key

### 2. 执行 SQL 建表

```sql
-- 用户配置表
create table profiles (
  id uuid references auth.users primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 工作空间表
create table workspaces (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text check (type in ('personal', 'team')) default 'personal',
  owner_id uuid references profiles(id) not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 任务表
create table tasks (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references workspaces(id) on delete cascade,
  title text not null,
  description text,
  status text check (status in ('pending', 'in_progress', 'completed')) default 'pending',
  priority text check (priority in ('low', 'medium', 'high', 'urgent')) default 'medium',
  position integer default 0,
  due_date timestamptz,
  created_by uuid references profiles(id),
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 番茄钟会话表
create table pomodoro_sessions (
  id uuid default gen_random_uuid() primary key,
  workspace_id uuid references workspaces(id) on delete cascade,
  user_id uuid references profiles(id) not null,
  task_id uuid references tasks(id),
  duration integer not null,
  type text check (type in ('work', 'short_break', 'long_break')) default 'work',
  started_at timestamptz default now(),
  completed_at timestamptz,
  created_at timestamptz default now()
);

-- 启用 Realtime
alter publication supabase_realtime add table tasks;
alter publication supabase_realtime add table pomodoro_sessions;
```

### 3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`:

```
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

---

## 🌐 Vercel 部署 | Vercel Deployment

### 方式一：通过 Git 部署

1. 推送代码到 GitHub
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署！

### 方式二：通过 CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 配置

确保 `svelte.config.js` 使用 `@sveltejs/adapter-vercel`:

```javascript
import adapter from "@sveltejs/adapter-vercel";

export default {
  kit: {
    adapter: adapter(),
  },
};
```

---

## 🎮 演示 | Demo

演示模式使用 localStorage 模拟数据，无需配置 Supabase。

Demo mode uses localStorage to simulate data, no Supabase configuration needed.

```bash
npm run dev
```

使用任意邮箱和密码登录即可体验所有功能。

Use any email and password to login and experience all features.

---

## 📄 许可证 | License

MIT License - see LICENSE file for details

---

<p align="center">
  Made with ❤️ using SvelteKit
</p>
