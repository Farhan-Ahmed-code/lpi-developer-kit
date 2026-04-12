export interface SmilePhase {
  id: string;
  name: string;
  order: number;
  description: string;
  activities: string[];
  deliverables: string[];
  duration: string;
  keyQuestion: string;
}

export interface SmilePerspective {
  id: string;
  name: string;
  description: string;
  inputs: string[];
}

export interface AiJourneyStage {
  id: string;
  name: string;
  order: number;
  description: string;
  decisionMaking: string;
}

export interface KeyConcept {
  id: string;
  name: string;
  description: string;
  relatedPhases: string[];
  tags: string[];
}

export interface InteroperabilityLayer {
  id: string;
  name: string;
  description: string;
  examples: string[];
}

export type Visibility = "public" | "private";
export type Tier = "free" | "paid";

export interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  visibility: Visibility;
  tier: Tier;
  tags: string[];
  created_at: string;
  anonymized: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  challenge: string;
  approach: string;
  smilePhases: string[];
  outcome: string;
  summary: string;
  detailed: string;
  visibility: Visibility;
  tier: Tier;
  anonymized: boolean;
}

export interface SmileFramework {
  methodology: {
    name: string;
    fullName: string;
    tagline: string;
    principle: string;
    impactSequence: string[];
    author: string;
    philosophy: string;
  };
  phases: SmilePhase[];
  perspectives: SmilePerspective[];
  aiJourney: AiJourneyStage[];
  keyConcepts: KeyConcept[];
  interoperabilityLayers: InteroperabilityLayer[];
}
