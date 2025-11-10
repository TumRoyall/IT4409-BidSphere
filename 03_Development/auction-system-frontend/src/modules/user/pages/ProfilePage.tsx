import { useEffect, useState, useRef } from "react";
import { userApi } from "@/api/modules/user.api";
import { NavLink } from "react-router-dom";
import defaultAvatar from "@/assets/avatars/default-avatar.png";
import maleAvatar from "@/assets/avatars/male.png";
import femaleAvatar from "@/assets/avatars/female.png";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phone: "",
    gender: "",
    status: "",
  });
  const [avatar, setAvatar] = useState<string>(defaultAvatar);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  // Lấy thông tin user từ API
  useEffect(() => {
    (async () => {
      try {
        const data = await userApi.getProfile();
        setUser(data);
        setForm({
          fullName: data.fullName || "",
          username: data.username || "",
          phone: data.phone || "",
          gender: data.gender || "",
          status: data.status || "",
        });

        // Chọn avatar phù hợp
        if (data.avatarUrl) {
          setAvatar(data.avatarUrl);
        } else if (data.gender === "male") {
          setAvatar(maleAvatar);
        } else if (data.gender === "female") {
          setAvatar(femaleAvatar);
        } else {
          setAvatar(defaultAvatar);
        }
      } catch (e: any) {
        setMsg(e.message || "Không thể tải hồ sơ người dùng");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Hàm thay đổi input form
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Lưu hồ sơ
  const handleSave = async () => {
    try {
      setSaving(true);
      await userApi.updateProfile(form);
      setMsg("Hồ sơ đã được cập nhật!");
      setTimeout(() => setMsg(""), 2500);
    } catch (e: any) {
      setMsg(e.message || "Lỗi cập nhật hồ sơ");
    } finally {
      setSaving(false);
    }
  };

  // Upload avatar mới
  const handleAvatarChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target?.result as string);
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
    try {
      await userApi.updateAvatar(formData);
      setMsg("Cập nhật ảnh đại diện thành công!");
    } catch {
      setMsg("Không thể tải ảnh lên");
    }
  };

  // Màu trạng thái
  const getStatusClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "status-active";
      case "INACTIVE":
        return "status-inactive";
      case "BANNED":
        return "status-banned";
      default:
        return "status-unknown";
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!user) return <p className="text-red-600">{msg}</p>;

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="profile-sidebar">
        <div className="profile-user">
          <div
            className="avatar-wrapper"
            onClick={() => fileRef.current?.click()}
          >
            <img src={avatar} alt="avatar" className="profile-avatar" />
            <div className="avatar-overlay">Đổi ảnh</div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <div>
            <p className="profile-name">{user.fullName}</p>
            <p className="profile-email">{user.email}</p>
          </div>
        </div>

        {/* === Hồ sơ cá nhân === */}
        <div className="sidebar-section">
          <p className="sidebar-section-title">Hồ sơ cá nhân</p>
          <nav className="sidebar-nav">
            <NavLink
              to="/profile"
              end
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              Hồ sơ của tôi
            </NavLink>
            <NavLink
              to="/profile/wallet"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              Ví của tôi
            </NavLink>
            <NavLink
              to="/profile/change-password"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              Đổi mật khẩu
            </NavLink>
          </nav>
        </div>

        {/* === Các mục khác === */}
        <div className="sidebar-section">
          <p className="sidebar-section-title">Hoạt động</p>
          <nav className="sidebar-nav">
            <NavLink
              to="/profile/notifications"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              Thông báo
            </NavLink>
            <NavLink
              to="/profile/auction-history"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              Lịch sử đấu giá
            </NavLink>
            <NavLink
              to="/profile/purchases"
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              Sản phẩm đã mua
            </NavLink>
          </nav>
        </div>
      </aside>


      {/* Nội dung chính */}
      <main className="profile-main">
        <h1 className="profile-title">Thông tin hồ sơ</h1>
        {msg && <p className="profile-message">{msg}</p>}

        <div className="profile-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="disabled-input"
            />
          </div>

          <div className="form-group">
            <label>Họ và tên</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Tên đăng nhập</label>
            <input
              value={form.username}
              disabled
              className="disabled-input"
            />
          </div>

          <div className="form-group">
            <label>Số điện thoại</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Giới tính</label>
            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleChange}
              className="select-input"
            >
              <option value="">-- Chưa chọn --</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div className="form-group">
            <label>Trạng thái</label>
            <div className={`status-badge ${getStatusClass(form.status)}`}>
              {form.status || "Không xác định"}
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-edit" onClick={handleSave} disabled={saving}>
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
