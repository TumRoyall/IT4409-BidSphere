type Props = {
  direction: "in" | "out";
  size?: number;
};

export default function TransactionIcon({ direction, size = 36 }: Props) {
  const isIn = direction === "in";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: isIn ? "#E6F4EA" : "#EAF1FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <svg
        width={18}
        height={18}
        viewBox="0 0 24 24"
        fill="none"
        stroke={isIn ? "#1E7F3C" : "#2563EB"}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isIn ? (
          <path d="M4 12h16M12 4l8 8-8 8" />
        ) : (
          <path d="M20 12H4M12 4l-8 8 8 8" />
        )}
      </svg>
    </div>
  );
}
