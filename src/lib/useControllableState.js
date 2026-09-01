import { useCallback, useState } from 'react';

/**
 * Backs a controlled-or-uncontrolled prop pair (`value`/`onValueChange` vs.
 * `defaultValue`), the pattern Tabs/Accordion both need. Mirrors the shape
 * Radix-style headless primitives use, without pulling in a dependency.
 *
 * @template T
 * @param {object} args
 * @param {T} [args.value] - Controlled value; if provided, the hook never
 *   manages its own state and just proxies reads/writes through the caller.
 * @param {T} [args.defaultValue] - Initial value when uncontrolled.
 * @param {(value: T) => void} [args.onChange]
 * @returns {[T, (value: T) => void]}
 */
export function useControllableState({ value, defaultValue, onChange }) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : uncontrolled;

  const setValue = useCallback(
    (next) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, setValue];
}

export default useControllableState;
