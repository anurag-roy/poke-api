/** Minimal Pokéball mark — SVG only, no logo asset. */
export function PokeballSvg({
  size = 200,
  spin = false,
  className,
}: {
  size?: number;
  spin?: boolean;
  className?: string;
}) {
  return (
    <svg
      class={['pokeball-svg', spin ? 'is-spin' : '', className]
        .filter(Boolean)
        .join(' ')}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M100 10 A90 90 0 0 1 190 100 L100 100 Z" fill="#CC0000" />
      <path d="M10 100 A90 90 0 0 1 100 10 L100 100 Z" fill="#CC0000" />
      <path d="M100 190 A90 90 0 0 1 10 100 L100 100 Z" fill="#f5f5f5" />
      <path d="M190 100 A90 90 0 0 1 100 190 L100 100 Z" fill="#f5f5f5" />
      <rect x="10" y="93" width="180" height="14" fill="#111111" />
      <circle cx="100" cy="100" r="22" fill="#111111" />
      <circle cx="100" cy="100" r="14" fill="#1e1e1e" />
      <circle cx="100" cy="100" r="8" fill="#f5f5f5" />
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke="#111111"
        strokeWidth="4"
        fill="none"
      />
    </svg>
  );
}
