import { j as sanitize_props, k as spread_props, l as slot, d as attr, c as store_get, u as unsubscribe_stores, f as derived } from "../../../../chunks/index2.js";
import { a as auth } from "../../../../chunks/auth.js";
import { p as pomodoroStore } from "../../../../chunks/pomodoro.js";
import { I as Icon } from "../../../../chunks/Icon.js";
function Palette($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "circle",
      { "cx": "13.5", "cy": "6.5", "r": ".5", "fill": "currentColor" }
    ],
    [
      "circle",
      {
        "cx": "17.5",
        "cy": "10.5",
        "r": ".5",
        "fill": "currentColor"
      }
    ],
    [
      "circle",
      { "cx": "8.5", "cy": "7.5", "r": ".5", "fill": "currentColor" }
    ],
    [
      "circle",
      { "cx": "6.5", "cy": "12.5", "r": ".5", "fill": "currentColor" }
    ],
    [
      "path",
      {
        "d": "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "palette" },
    $$sanitized_props,
    {
      /**
       * @component @name Palette
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMy41IiBjeT0iNi41IiByPSIuNSIgZmlsbD0iY3VycmVudENvbG9yIiAvPgogIDxjaXJjbGUgY3g9IjE3LjUiIGN5PSIxMC41IiByPSIuNSIgZmlsbD0iY3VycmVudENvbG9yIiAvPgogIDxjaXJjbGUgY3g9IjguNSIgY3k9IjcuNSIgcj0iLjUiIGZpbGw9ImN1cnJlbnRDb2xvciIgLz4KICA8Y2lyY2xlIGN4PSI2LjUiIGN5PSIxMi41IiByPSIuNSIgZmlsbD0iY3VycmVudENvbG9yIiAvPgogIDxwYXRoIGQ9Ik0xMiAyQzYuNSAyIDIgNi41IDIgMTJzNC41IDEwIDEwIDEwYy45MjYgMCAxLjY0OC0uNzQ2IDEuNjQ4LTEuNjg4IDAtLjQzNy0uMTgtLjgzNS0uNDM3LTEuMTI1LS4yOS0uMjg5LS40MzgtLjY1Mi0uNDM4LTEuMTI1YTEuNjQgMS42NCAwIDAgMSAxLjY2OC0xLjY2OGgxLjk5NmMzLjA1MSAwIDUuNTU1LTIuNTAzIDUuNTU1LTUuNTU0QzIxLjk2NSA2LjAxMiAxNy40NjEgMiAxMiAyeiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/palette
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
function Timer($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["line", { "x1": "10", "x2": "14", "y1": "2", "y2": "2" }],
    ["line", { "x1": "12", "x2": "15", "y1": "14", "y2": "11" }],
    ["circle", { "cx": "12", "cy": "14", "r": "8" }]
  ];
  Icon($$renderer, spread_props([
    { name: "timer" },
    $$sanitized_props,
    {
      /**
       * @component @name Timer
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8bGluZSB4MT0iMTAiIHgyPSIxNCIgeTE9IjIiIHkyPSIyIiAvPgogIDxsaW5lIHgxPSIxMiIgeDI9IjE1IiB5MT0iMTQiIHkyPSIxMSIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjE0IiByPSI4IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/timer
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
function User($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }],
    ["circle", { "cx": "12", "cy": "7", "r": "4" }]
  ];
  Icon($$renderer, spread_props([
    { name: "user" },
    $$sanitized_props,
    {
      /**
       * @component @name User
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTkgMjF2LTJhNCA0IDAgMCAwLTQtNEg5YTQgNCAwIDAgMC00IDR2MiIgLz4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjciIHI9IjQiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/user
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
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let fullName = derived(() => store_get($$store_subs ??= {}, "$auth", auth).user?.full_name || "");
    let email = derived(() => store_get($$store_subs ??= {}, "$auth", auth).user?.email || "");
    $$renderer2.push(`<div class="p-8 max-w-3xl"><div class="mb-8"><h1 class="text-3xl font-bold">Settings</h1> <p class="text-base-content/60">Manage your account and preferences</p></div> <div class="space-y-6"><div class="card bg-base-100 shadow-xl"><div class="card-body"><div class="flex items-center gap-2">`);
    User($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----> <h2 class="card-title">Profile</h2></div> <p class="text-base-content/60">Update your account information</p> <div class="form-control"><label class="label" for="fullName"><span class="label-text">Full Name</span></label> <input id="fullName" type="text" class="input input-bordered"${attr("value", fullName())}/></div> <div class="form-control"><label class="label" for="email"><span class="label-text">Email</span></label> <input id="email" type="text" class="input input-bordered"${attr("value", email())} disabled=""/></div> <div class="card-actions justify-end mt-4"><button class="btn btn-primary">Save Changes</button></div></div></div> <div class="card bg-base-100 shadow-xl"><div class="card-body"><div class="flex items-center gap-2">`);
    Timer($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----> <h2 class="card-title">Pomodoro Settings</h2></div> <p class="text-base-content/60">Customize your timer preferences</p> <div class="grid grid-cols-3 gap-4 mt-4"><div class="form-control"><label class="label" for="workDuration"><span class="label-text">Work (min)</span></label> <input id="workDuration" type="number" min="1" max="60" class="input input-bordered"${attr("value", store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.workDuration)}/></div> <div class="form-control"><label class="label" for="shortBreak"><span class="label-text">Short Break (min)</span></label> <input id="shortBreak" type="number" min="1" max="30" class="input input-bordered"${attr("value", store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.shortBreakDuration)}/></div> <div class="form-control"><label class="label" for="longBreak"><span class="label-text">Long Break (min)</span></label> <input id="longBreak" type="number" min="1" max="60" class="input input-bordered"${attr("value", store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.longBreakDuration)}/></div></div> <div class="form-control mt-4"><label class="label" for="sessionsBeforeLongBreak"><span class="label-text">Sessions before long break</span></label> <input id="sessionsBeforeLongBreak" type="number" min="1" max="10" class="input input-bordered"${attr("value", store_get($$store_subs ??= {}, "$pomodoroStore", pomodoroStore).settings.sessionsBeforeLongBreak)}/></div></div></div> <div class="card bg-base-100 shadow-xl"><div class="card-body"><div class="flex items-center gap-2">`);
    Palette($$renderer2, { class: "w-5 h-5" });
    $$renderer2.push(`<!----> <h2 class="card-title">Appearance</h2></div> <p class="text-base-content/60">Customize the look and feel</p> <p class="text-sm text-base-content/60 mt-2">Dark mode is currently enabled by default. More themes coming soon!</p></div></div></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  _page as default
};
