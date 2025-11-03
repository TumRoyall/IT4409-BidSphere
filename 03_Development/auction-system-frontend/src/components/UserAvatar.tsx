import { getAvatarUrl } from "@/utils/avatar";

interface Props {
  avatarUrl?: string;
  gender?: string; // "male" | "female"
  size?: number;
}

export default function UserAvatar({ avatarUrl, gender, size = 42 }: Props) {
  const src = getAvatarUrl(avatarUrl, gender);
  return (
    <img
      src={src}
      alt="User Avatar"
      width={size}
      height={size}
      className="rounded-full object-cover border border-gray-300"
    />
  );
}
