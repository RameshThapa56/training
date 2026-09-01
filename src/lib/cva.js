import { cn } from './cn.js';

/**
 * Tiny local re-implementation of the `class-variance-authority` pattern
 * referenced in skills/react19-component-architecture/SKILL.md ("a
 * `cva`-style class-variance function, not scattered conditional class
 * strings"). Not the npm package — this project doesn't depend on it — but
 * the same shape: `cva(base, { variants, defaultVariants, compoundVariants })`
 * returns a function that resolves a prop bag to a class string.
 *
 * @typedef {Record<string, Record<string, string>>} VariantMap
 *
 * @param {string} base - Classes applied unconditionally.
 * @param {object} [config]
 * @param {VariantMap} [config.variants] - variant name -> { value: classes }.
 * @param {Record<string, string>} [config.defaultVariants] - variant name -> default value.
 * @param {Array<Record<string, string> & { class: string }>} [config.compoundVariants] -
 *   extra classes applied when every listed variant matches the given value.
 * @returns {(props?: Record<string, any> & { className?: string }) => string}
 */
export function cva(base, config = {}) {
  const { variants = {}, defaultVariants = {}, compoundVariants = [] } = config;

  return (props = {}) => {
    const resolved = { ...defaultVariants, ...props };
    const classes = [base];

    for (const variantName in variants) {
      const value = resolved[variantName];
      const variantClasses = value != null ? variants[variantName][value] : undefined;
      if (variantClasses) classes.push(variantClasses);
    }

    for (const compound of compoundVariants) {
      const { class: compoundClass, ...conditions } = compound;
      const matches = Object.entries(conditions).every(([key, value]) => resolved[key] === value);
      if (matches) classes.push(compoundClass);
    }

    return cn(...classes, props.className);
  };
}

export default cva;
