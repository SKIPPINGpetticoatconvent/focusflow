import { h as head } from "../../chunks/index2.js";
function _layout($$renderer, $$props) {
  let { children } = $$props;
  head("12qhfyh", $$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>FocusFlow - Smart Pomodoro Task Tracker</title>`);
    });
    $$renderer2.push(`<meta name="description" content="A powerful productivity tool combining Pomodoro technique with AI-powered task management"/>`);
  });
  children($$renderer);
  $$renderer.push(`<!---->`);
}
export {
  _layout as default
};
