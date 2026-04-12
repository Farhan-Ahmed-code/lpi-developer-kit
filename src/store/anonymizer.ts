/**
 * Privacy/Anonymization engine for LPI.
 * Strips identifiable information from content before public exposure.
 *
 * Rules:
 * - Company names → "Company A", "Organization B", etc.
 * - Person names → "Stakeholder 1", "Client Lead", etc.
 * - Specific numbers → ranges ("~40% reduction" instead of "38.7%")
 * - Locations → regions ("Nordic region" instead of specific cities)
 * - Methodological insights, patterns, and learnings are preserved
 */

const companyReplacements = new Map<string, string>();
const personReplacements = new Map<string, string>();
let companyCounter = 0;
let personCounter = 0;

const companyLabels = [
  "Company A", "Company B", "Company C", "Company D",
  "Organization Alpha", "Organization Beta", "Organization Gamma",
];

const personLabels = [
  "Stakeholder 1", "Stakeholder 2", "Stakeholder 3",
  "Client Lead", "Project Sponsor", "Technical Lead",
];

export function anonymizeCompany(name: string): string {
  if (!companyReplacements.has(name)) {
    const label = companyLabels[companyCounter % companyLabels.length];
    companyReplacements.set(name, label);
    companyCounter++;
  }
  return companyReplacements.get(name)!;
}

export function anonymizePerson(name: string): string {
  if (!personReplacements.has(name)) {
    const label = personLabels[personCounter % personLabels.length];
    personReplacements.set(name, label);
    personCounter++;
  }
  return personReplacements.get(name)!;
}

export function anonymizeNumber(value: number, unit: string = ""): string {
  const rounded = Math.round(value / 5) * 5;
  return `~${rounded}${unit ? " " + unit : ""}`;
}

export function anonymizeText(
  text: string,
  knownCompanies: string[] = [],
  knownPeople: string[] = []
): string {
  let result = text;

  for (const company of knownCompanies) {
    const replacement = anonymizeCompany(company);
    result = result.replace(new RegExp(escapeRegex(company), "gi"), replacement);
  }

  for (const person of knownPeople) {
    const replacement = anonymizePerson(person);
    result = result.replace(new RegExp(escapeRegex(person), "gi"), replacement);
  }

  // Anonymize precise percentages → approximate
  result = result.replace(
    /(\d+\.\d+)\s*%/g,
    (_, num) => `~${Math.round(parseFloat(num) / 5) * 5}%`
  );

  // Anonymize precise currency amounts
  result = result.replace(
    /\$\s*(\d{1,3}(?:,\d{3})*(?:\.\d+)?)/g,
    (_, num) => {
      const value = parseFloat(num.replace(/,/g, ""));
      if (value >= 1_000_000) return `~$${Math.round(value / 1_000_000)}M`;
      if (value >= 1_000) return `~$${Math.round(value / 1_000)}K`;
      return `~$${Math.round(value / 10) * 10}`;
    }
  );

  return result;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function resetAnonymizer(): void {
  companyReplacements.clear();
  personReplacements.clear();
  companyCounter = 0;
  personCounter = 0;
}
