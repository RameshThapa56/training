import { useState } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from './Skeleton.jsx';
import { cn } from '../../lib/cn.js';

/**
 * @typedef {object} ImageWithSkeletonProps
 * @property {string} src
 * @property {string} alt
 * @property {string} [className] - Applied to the `<img>` itself (e.g. 'size-full object-cover').
 * @property {string} [wrapperClassName]
 */

/**
 * Async-image loading state (see skills/motion-system/SKILL.md — "Skeleton/
 * placeholder loading states for async content... instead of blank flashes"),
 * for the one place in the current site that loads a real, potentially-slow
 * `<img>` from a URL: `BeforeAfterSlider`'s before/after photos, whenever a
 * project supplies one. Everywhere else today (project cards, blog post
 * tiles) renders a CSS gradient + icon placeholder synchronously — nothing
 * to visibly pop in yet — so this is the ready-to-reuse primitive for when
 * real project photography or blog cover images land in a later phase.
 *
 * Shows a `Skeleton` in place of the image until it finishes loading (or
 * immediately resolves for a cached image, since `<img>`'s `complete` flag
 * only matters before React attaches the listener — the `onLoad` still
 * fires for cached images on mount in every evergreen browser). The image
 * itself cross-fades in rather than popping, but respects
 * `prefers-reduced-motion` by skipping the transition, per Skeleton's own
 * `motion-reduce:animate-none` pulse.
 *
 * @param {ImageWithSkeletonProps & Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'className'>} props
 */
export function ImageWithSkeleton({ src, alt, className, wrapperClassName, loading = 'lazy', decoding = 'async', ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span className={cn('relative block size-full overflow-hidden', wrapperClassName)}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <img
        src={src}
        alt={alt}
        // Deferred, off-main-thread decode by default — every real project
        // photo this'll eventually render is below the fold (case-study
        // execution beat, before/after slider), never a hero/LCP image, so
        // lazy-loading is safe here without a per-call override. Both are
        // still overridable via props for the one future case (a real hero
        // photo) that would need eager loading instead.
        loading={loading}
        decoding={decoding}
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-300 ease-out motion-reduce:transition-none',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...props}
      />
    </span>
  );
}

ImageWithSkeleton.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  decoding: PropTypes.oneOf(['async', 'sync', 'auto']),
};

export default ImageWithSkeleton;
