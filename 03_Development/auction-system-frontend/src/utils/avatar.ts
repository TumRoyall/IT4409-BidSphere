import maleAvatar from "@/assets/avatars/male.png";
import femaleAvatar from "@/assets/avatars/female.png";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";
// Remove trailing /api to point to the real asset host (static files are not under /api)
const assetBaseUrl = apiBaseUrl.replace(/\/api\/?$/, "");

const toAbsoluteUrl = (url: string): string => {
  if (/^https?:\/\//i.test(url)) return url; // already absolute

  const base = assetBaseUrl || (typeof window !== "undefined" ? window.location.origin : "");
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return base ? `${base}${normalizedPath}` : normalizedPath;
};

export const getDefaultAvatar = (gender?: string) => {
  if (!gender) return maleAvatar;
  return gender.toLowerCase() === "female" ? femaleAvatar : maleAvatar;
};

export const getAvatarUrl = (avatarUrl?: string, gender?: string) => {
  if (avatarUrl && avatarUrl.trim() !== "") {
    return toAbsoluteUrl(avatarUrl.trim());
  }
  return getDefaultAvatar(gender);
};
