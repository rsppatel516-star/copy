import type { Practical } from '../types/practical';
import type { Subject } from '../types/subject';
import { subjects } from '../data/subjects';
import { subject1Practicals } from '../data/subject-1';
import { subject2Practicals } from '../data/subject-2';
import { subject3Practicals } from '../data/subject-3';
import { subject4Practicals } from '../data/subject-4';

// ─── Data Registry ───────────────────────────────────────────────────────────
// To add a new subject, add its practicals mapping here.
const practicalRegistry: Record<string, Practical[]> = {
  'subject-1': subject1Practicals,
  'subject-2': subject2Practicals,
  'subject-3': subject3Practicals,
  'subject-4': subject4Practicals,
};

// ─── Subject Utilities ────────────────────────────────────────────────────────
export function getSubjectBySlug(slug: string): Subject | undefined {
  return subjects.find((s) => s.slug === slug);
}

export function getSubjectById(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getAllSubjectsWithCount(): Subject[] {
  return subjects.map((subject) => ({
    ...subject,
    practicalCount: (practicalRegistry[subject.id] ?? []).length,
  }));
}

// ─── Practical Utilities ──────────────────────────────────────────────────────
export function getPracticalsBySubject(subjectId: string): Practical[] {
  return practicalRegistry[subjectId] ?? [];
}

export function getPracticalById(
  subjectId: string,
  practicalId: string,
): Practical | undefined {
  const practicals = getPracticalsBySubject(subjectId);
  return practicals.find((p) => p.id === practicalId);
}

export function getAdjacentPracticals(
  subjectId: string,
  practicalId: string,
): { prev: Practical | null; next: Practical | null } {
  const practicals = getPracticalsBySubject(subjectId);
  const index = practicals.findIndex((p) => p.id === practicalId);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? practicals[index - 1] : null,
    next: index < practicals.length - 1 ? practicals[index + 1] : null,
  };
}

// ─── Global Search ────────────────────────────────────────────────────────────
export interface SearchResult {
  subject: Subject;
  practical: Practical;
}

export function searchAllPracticals(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase();
  const results: SearchResult[] = [];

  subjects.forEach((subject) => {
    const practicals = getPracticalsBySubject(subject.id);
    practicals.forEach((practical) => {
      const matches =
        practical.title.toLowerCase().includes(q) ||
        String(practical.number).includes(q) ||
        practical.language.toLowerCase().includes(q) ||
        practical.aim.toLowerCase().includes(q) ||
        practical.theory.toLowerCase().includes(q);

      if (matches) {
        results.push({ subject, practical });
      }
    });
  });

  return results;
}
