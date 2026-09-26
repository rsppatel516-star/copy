import type { Practical } from '../types/practical';

export function searchPracticals(practicals: Practical[], query: string): Practical[] {
  if (!query.trim()) return practicals;

  const q = query.toLowerCase();

  return practicals.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      String(p.number).includes(q) ||
      p.language.toLowerCase().includes(q) ||
      p.aim.toLowerCase().includes(q) ||
      p.theory.toLowerCase().includes(q),
  );
}
