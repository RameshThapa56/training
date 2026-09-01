/**
 * Minimal className combinator (no npm dependency — clsx/tailwind-merge
 * aren't in the project's dependency list). Accepts strings, arrays, and
 * `{ className: boolean }` objects, flattens/filters, and joins.
 *
 * Consumers should always pass their own `className` *last* so it wins on
 * source-order specificity for any conflicting utility.
 *
 * @param {...(string | false | null | undefined | Record<string, boolean>)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  const out = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      out.push(input);
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else if (typeof input === 'object') {
      for (const key in input) {
        if (input[key]) out.push(key);
      }
    }
  }

  return out.join(' ');
}

export default cn;
