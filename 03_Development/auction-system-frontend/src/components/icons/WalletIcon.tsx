export default function WalletIcon({
  size = 22,
  color = "currentColor"
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="16" width="56" height="36" rx="6" />
      <path d="M44 32h16v8H44z" />
      <path d="M8 16l12-12h28l8 12" />
    </svg>
  );
}

