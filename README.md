# LPI Developer Kit

**Build AI agents on the Life Programmable Interface.**

The LPI (Life Programmable Interface) is an open MCP server that exposes the [SMILE methodology](https://lifeatlas.online) — a benefits-driven digital twin implementation framework. This repo is your sandbox: a working MCP server with 7 read-only tools, real methodology data, and everything you need to build AI agents on top of it.

This repo also serves as the entry point for the **LifeAtlas Contributor Program**. Read on for the screening challenge and how the program works.

### Key Concepts (read this first)

- **MCP (Model Context Protocol)** — a standard way for AI agents to call tools. Think of it as a USB cable between your agent and data sources. Your agent sends a request, the MCP server sends back structured data.
- **A2A (Agent-to-Agent Protocol)** — a way for agents to discover each other and describe what they can do. Think of it as a business card your agent publishes so other agents know how to work with it.
- **LLM** — a Large Language Model (like ChatGPT, Claude, or open-source models you can run locally with Ollama).
- **Ollama** — free software that lets you run AI models on your own laptop. No cloud, no API key, no cost.
- **SMILE** — our methodology for building digital twins. The LPI server contains all the knowledge about it.

---

## Quick Start

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/Life-Atlas/lpi-developer-kit.git
cd lpi-developer-kit
npm install
npm run build
npm run test-client
```

You should see all 7 tools pass. If they do, your sandbox is ready.

**Troubleshooting:**
- If `npm install` fails on slow internet, try: `npm install --prefer-offline --no-audit`
- If `npm run build` shows TypeScript errors, check your Node version: `node --version` (must be 18+)
- On Windows, use PowerShell or Git Bash, not cmd.exe

### Available Tools

| Tool | Description |
|------|-------------|
| `smile_overview` | Full overview of the SMILE methodology — 6 phases, 3 perspectives, AI journey |
| `smile_phase_detail` | Deep dive into a specific SMILE phase |
| `query_knowledge` | Search the knowledge base (63 entries across 11 topic areas) |
| `get_case_studies` | Browse 10 anonymized case studies across 10 industries |
| `get_insights` | Get scenario-specific implementation advice |
| `list_topics` | Browse all available topics in the knowledge base |
| `get_methodology_step` | Step-by-step guidance for implementing a SMILE phase |

### Connect from Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "lpi-sandbox": {
      "command": "node",
      "args": ["<full-path-to>/lpi-developer-kit/dist/src/index.js"]
    }
  }
}
```

---

## LifeAtlas Contributor Program

### What You're Joining

LifeAtlas is building the world's first edge-native digital twin OS — a platform where AI agents help people understand and optimize their lives using the SMILE methodology (Sustainable Methodology for Impact Lifecycle Enablement).

You'll be working with the LPI — building agents, tools, and applications that plug into this server. Everything you build is a **module**: your own repo, your own code, independently testable, pluggable. Like a Linux kernel module — self-contained and composable.

**Your goal:** Build your own collection of AI agents and tools that work with the LPI. By the end of this program, you leave with a **backpack** — your personal agent toolkit, on your GitHub, that demonstrates you can build real AI systems on a real platform.

This isn't a classroom exercise. This is open-source contribution to a live product.

### How You're Evaluated

Five metrics. Weighted equally. Assessed continuously.

**1. Contribution Quality** — Does your code work? Is it clean? Small and working beats large and broken.

**2. Discussion & Collaboration** — Do you ask good questions? Do you help teammates? Do you engage?

**3. Explainability** — Can you explain what your agent does and WHY? AI that can't explain itself is AI we don't ship.

**4. Initiative** — Do you find problems and solve them, or wait to be told?

**5. Growth Velocity** — Where did you start vs. where are you now? **Someone who starts at Level 1 and ships a working agent by week 3 scores higher than someone who started at Level 3 and stayed there.** We measure trajectory, not starting point.

---

## The Screening Challenge

Complete as many levels as you can. Your highest completed level determines your starting position. **Everyone who completes Level 1 is in the program.**

**Deadline:** 7 days from receiving this.

### Level 1 — Register (5 minutes)

1. Fork this repo
2. Copy `contributors/TEMPLATE.json` to `contributors/your-name.json`
3. Fill in your details:

```json
{
  "name": "Your Full Name",
  "github": "your-github-username",
  "program": "B.Tech CSE / M.Tech AI / etc",
  "campus": "Amity Noida / Lucknow / etc",
  "skills": ["python", "pytorch", "react"],
  "interests": ["agents", "NLP", "3D", "security"],
  "my_twin": "Write something real here — see below"
}
```

**About the `my_twin` field:** There is no wrong answer. We want to know how YOU think about personal data, not what sounds impressive. Bad answer: "I would track my CGPA." Good answer: "I would track my energy levels throughout the day and correlate them with what I ate and how I slept, because I crash every afternoon and don't know why." Be specific. Be personal. This is the most interesting field in the form.

4. Submit a PR. Title: `level-1: Your Name`

**That's it. You're registered.**

### Level 2 — Run the Stack (45-90 minutes, depending on your internet)

Two tasks. Both must work.

**Task A — Run the LPI Sandbox:**

```bash
git clone <your-fork>
cd lpi-developer-kit
npm install
npm run build
npm run test-client
```

Capture the output showing all tools pass.

**Task B — Run a Local LLM:**

1. Install [Ollama](https://ollama.com)
2. Pull a model that fits your hardware:
   - **8GB+ RAM:** `ollama pull qwen2.5:1.5b` (recommended, ~1.2GB)
   - **4-6GB RAM:** `ollama pull smollm:360m` (lighter, still works)
   - **Low RAM:** `ollama pull smollm:135m` (minimal, runs anywhere)
3. Test it: `ollama run qwen2.5:1.5b "What is a digital twin in one paragraph?"`
4. Note: local LLMs run on your CPU and may take 30-90 seconds to respond. This is normal.

**Submit:** Create `submissions/your-name/level2.md` with:
- Output from the test client (copy-paste the terminal output)
- Output from your local LLM query
- The model you chose and why (including your RAM — this helps us understand hardware constraints)
- 3 sentences: what surprised you about the SMILE methodology?

PR title: `level-2: Your Name`

### Level 3 — Build Your First Agent (2-4 hours)

Build an AI agent that uses **both** the LPI sandbox **and** an LLM (local via Ollama, or any cloud API) together.

Your agent must:
1. Accept a user question or input
2. Query at least 2 LPI tools to get relevant knowledge
3. Pass that knowledge to an LLM as context
4. Return a response that **cites which LPI tools and data it used** — this is explainable AI: the user can trace where every part of the answer came from

Use any language or framework: raw API calls, LangChain, CrewAI, Anthropic SDK, OpenAI SDK, or just Python with `requests`. Your choice.

A working example is in `examples/agent.py` — use it as a starting point or build from scratch. The example connects to the LPI via subprocess, calls 3 tools, and passes results to Ollama. You can copy it, modify it, or rewrite it entirely.

**Submit:** Create your agent as a **separate GitHub repo** (not a PR to this one). Add a link to it in `submissions/your-name/level3.md` along with:
- What your agent does (2-3 sentences)
- Which LPI tools it uses and why
- How to run it (setup instructions that actually work — test them yourself)
- A sample interaction showing the explainability (which sources the answer came from)

PR title: `level-3: Your Name`

**Optional bonus:** Include an A2A Agent Card (`agent.json`) describing your agent's capabilities. See `submissions/AGENT_CARD_TEMPLATE.json` for the format. This is not required but demonstrates you understand how agents discover each other.

### What We're Looking For

| | Level 1 | Level 2 | Level 3 |
|---|---|---|---|
| **Time** | 5 min | 45-90 min | 2-4 hours |
| **Proves** | Git basics, follow instructions | Dev setup, local AI, reading comprehension | Independent building, agent design, explainability |
| **Key signal** | The `my_twin` answer shows how you think | Model choice + SMILE reflection shows curiosity | Does it work? Can it explain itself? |

---

## How the Program Works

### The Principle

Everything you build is a **module**. Your own repo, your own code, plugging into the LPI. You don't edit our core platform. You build on top of it. By the end of this program, you will have built a **personal backpack of AI agents** — tools that connect to real data, use real methodology, and produce explainable results. This is your portfolio. It goes on your GitHub. It's yours.

### Daily Standups

Every working day. **Camera on. Be prepared. Be on time.**

This is where you learn the most. You will be in active discussions with your team. Come ready to:
- Show what you built (screen share)
- Explain what you're working on
- Ask for help or offer help to teammates

Don't worry about having something perfect to show — showing a broken build and asking for help is more valuable than sitting silent. The point is engagement, not perfection.

If you prefer written communication, async written updates are accepted — but you must still attend and listen. The learning happens in the discussion.

### Weekly Rhythm

| Day | Activity |
|---|---|
| Mon-Thu | Build. Daily standup with your team. |
| Friday | **Demo + Learning** — team demos what shipped that week. We share cutting-edge developments in AI agents, MCP, open-source LLMs, explainable AI, and edge computing. This is your window into what the industry is building right now. |

### Assessment (Weeks 1-2)

After the first 1-2 weeks of contribution, we reassess:
- What have you actually shipped?
- What skills are emerging?
- What do YOU want to go deeper on?

You'll move into a focus team based on your performance and your preference. We want you where you're most effective AND most excited.

### Focus Teams

Teams form after the initial assessment:

- **Agent Builders** — build AI agents on the LPI using local and cloud LLMs
- **AI/ML Pipeline** — RAG, embeddings, fine-tuning, model evaluation
- **Research & Content** — SMILE documentation, case studies, course materials
- **QA & Security** — break things, find vulnerabilities, write test suites
- **Data & Knowledge** — knowledge graphs, data pipelines, analytics
- **3D & Visualization** — spatial twins, Unreal Engine *(separate brief)*

### What You Get

- Real AI agent development experience on a production platform
- Published open-source work on YOUR GitHub — your name, your code, your portfolio
- Your personal **agent backpack** — a collection of working tools you built
- Experience with cutting-edge tooling: MCP protocol, open-source LLMs, explainable AI, edge-native architecture
- Weekly exposure to industry-current AI developments — not textbook material
- Letter of recommendation based on your actual contributions

### What We Expect

- **Show up.** Daily standups, on time, camera on.
- **Ship.** Working code, every week. Small is fine. Broken is not.
- **Explain.** If you can't explain what your agent does and why, it's not done.
- **Collaborate.** This is a team sport. Help others. Ask for help.
- **Own your work.** Your repos, your commits, your `Signed-off-by`. Every contribution has your name on it.

---

## How MCP and A2A Work Together

This developer kit uses two complementary protocols:

- **MCP (Model Context Protocol)** is a tool-calling protocol. It defines how your agent invokes a specific tool: "call `query_knowledge` with query='digital twins'". MCP handles execution — input, output, streaming. Think of it as the USB cable between devices.

- **A2A (Agent-to-Agent Protocol)** is a discovery and task-routing protocol. It defines how agents find each other and describe what they can do. Think of it as the business card you exchange before plugging in the cable.

In this developer kit:
1. The **LPI server** publishes an A2A Agent Card (`.well-known/agent.json`) describing its 7 tools as skills.
2. **Your agent** can also publish an Agent Card describing what it does.
3. **Execution** happens over MCP (subprocess/stdio locally). A2A tells you what exists; MCP lets you use it.

```
Discovery:   A2A Agent Card  →  "What can you do?"
Execution:   MCP Protocol    →  "Do this specific thing."
```

## Example Agent

An example Python agent is included in `examples/agent.py`. It demonstrates:
- Connecting to the LPI MCP server via subprocess
- Calling 3 LPI tools to gather context
- Passing results to a local LLM (Ollama) with a provenance-tracking prompt
- Returning an explainable answer that cites which tools provided which information

```bash
# Prerequisites: npm run build, ollama serve, ollama pull qwen2.5:1.5b
pip install requests
python examples/agent.py "What is the SMILE methodology and how do I start?"
```

Use this as a starting point for your Level 3 submission. Extend it, replace it, or build something completely different — as long as it uses LPI tools and explains itself.

---

## Resources

- [MCP Protocol Specification](https://modelcontextprotocol.io)
- [A2A Protocol Specification](https://a2a-protocol.org)
- [Ollama — Run LLMs locally](https://ollama.com)
- [SMILE Methodology](https://lifeatlas.online)
- [LifeAtlas on GitHub](https://github.com/Life-Atlas)

## License

MIT — build whatever you want on top of this.
