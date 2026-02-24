export type Project = {
  title: string;
  summary: string;
  details: string[];
  stack: string[];
  link: string;
};

export type CuratedPost = {
  title: string;
  author: string;
  note: string;
  link: string;
};

export const featuredProjects: Project[] = [
  {
    title: "Marketing Workbench",
    summary:
      "Agentic marketing workflow platform built with Gemini models and Vertex AI Agent Development Kit, scaled from a 30-user pilot to 1,300 users.",
    details: [
      "Designed a multi-agent workflow for campaign planning, content generation, and approval routing.",
      "Partnered with product and technology stakeholders to define pilot scope, adoption criteria, and rollout plan.",
      "Supported deployment decisions that balanced performance, cost, and governance for enterprise usage.",
    ],
    stack: ["Gemini", "Vertex AI", "TypeScript", "Cloud Architecture"],
    link: "#",
  },
  {
    title: "IT Helpdesk Agent System",
    summary:
      "Support agents integrated with ServiceNow and OpenAI Agents SDK to automate service workflows and internal content generation.",
    details: [
      "Implemented task-specific agents to triage requests, generate draft responses, and route complex cases.",
      "Integrated with existing ITSM workflows to reduce manual workload while maintaining auditability.",
      "Focused on secure deployment patterns and practical handoff to technical support teams.",
    ],
    stack: ["OpenAI Agents SDK", "ServiceNow", "Azure", "Python"],
    link: "#",
  },
  {
    title: "Proposal Automation Tool",
    summary:
      "Generative AI workflow for RFP drafting that reduced proposal turnaround time by 60% while improving output quality.",
    details: [
      "Built template-aware generation workflows to produce structured first drafts from internal context.",
      "Added review checkpoints so teams could refine outputs before final submission.",
      "Measured operational impact across cycle-time reduction, consistency, and proposal quality outcomes.",
    ],
    stack: ["LLMs", "Prompt Engineering", "Workflow Automation"],
    link: "#",
  },
];

export const substack = {
  publicationUrl: "https://substack.com/@eugenecho",
  feedUrl: "https://eugenecho.substack.com/feed",
  curatedPosts: [
    {
      title: "THE 2028 GLOBAL INTELLIGENCE CRISIS",
      author: "Citrini Research",
      note: "Macro/market perspective piece I recommend reading.",
      link: "https://www.citriniresearch.com/p/2028gic",
    },
    {
      title: "Head of Claude Code: What happens after coding is solved | Boris Cherny",
      author: "Lenny's Newsletter",
      note: "Strong operator-focused discussion on AI product and execution.",
      link: "https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens",
    },
    {
      title: "How to do AI analysis you can actually trust",
      author: "Lenny's Newsletter",
      note: "Practical guidance for evaluating AI use cases with real business value.",
      link: "https://www.lennysnewsletter.com/p/how-to-do-ai-analysis-you-can-actually",
    },
  ] satisfies CuratedPost[],
};

export const companies = [
  { name: "Deloitte", link: "https://www.deloitte.com" },
  { name: "Guidehouse", link: "https://www.guidehouse.com" },
  { name: "DC Energy", link: "https://www.dc-energy.com" },
];
