import type { AI_TASK_SUGGESTION, TaskPriority } from "../types";

const TASK_TEMPLATES = [
  {
    title: "Research and gather information",
    priority: "medium" as TaskPriority,
    pomodoros: 2,
  },
  {
    title: "Create initial draft",
    priority: "medium" as TaskPriority,
    pomodoros: 3,
  },
  {
    title: "Review and refine content",
    priority: "high" as TaskPriority,
    pomodoros: 2,
  },
  {
    title: "Finalize and complete",
    priority: "high" as TaskPriority,
    pomodoros: 1,
  },
  {
    title: "Test and validate results",
    priority: "medium" as TaskPriority,
    pomodoros: 2,
  },
  {
    title: "Document the process",
    priority: "low" as TaskPriority,
    pomodoros: 1,
  },
  {
    title: "Prepare presentation",
    priority: "medium" as TaskPriority,
    pomodoros: 2,
  },
  { title: "Gather feedback", priority: "low" as TaskPriority, pomodoros: 1 },
  {
    title: "Implement improvements",
    priority: "high" as TaskPriority,
    pomodoros: 2,
  },
  {
    title: "Deploy to production",
    priority: "urgent" as TaskPriority,
    pomodoros: 1,
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateAITasks(
  prompt: string,
): Promise<AI_TASK_SUGGESTION[]> {
  await delay(1500);

  const keywords = prompt.toLowerCase();
  const suggestions: AI_TASK_SUGGESTION[] = [];

  const selectedTemplates = [...TASK_TEMPLATES]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  selectedTemplates.forEach((template, index) => {
    suggestions.push({
      title: `${template.title} - ${prompt.split(" ").slice(0, 3).join(" ")}`,
      priority: template.priority,
      estimatedPomodoros: template.pomodoros,
      reason: `AI suggests this task based on your input. Estimated focus time: ${template.pomodoros * 25} minutes.`,
    });
  });

  if (keywords.includes("code") || keywords.includes("programming")) {
    suggestions.push({
      title: "Write unit tests",
      priority: "high",
      estimatedPomodoros: 2,
      reason: "Testing is important for code quality",
    });
  }

  if (keywords.includes("design") || keywords.includes("ui")) {
    suggestions.push({
      title: "Review design mockups",
      priority: "medium",
      estimatedPomodoros: 1,
      reason: "Ensure design meets requirements",
    });
  }

  return suggestions.slice(0, 5);
}

export async function getAIChatResponse(message: string): Promise<string> {
  await delay(1000);

  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("focus") || lowerMessage.includes("concentrate")) {
    return "Here are some tips for better focus:\n\n1. **Start with a clean workspace** - Remove distractions\n2. **Use the Pomodoro Technique** - 25 min work, 5 min break\n3. **Break large tasks** - Divide into smaller, manageable chunks\n4. **Stay hydrated** - Drink water regularly\n5. **Take real breaks** - Step away from your screen";
  }

  if (
    lowerMessage.includes("productivity") ||
    lowerMessage.includes("efficient")
  ) {
    return "Boost your productivity with these strategies:\n\n1. **Time blocking** - Schedule specific times for tasks\n2. **Eat the frog** - Do the hardest task first\n3. **Two-minute rule** - If it takes <2 min, do it now\n4. **Weekly review** - Plan your week every Sunday\n5. **Limit meetings** - Protect your focus time";
  }

  if (lowerMessage.includes("break") || lowerMessage.includes("rest")) {
    return "Great question! Here are healthy break ideas:\n\n- **Stretch** - Stand up and stretch your muscles\n- **Walk** - Take a short walk around\n- **Deep breathe** - 5 deep breaths\n- **Look away** - Rest your eyes from the screen\n- **Hydrate** - Get some water\n\nRemember: Breaks improve focus!";
  }

  const responses = [
    "That's a great question! Let me help you with that. First, try breaking it down into smaller tasks.",
    "I understand what you're looking for. Here are some suggestions to get you started.",
    "Great thinking! Let me provide some guidance on this.",
    "I'd recommend starting with a clear plan. Let me help you structure your approach.",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}
