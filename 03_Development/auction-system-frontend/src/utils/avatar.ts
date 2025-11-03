import maleAvatar from "@/assets/avatars/male.png";
import femaleAvatar from "@/assets/avatars/female.png";

export const getDefaultAvatar = (gender?: string) => {
  if (!gender) return maleAvatar;
  return gender.toLowerCase() === "female" ? femaleAvatar : maleAvatar;
};

export const getAvatarUrl = (avatarUrl?: string, gender?: string) =>
  avatarUrl && avatarUrl.trim() !== ""
    ? avatarUrl
    : getDefaultAvatar(gender);
