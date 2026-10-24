export default function BrandMark({ className = "" }) {
  return (
    <svg
      className={`brand-symbol ${className}`}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        className="brand-frame"
        d="M13 3H35L45 13V35L35 45H13L3 35V13L13 3Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M10 13H20V29C20 36 15 38 10 34"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M36 16C33 11 25 12 25 18C25 24 37 21 37 29C37 36 29 38 25 33"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      <circle cx="39" cy="39" r="3.3" fill="var(--accent, #f28c58)" />
    </svg>
  );
}
