import { readFileSync } from "fs";
import { join, dirname, resolve, sep } from "path";
import { fileURLToPath } from "url";
import type { SmileFramework, KnowledgeEntry, CaseStudy, Tier } from "../types.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, "..", "..", "..", "data");

const MAX_QUERY_LENGTH = 500;
const MAX_QUERY_TERMS = 50;

function loadJSON<T>(filename: string): T {
  const resolved = resolve(dataDir, filename);
  if (!resolved.startsWith(dataDir + sep) && resolved !== dataDir) {
    throw new Error("Invalid data file path — access denied");
  }
  const content = readFileSync(resolved, "utf-8");
  return JSON.parse(content) as T;
}

let smileFramework: SmileFramework | null = null;
let knowledgeBase: KnowledgeEntry[] | null = null;
let caseStudies: CaseStudy[] | null = null;

export function getSmileFramework(): SmileFramework {
  if (!smileFramework) {
    smileFramework = loadJSON<SmileFramework>("smile-framework.json");
  }
  return smileFramework;
}

export function getKnowledgeBase(): KnowledgeEntry[] {
  if (!knowledgeBase) {
    knowledgeBase = loadJSON<KnowledgeEntry[]>("knowledge-base.json");
  }
  // Sandbox: all public entries available, no tier gating
  return knowledgeBase.filter((entry) => entry.visibility === "public");
}

export function getCaseStudies(): CaseStudy[] {
  if (!caseStudies) {
    caseStudies = loadJSON<CaseStudy[]>("case-studies.json");
  }
  // Sandbox: all public entries available, no tier gating
  return caseStudies.filter((entry) => entry.visibility === "public");
}

export function searchKnowledge(query: string): KnowledgeEntry[] {
  const entries = getKnowledgeBase();
  const sanitized = query.slice(0, MAX_QUERY_LENGTH);
  const terms = sanitized.toLowerCase().split(/\s+/).slice(0, MAX_QUERY_TERMS);
  return entries
    .map((entry) => {
      const text = `${entry.title} ${entry.content} ${entry.tags.join(" ")}`.toLowerCase();
      const score = terms.reduce(
        (acc, term) => acc + (text.includes(term) ? 1 : 0),
        0
      );
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ entry }) => entry);
}

export function searchCaseStudies(query: string): CaseStudy[] {
  const cases = getCaseStudies();
  const sanitized = query.slice(0, MAX_QUERY_LENGTH);
  const terms = sanitized.toLowerCase().split(/\s+/).slice(0, MAX_QUERY_TERMS);
  return cases
    .map((cs) => {
      const text =
        `${cs.title} ${cs.industry} ${cs.challenge} ${cs.approach} ${cs.outcome} ${cs.smilePhases.join(" ")}`.toLowerCase();
      const score = terms.reduce(
        (acc, term) => acc + (text.includes(term) ? 1 : 0),
        0
      );
      return { cs, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ cs }) => cs);
}
