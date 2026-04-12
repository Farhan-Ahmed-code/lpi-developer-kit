import {
  getCaseStudies,
  searchCaseStudies,
} from "../store/knowledge-store.js";

export function listCaseStudies(): string {
  const cases = getCaseStudies();

  if (cases.length === 0) {
    return "No case studies available.";
  }

  const list = cases
    .map(
      (cs) =>
        `- **${cs.title}** (${cs.industry})\n  ${cs.summary}\n  *SMILE Phases: ${cs.smilePhases.join(", ")}*`
    )
    .join("\n\n");

  return `# Case Studies\n\n${cases.length} available:\n\n${list}\n\n---\nUse \`get_case_studies\` with a query to search by industry or topic.`;
}

export function getCaseStudyDetails(query: string): string {
  const results = searchCaseStudies(query);

  if (results.length === 0) {
    const allCases = getCaseStudies();
    const available = allCases
      .map((cs) => `- ${cs.title} (${cs.industry})`)
      .join("\n");
    return `No case studies found matching your query.\n\nAvailable cases:\n${available}`;
  }

  const entries = results
    .map((cs) => {
      return `## ${cs.title}

**Industry**: ${cs.industry}

### Challenge
${cs.challenge}

### Approach (SMILE Phases: ${cs.smilePhases.join(", ")})
${cs.approach}

### Outcome
${cs.outcome}

### Detailed Analysis
${cs.detailed}`;
    })
    .join("\n\n---\n\n");

  return `# Case Study Results\n\n${entries}`;
}
