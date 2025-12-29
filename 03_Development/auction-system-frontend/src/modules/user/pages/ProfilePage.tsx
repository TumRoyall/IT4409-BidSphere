import { useEffect, useState, useRef } from "react";
import { userApi } from "@/api/modules/user.api";
import { getAvatarUrl } from "@/utils/avatar";
import { useAuthContext } from "@/contexts/AuthContext";
import "@/modules/user/styles/ProfilePage.css";

export default function ProfilePage() {
  const { refreshUser } = useAuthContext();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phone: "",
    gender: "",
    status: "",
  });
  const [avatar, setAvatar] = useState<string>(getAvatarUrl());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Lấy thông tin user khi load
  useEffect(() => {
    (async () => {
      try {
        const data = await userApi.getProfile();
        console.log("[ProfilePage] /me response", data);
        setUser(data);
        setForm({
          fullName: data.fullName || "",
          username: data.username || "",
          phone: data.phone || "",
          gender: data.gender || "",
          status: data.status || "",
        });

        // Chuẩn hóa URL (relative -> absolute) và fallback theo giới tính
        const resolved = getAvatarUrl(data.avatarUrl, data.gender);
        console.log("[ProfilePage] resolved avatar on load", {
          raw: data.avatarUrl,
          gender: data.gender,
          resolved,
        });
        setAvatar(resolved);
      } catch {
        setMsg("Không thể tải hồ sơ người dùng");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu thông tin cá nhân
  const handleSave = async () => {
    try {
      setSaving(true);
      await userApi.updateProfile({
        fullName: form.fullName,
        phone: form.phone,
        gender: form.gender as "male" | "female" | "other" | undefined,
      });
      setMsg("Hồ sơ đã được cập nhật!");
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Lỗi khi lưu hồ sơ");
    } finally {
      setSaving(false);
    }
  };

  //  Upload avatar (single image)
  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await userApi.updateAvatar(formData);
      const resolvedUrl = getAvatarUrl(res.avatarUrl, form.gender || user?.gender);
      console.log("[ProfilePage] avatar upload result", {
        raw: res,
        rawUrl: res.avatarUrl,
        gender: form.gender || user?.gender,
        resolvedUrl,
        envBase: import.meta.env.VITE_API_BASE_URL,
        locationOrigin: typeof window !== "undefined" ? window.location.origin : "",
      });
      // cache-bust to force browser reload the updated image immediately
      setAvatar(`${resolvedUrl}?t=${Date.now()}`);
      // refresh global auth user so other components (header, etc.) update without full page reload
      try {
        await refreshUser();
      } catch (e) {
        console.warn("[ProfilePage] refreshUser failed", e);
      }
      setMsg("Ảnh đại diện đã được cập nhật!");
    } catch (err: any) {
      console.error("[ProfilePage] upload avatar error", err);
      setMsg(err.message || "Lỗi khi cập nhật ảnh đại diện");
    }
  };

  if (loading) return <p>Đang tải...</p>;

  return (
    <div className="profile-page">
      <h1 className="profile-title">Thông tin hồ sơ</h1>
      {msg && <p className="profile-message">{msg}</p>}

      <div className="profile-header">
        <div className="avatar-box" onClick={() => fileRef.current?.click()}>
          <img src={avatar} alt="avatar" className="profile-avatar" />
          <div className="avatar-overlay">Đổi ảnh</div>
        </div>

        {/*  Input ẩn để chọn ảnh */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUploadAvatar}
        />

        <div className="profile-basic-info">
          <p className="profile-name">{user.fullName}</p>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label>Email</label>
          <input type="text" value={user.email} disabled />
        </div>

        <div className="form-group">
          <label>Họ và tên</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input value={form.username} disabled />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Giới tính</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">-- Chưa chọn --</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label>Trạng thái</label>
          <span className={`status-badge status-${form.status?.toLowerCase()}`}>
            {form.status || "Không xác định"}
          </span>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-save" onClick={handleSave} disabled={saving}>
            {saving ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
