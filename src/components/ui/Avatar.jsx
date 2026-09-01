import { useState } from 'react';
import PropTypes from 'prop-types';
import { cva } from '../../lib/cva.js';

const avatarStyles = cva(
  'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 font-display font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-200',
  {
    variants: {
      size: {
        sm: 'size-8 text-caption',
        md: 'size-11 text-body-sm',
        lg: 'size-16 text-h4',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

function initialsFrom(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

/**
 * @typedef {object} AvatarProps
 * @property {string} name - Full name; used for alt text and the initials fallback.
 * @property {string} [src] - Image URL. Falls back to initials on missing src or load error.
 * @property {'sm'|'md'|'lg'} [size] - Default 'md'.
 * @property {string} [className]
 */

/**
 * Person avatar (testimonials, About page team/founder). Shows the image
 * when `src` loads; otherwise renders initials on a brand-tinted circle —
 * never a broken-image icon.
 *
 * @param {AvatarProps} props
 */
export function Avatar({ name, src, size = 'md', className, ...props }) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <span className={avatarStyles({ size, className })} {...props}>
      {showImage ? (
        <img src={src} alt={name} className="size-full object-cover" onError={() => setErrored(true)} />
      ) : (
        <span aria-hidden="true">{initialsFrom(name)}</span>
      )}
      {!showImage && <span className="sr-only">{name}</span>}
    </span>
  );
}

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Avatar;
