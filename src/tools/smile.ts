import { getSmileFramework } from "../store/knowledge-store.js";

export function smileOverview(): string {
  const fw = getSmileFramework();
  const phases = fw.phases
    .map(
      (p) =>
        `${p.order}. **${p.name}** (${p.duration})\n   ${p.description.split(".")[0]}.`
    )
    .join("\n\n");

  const perspectives = fw.perspectives
    .map((p) => `- **${p.name}**: ${p.description.split(".")[0]}.`)
    .join("\n");

  const aiStages = fw.aiJourney
    .map((s) => `${s.order}. ${s.name} → ${s.decisionMaking}`)
    .join("\n");

  return `# ${fw.methodology.name} — ${fw.methodology.fullName}

> ${fw.methodology.tagline}

## Core Principle
${fw.methodology.principle}

## Philosophy
${fw.methodology.philosophy}

## Impact Sequence
${fw.methodology.impactSequence.join(" → ")}

---

## The 6 Phases

${phases}

---

## Three Perspectives
${perspectives}

---

## AI Journey
${aiStages}
`;
}

export function smilePhaseDetail(phaseId: string): string | null {
  const fw = getSmileFramework();
  const phase = fw.phases.find(
    (p) => p.id === phaseId || p.name.toLowerCase() === phaseId.toLowerCase()
  );

  if (!phase) {
    const available = fw.phases.map((p) => `- ${p.id}: ${p.name}`).join("\n");
    return `Phase "${phaseId}" not found. Available phases:\n${available}`;
  }

  const concepts = fw.keyConcepts.filter((c) =>
    c.relatedPhases.includes(phase.id)
  );

  const conceptsSection =
    concepts.length > 0
      ? `## Related Key Concepts\n${concepts.map((c) => `- **${c.name}**: ${c.description.split(".")[0]}.`).join("\n")}`
      : "";

  return `# Phase ${phase.order}: ${phase.name}

## Duration
${phase.duration}

## Description
${phase.description}

## Key Question
> ${phase.keyQuestion}

## Activities
${phase.activities.map((a) => `- ${a}`).join("\n")}

## Deliverables
${phase.deliverables.map((d) => `- ${d}`).join("\n")}

${conceptsSection}
`;
}

export function listTopics(): string {
  const fw = getSmileFramework();

  const phaseTopics = fw.phases
    .map((p) => `- **${p.name}** (Phase ${p.order})`)
    .join("\n");

  const conceptTopics = fw.keyConcepts
    .map((c) => `- **${c.name}**: ${c.tags.join(", ")}`)
    .join("\n");

  const perspectiveTopics = fw.perspectives
    .map((p) => `- **${p.name}**`)
    .join("\n");

  return `# Available LPI Topics

## SMILE Phases
${phaseTopics}

## Key Concepts
${conceptTopics}

## Perspectives
${perspectiveTopics}

## AI Journey Stages
${fw.aiJourney.map((s) => `- **${s.name}**`).join("\n")}

## Interoperability Layers
${fw.interoperabilityLayers.map((l) => `- **${l.name}**`).join("\n")}

---
Use \`smile_phase_detail\` with a phase ID for deep dives.
Use \`query_knowledge\` to search across all knowledge.
`;
}
