import { s as ssr_context, a as attr_class, b as stringify, c as store_get, e as escape_html, d as attr, u as unsubscribe_stores, f as derived, i as ensure_array_like, j as sanitize_props, k as spread_props, l as slot } from "../../../../chunks/index2.js";
import { a as auth } from "../../../../chunks/auth.js";
import { p as pomodoroStore } from "../../../../chunks/pomodoro.js";
import { f as filteredTasks } from "../../../../chunks/tasks.js";
import "clsx";
import { Chart, registerables } from "chart.js";
import "../../../../chunks/workspace.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function onDestroy(fn) {
  /** @type {SSRContext} */
  ssr_context.r.on_destroy(fn);
}
function PomodoroTimer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const modeLabels = {
      work: "🔥 Focus Time",
      short_break: "☕ Short Break",
      long_break: "🌴 Long Break"
    };
    const modeColors = {
      work: "stroke-error",
      short_break: "stroke-success",
      long_break: "stroke-info"
    };
    const modeGlowColors = {
      work: "shadow-error/50",
      short_break: "shadow-success/50",
      long_break: "shadow-info/50"
    };
    const modeBgColors = {
      work: "bg-error/10 text-error",
      short_break: "bg-success/10 text-success",
      long_break: "bg-info/10 text-info"
    };
    let minutes = derived(() => Math.floor(store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).timeRemaining / 60));
    let seconds = derived(() => store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).timeRemaining % 60);
    let timeDisplay = derived(() => `${minutes().toString().padStart(2, "0")}:${seconds().toString().padStart(2, "0")}`);
    let totalTime = derived(() => store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).mode === "work" ? store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.workDuration * 60 : store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).mode === "short_break" ? store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.shortBreakDuration * 60 : store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.longBreakDuration * 60);
    let progress = derived(() => totalTime() > 0 ? (totalTime() - store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).timeRemaining) / totalTime() * 100 : 0);
    let circumference = derived(() => 2 * Math.PI * 120);
    let strokeDashoffset = derived(() => circumference() - progress() / 100 * circumference());
    $$renderer2.push(`<div class="flex flex-col items-center p-6"><!---->`);
    {
      $$renderer2.push(`<div${attr_class(`badge badge-lg mb-6 ${stringify(modeBgColors[store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).mode])} border-0`)}>${escape_html(modeLabels[store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).mode])}</div>`);
    }
    $$renderer2.push(`<!----> <div${attr_class(`relative w-72 h-72 rounded-full transition-all duration-500 ${stringify(store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).isRunning ? "scale-105 shadow-2xl " + modeGlowColors[store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).mode] : "shadow-xl")}`)}><div class="absolute inset-0 rounded-full border-4 border-base-200/50"></div> <svg class="w-full h-full transform -rotate-90" viewBox="0 0 260 260"><circle cx="130" cy="130" r="120" fill="none" stroke="currentColor" stroke-width="10" class="text-base-300"></circle><circle cx="130" cy="130" r="120" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"${attr("stroke-dasharray", circumference())}${attr("stroke-dashoffset", strokeDashoffset())}${attr_class(`${stringify(modeColors[store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).mode])} transition-all duration-1000 ease-linear`)}></circle></svg> <div class="absolute inset-4 rounded-full bg-base-100 flex flex-col items-center justify-center shadow-inner"><span${attr_class(`text-6xl font-bold font-mono bg-gradient-to-br from-base-content to-base-content/70 bg-clip-text text-transparent transition-all duration-300 ${stringify(store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).isRunning ? "scale-110" : "scale-100")}`)}>${escape_html(timeDisplay())}</span> <span class="text-sm text-base-content/50 mt-2 font-medium">${escape_html(store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).isRunning ? "Running..." : "Ready to start")}</span></div> `);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-8 flex gap-3">`);
    if (!store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).isRunning) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<button class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Start Focus</button>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<button class="btn btn-warning btn-lg gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Pause</button>`);
    }
    $$renderer2.push(`<!--]--> <button class="btn btn-ghost btn-lg gap-2 hover:bg-base-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg> Reset</button> <button class="btn btn-ghost btn-lg gap-2 hover:bg-base-200"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg> Skip</button></div> <div class="mt-6 flex items-center gap-6 text-sm"><div class="flex items-center gap-2 px-4 py-2 bg-base-200 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-error" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg> <span class="font-medium">${escape_html(store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).completedPomodoros)}</span> <span class="text-base-content/60">completed</span></div> <div class="flex items-center gap-2 px-4 py-2 bg-base-200 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span class="font-medium">${escape_html(store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.sessionsBeforeLongBreak - store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).completedPomodoros % store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.sessionsBeforeLongBreak)}</span> <span class="text-base-content/60">until long break</span></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function TaskList($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let newTaskTitle = "";
    let editingTaskId = null;
    let editingTitle = "";
    let filter = "all";
    let searchQuery = "";
    const priorityColors = {
      low: { badge: "badge-info", icon: "↓" },
      medium: { badge: "badge-primary", icon: "→" },
      high: { badge: "badge-warning", icon: "↑" },
      urgent: { badge: "badge-error", icon: "!" }
    };
    $$renderer2.push(`<div class="space-y-5"><div class="relative group"><div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <input type="search" placeholder="Search tasks..." class="input input-bordered w-full pl-12 pr-4 py-3 rounded-xl focus:input-primary transition-all"${attr("value", searchQuery)}/></div> <form class="flex gap-3"><div class="relative flex-1"><input type="text" placeholder="What needs to be done?" class="input input-bordered w-full pr-4 py-3 rounded-xl focus:input-primary transition-all"${attr("value", newTaskTitle)}/></div> <button type="submit" class="btn btn-primary gap-2 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"${attr("disabled", !newTaskTitle.trim(), true)}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg> <span class="hidden sm:inline">Add Task</span></button></form> <div class="flex gap-2 flex-wrap"><!--[-->`);
    const each_array = ensure_array_like([
      {
        id: "all",
        label: "All",
        icon: "○",
        count: store_get($$store_subs ??= {}, "$filteredTasks", filteredTasks).tasks.length
      },
      { id: "pending", label: "Pending", icon: "○" },
      { id: "in_progress", label: "In Progress", icon: "◐" },
      { id: "completed", label: "Completed", icon: "●" }
    ]);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let filterOption = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`btn btn-sm rounded-full gap-2 ${stringify(filter === filterOption.id ? "btn-primary shadow-md" : "btn-ghost hover:bg-base-200")}`)}><span>${escape_html(filterOption.icon)}</span> <span>${escape_html(filterOption.label)}</span> `);
      if (filterOption.count !== void 0) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span${attr_class(`badge badge-sm ${stringify(filter === filterOption.id ? "badge-ghost" : "")}`)}>${escape_html(store_get($$store_subs ??= {}, "$filteredTasks", filteredTasks).tasks.length)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div> `);
    if (store_get($$store_subs ??= {}, "$filteredTasks", filteredTasks).tasks.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="text-center py-12"><div class="w-20 h-20 mx-auto mb-4 rounded-full bg-base-200 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg></div> <p class="text-base-content/60 text-lg">${escape_html("No tasks yet. Add one above!")}</p></div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<ul class="space-y-2"><!--[-->`);
      const each_array_1 = ensure_array_like(store_get($$store_subs ??= {}, "$filteredTasks", filteredTasks).tasks);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let task = each_array_1[$$index_1];
        $$renderer2.push(`<li draggable="true" class="group flex items-center gap-3 p-4 rounded-xl bg-base-200/50 hover:bg-base-200 border border-transparent hover:border-base-300 transition-all hover:shadow-md"><div class="cursor-grab active:cursor-grabbing text-base-content/30 hover:text-base-content/60 opacity-0 group-hover:opacity-100 transition-opacity"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></div> <input type="checkbox"${attr("checked", task.status === "completed", true)} class="checkbox checkbox-primary checkbox-md rounded-lg"/> `);
        if (editingTaskId === task.id) {
          $$renderer2.push("<!--[0-->");
          $$renderer2.push(`<div class="flex-1 flex gap-2"><input type="text" class="input input-bordered input-sm flex-1"${attr("value", editingTitle)} autofocus=""/> <button class="btn btn-sm btn-success btn-circle"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></button> <button class="btn btn-sm btn-ghost btn-circle"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
        } else {
          $$renderer2.push("<!--[-1-->");
          $$renderer2.push(`<span${attr_class(`flex-1 text-base transition-all ${stringify(task.status === "completed" ? "line-through text-base-content/40" : "")}`)}>${escape_html(task.title)}</span> <span${attr_class(`badge badge-sm ${stringify(priorityColors[task.priority].badge)} gap-1`)}><span>${escape_html(priorityColors[task.priority].icon)}</span> <span class="capitalize">${escape_html(task.priority)}</span></span> <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button class="btn btn-xs btn-ghost btn-circle" title="Edit"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button> <button class="btn btn-xs btn-ghost btn-circle text-error hover:bg-error/10" title="Delete"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div>`);
        }
        $$renderer2.push(`<!--]--></li>`);
      }
      $$renderer2.push(`<!--]--></ul>`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function StatsDashboard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    Chart.register(...registerables);
    let stats = [];
    onDestroy(() => {
    });
    $$renderer2.push(`<div class="space-y-6"><div class="stats stats-vertical lg:stats-horizontal shadow"><div class="stat"><div class="stat-title text-error">Total Minutes</div> <div class="stat-value text-error">${escape_html(stats.reduce((sum, s) => sum + s.totalMinutes, 0))}</div></div> <div class="stat"><div class="stat-title text-success">Sessions</div> <div class="stat-value text-success">${escape_html(stats.reduce((sum, s) => sum + s.sessionsCompleted, 0))}</div></div> <div class="stat"><div class="stat-title text-info">Tasks Done</div> <div class="stat-value text-info">${escape_html(stats.reduce((sum, s) => sum + s.tasksCompleted, 0))}</div></div></div> <div class="space-y-4"><h4 class="text-sm font-medium">Weekly Focus Time</h4> <div class="h-40"><canvas></canvas></div></div> <div class="space-y-4"><h4 class="text-sm font-medium">Task Completion</h4> <div class="h-40"><canvas></canvas></div></div></div>`);
  });
}
function Message_square($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "message-square" },
    $$sanitized_props,
    {
      /**
       * @component @name MessageSquare
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjEgMTVhMiAyIDAgMCAxLTIgMkg3bC00IDRWNWEyIDIgMCAwIDEgMi0yaDE0YTIgMiAwIDAgMSAyIDJ6IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/message-square
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function AIAssistant($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="fixed bottom-4 right-4 z-50">`);
    {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--> <button class="btn btn-circle btn-lg shadow-lg">`);
    Message_square($$renderer2, { class: "w-6 h-6" });
    $$renderer2.push(`<!----></button></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentTime = "";
    $$renderer2.push(`<div class="p-4 md:p-8 min-h-screen bg-gradient-to-br from-base-200/50 to-base-100"><div class="mb-8"><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"><div><h1 class="text-3xl md:text-4xl font-bold">Welcome back${escape_html(store_get($$store_subs ??= {}, "$auth", auth).user?.full_name ? `, ${store_get($$store_subs ??= {}, "$auth", auth).user.full_name}` : "")}!</h1> <p class="text-base-content/60 mt-1 text-lg flex items-center gap-2"><span class="animate-pulse">✨</span> Let's be productive today.</p></div> <div class="flex items-center gap-3"><div class="badge badge-lg badge-primary gap-2"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>${escape_html(currentTime)}</span></div></div></div></div> <div class="grid lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden"><div class="card-body p-0"><div class="bg-gradient-to-r from-error/10 to-warning/10 p-6 border-b border-base-200"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl bg-error text-error-content flex items-center justify-center shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div> <div><h2 class="card-title text-xl">Focus Timer</h2> <p class="text-base-content/60 text-sm">Stay focused, achieve more</p></div></div></div> <div class="p-6">`);
    PomodoroTimer($$renderer2);
    $$renderer2.push(`<!----></div></div></div> <div class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden"><div class="card-body p-0"><div class="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-base-200"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl bg-primary text-primary-content flex items-center justify-center shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg></div> <div><h2 class="card-title text-xl">Tasks</h2> <p class="text-base-content/60 text-sm">Organize your work</p></div></div></div> <div class="p-6">`);
    TaskList($$renderer2);
    $$renderer2.push(`<!----></div></div></div></div> <div class="space-y-6"><div class="card bg-base-100 shadow-xl border border-base-200 overflow-hidden"><div class="card-body p-0"><div class="bg-gradient-to-r from-info/10 to-success/10 p-6 border-b border-base-200"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl bg-info text-info-content flex items-center justify-center shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div> <div><h2 class="card-title text-xl">Statistics</h2> <p class="text-base-content/60 text-sm">Track your progress</p></div></div></div> <div class="p-6">`);
    StatsDashboard($$renderer2);
    $$renderer2.push(`<!----></div></div></div></div></div></div> `);
    AIAssistant($$renderer2);
    $$renderer2.push(`<!---->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
