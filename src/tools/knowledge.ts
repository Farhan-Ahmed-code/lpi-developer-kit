import {
  searchKnowledge,
} from "../store/knowledge-store.js";

export function queryKnowledge(query: string): string {
  const results = searchKnowledge(query);

  if (results.length === 0) {
    return `No knowledge entries found matching your query. Try broader terms or different keywords.\n\nAvailable tags include: methodology, strategy, sustainability, smart-buildings, manufacturing, healthcare, energy, maritime, ontology, AI, interoperability, edge, architecture, failure-modes, security, standards.`;
  }

  const entries = results
    .slice(0, 5)
    .map(
      (entry) =>
        `## ${entry.title}\n\n${entry.content}\n\n*Tags: ${entry.tags.join(", ")}*`
    )
    .join("\n\n---\n\n");

  return `# Knowledge Results\n\n${results.length} entries found (showing top ${Math.min(results.length, 5)}):\n\n${entries}`;
}

export function getInsights(scenario: string): string {
  const relevantKnowledge = searchKnowledge(scenario);
  const knowledgeContext =
    relevantKnowledge.length > 0
      ? relevantKnowledge
          .slice(0, 5)
          .map((k) => `- **${k.title}**: ${k.content.slice(0, 200)}...`)
          .join("\n")
      : "No directly matching knowledge found. Try different keywords.";

  return `# Implementation Insights

## Relevant Knowledge
${knowledgeContext}

## SMILE Recommendation
Based on the SMILE methodology, follow the Impact-First approach:

1. **Start with Impact**: What specific outcome do you want? Define measurable KPIs before touching data.
2. **Map the Ecosystem**: Use Reality Canvas to establish spatial-temporal context and stakeholder mapping.
3. **Define MVT**: What is the smallest twin that proves value? Validate virtually before physical deployment.
4. **Build Ontologies First**: Create the semantic foundation before deploying AI — ontology factories before AI factories.
5. **Edge-Native Architecture**: Deploy intelligence where data is generated, not in a distant cloud.

## Common Pitfalls
- Starting with data collection instead of impact definition
- Technical interoperability without semantic/organizational alignment
- Vendor lock-in through proprietary platforms
- Ignoring the human/organizational actors in the ecosystem

Use \`query_knowledge\` with specific topics to go deeper on any of these areas.
`;
}
