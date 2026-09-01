import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../lib/cn.js';
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton.jsx';

const STEP = 5;

/**
 * @typedef {object} BeforeAfterSide
 * @property {string} label - e.g. "Before"
 * @property {string} caption
 * @property {string} [image] - Photo URL. Falls back to a labeled gradient placeholder.
 *
 * @typedef {object} BeforeAfterSliderProps
 * @property {BeforeAfterSide} before
 * @property {BeforeAfterSide} after
 * @property {string} [className]
 */

/**
 * @param {{ side: BeforeAfterSide, tone: 'before'|'after' }} props
 */
function SideVisual({ side, tone }) {
  return side.image ? (
    <ImageWithSkeleton
      src={side.image}
      alt=""
      draggable={false}
      className="size-full object-cover"
    />
  ) : (
    <div
      className={cn(
        'flex size-full items-center justify-center bg-gradient-to-br',
        tone === 'before' ? 'from-neutral-700 via-neutral-600 to-neutral-500' : 'from-brand-700 via-brand-600 to-accent-600',
      )}
    >
      <span className="text-caption font-medium uppercase tracking-wide text-white/70">Placeholder photo</span>
    </div>
  );
}

SideVisual.propTypes = {
  side: PropTypes.shape({ image: PropTypes.string }).isRequired,
  tone: PropTypes.oneOf(['before', 'after']).isRequired,
};

/**
 * Draggable, keyboard-operable before/after comparison. Reveals `before` on
 * the left and `after` on the right of a vertical divider the visitor can
 * drag (pointer) or move with the Left/Right arrow keys (and Home/End for
 * the extremes) while the divider handle has focus — per
 * `skills/motion-system/SKILL.md`'s "before/after slider component
 * (draggable, keyboard-operable)" pattern.
 *
 * No real project photography exists in the brief yet (see
 * `src/content/caseStudies.js`), so `before`/`after` render a clearly
 * labeled gradient placeholder unless an `image` URL is supplied.
 *
 * @param {BeforeAfterSliderProps} props
 */
export function BeforeAfterSlider({ before, after, className }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = (clientX - rect.left) / rect.width;
    setPosition(Math.min(100, Math.max(0, Math.round(ratio * 100))));
  }, []);

  function handlePointerDown(event) {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  }

  function handlePointerMove(event) {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  }

  function handlePointerUp(event) {
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  function handleKeyDown(event) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        event.preventDefault();
        setPosition((value) => Math.max(0, value - STEP));
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        event.preventDefault();
        setPosition((value) => Math.min(100, value + STEP));
        break;
      case 'Home':
        event.preventDefault();
        setPosition(0);
        break;
      case 'End':
        event.preventDefault();
        setPosition(100);
        break;
      default:
        break;
    }
  }

  return (
    <div className={cn('select-none', className)}>
      <div
        ref={containerRef}
        className="relative aspect-video overflow-hidden rounded-lg border border-border bg-surface-sunken"
        onPointerMove={handlePointerMove}
      >
        {/* "After" fills the whole frame; "before" sits on top, clipped to the handle position. */}
        <div className="absolute inset-0">
          <SideVisual side={after} tone="after" />
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <SideVisual side={before} tone="before" />
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-neutral-950/60 px-2.5 py-1 text-caption font-medium text-white backdrop-blur-sm">
          {before.label}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-neutral-950/60 px-2.5 py-1 text-caption font-medium text-white backdrop-blur-sm">
          {after.label}
        </span>

        {/* Divider + drag handle. The handle itself is the accessible slider control. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/80 transition-[left] duration-150 ease-out motion-reduce:transition-none"
          style={{ left: `${position}%` }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Comparison position between ${before.label.toLowerCase()} and ${after.label.toLowerCase()}`}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={position}
          aria-valuetext={`${position}% ${after.label.toLowerCase()}`}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onKeyDown={handleKeyDown}
          style={{ left: `${position}%` }}
          className={cn(
            'absolute top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center',
            'rounded-full border border-white/60 bg-surface-elevated shadow-lg',
            'transition-[left] duration-150 ease-out motion-reduce:transition-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          )}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-4 text-fg">
            <path
              d="M8 7 4 12l4 5M16 7l4 5-4 5"
              stroke="currentColor"
              strokeWidth={1.75}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="mt-3 grid gap-2 text-body-sm text-fg-muted sm:grid-cols-2">
        <p>
          <span className="font-medium text-fg">{before.label}: </span>
          {before.caption}
        </p>
        <p>
          <span className="font-medium text-fg">{after.label}: </span>
          {after.caption}
        </p>
      </div>
    </div>
  );
}

BeforeAfterSlider.propTypes = {
  before: PropTypes.shape({
    label: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  after: PropTypes.shape({
    label: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
};

export default BeforeAfterSlider;
