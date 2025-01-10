import React, { useState, useRef, useEffect } from "react";
import { Badge, Avatar, Button, Input, Spin, Form } from "antd";
import {
  HeartOutlined,
  LockOutlined,
  LogoutOutlined,
  StockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./profileDropdown.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseuri } from "../../../BaseUri/baseuri";
import CustomModal from "../Modals/CustomModal";
import { changeUserPassword } from "../../../RESTAPI/Profile/ProfileRoutes";

const ProfileDropdown = () => {
  // State hooks
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [initialProfileData, setInitialProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const showChangePasswordModal = () => {
    setIsChangePasswordModalVisible(true);
  };

  const handleCancelChangePassword = () => {
    setIsChangePasswordModalVisible(false);
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePasswordSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      message.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      message.error("New password and confirmation do not match");
      return;
    }

    const response = await changeUserPassword(newPassword, confirmPassword);
    if (response.success) {
      message.success(response.message);
      handleCancelChangePassword(); // Close the modal
    } else {
      message.error(response.error);
    }
  };

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const showModal = async () => {
    setIsModalVisible(true);
    await fetchProfileData();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
  };

  const fetchProfileData = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("token");
      const response = await axios.get(`${baseuri}/profiles/profile`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setProfileData(response.data);
      setInitialProfileData(response.data);
    } catch (err) {
      setError("Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("userType");
    navigate("/login");
    setIsLogoutModalVisible(false);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);

    const changedData = {};

    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== initialProfileData[key]) {
        changedData[key] = profileData[key];
      }
    });

    if (Object.keys(changedData).length === 0) {
      setLoading(false);
      return;
    }
    try {
      const token = Cookies.get("token");
      await axios.put(`${baseuri}/profiles/edit-profile`, changedData, {
        headers: {
          "x-auth-token": token,
        },
      });
      setLoading(false);
      setIsEditing(false);
      handleCancel();
    } catch (err) {
      setLoading(false);
      setError("Failed to update profile");
    }
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <Badge showZero={false} count={0} size="small">
        <Avatar
          style={{ backgroundColor: "transparent", color: "#2B59FF" }}
          size={35}
          shape="circle"
          icon={<UserOutlined />}
          onClick={toggleMenu}
        />
      </Badge>

      {isMenuOpen && (
        <div className="profile-menu">
          <div className="profile-header">
            <div className="profile-details">
              <strong>{Cookies.get("name") || "John Doe"}</strong>
              <p>{Cookies.get("email") || "johndoe@example.com"}</p>
            </div>
          </div>
          <div className="profile-links">
            <div className="profile-link" onClick={showModal}>
              <span>
                <UserOutlined style={{ marginRight: 5 }} /> My Profile
              </span>
              <span>&gt;</span>
            </div>
            <div className="profile-link" onClick={() => handleNavigation("/mybids")}>
              <span>
                <StockOutlined style={{ marginRight: 5 }} /> My Bids
              </span>
              <span>&gt;</span>
            </div>
            <div className="profile-link" onClick={() => handleNavigation("/myads")}>
              <span>
                <StockOutlined style={{ marginRight: 5 }} /> My Ads
              </span>
              <span>&gt;</span>
            </div>
            <div className="profile-link" onClick={() => handleNavigation("/mywatchlist")}>
              <span>
                <HeartOutlined style={{ marginRight: 5 }} /> Watchlist
              </span>
              <span>&gt;</span>
            </div>
            <div className="profile-link" onClick={showChangePasswordModal}>
              <span>
                <LockOutlined style={{ marginRight: 5 }} /> Change Password
              </span>
              <span>&gt;</span>
            </div>
            <div className="profile-link" onClick={() => setIsLogoutModalVisible(true)}>
              <span>
                <LogoutOutlined style={{ marginRight: 5 }} /> Log Out
              </span>
              <span>&gt;</span>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      <CustomModal
        isVisible={isModalVisible}
        title="My Profile"
        content={
          loading ? (
            <Spin size="large" style={{ alignContent: "center" }} />
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : profileData ? (
            <Form layout="vertical">
              <Form.Item label="First Name">
                <Input
                  value={profileData.firstName || ""}
                  onChange={(e) =>
                    setProfileData({ ...profileData, firstName: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item label="Last Name">
                <Input
                  value={profileData.lastName || ""}
                  onChange={(e) =>
                    setProfileData({ ...profileData, lastName: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item label="Email">
                <Input
                  value={profileData.email || ""}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item label="City">
                <Input
                  value={profileData.city || ""}
                  onChange={(e) =>
                    setProfileData({ ...profileData, city: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item label="Country">
                <Input
                  value={profileData.country || ""}
                  onChange={(e) =>
                    setProfileData({ ...profileData, country: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </Form.Item>

              <Form.Item label="Account Status">
                <Input value={profileData.AccountStatus || ""} disabled />
              </Form.Item>

              <Form.Item label="User Type">
                <Input value={profileData.userType || ""} disabled />
              </Form.Item>
            </Form>
          ) : (
            <p>No profile data available.</p>
          )
        }
        onOk={handleSaveChanges}
        onCancel={handleCancel}
        singleButton={false}
      />

      {/* Change Password Modal */}
      <CustomModal
        isVisible={isChangePasswordModalVisible}
        title="Change Password"
        content={
          <>
            <Input.Password
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ marginBottom: 10 }}
            />
            <Input.Password
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ marginBottom: 20 }}
            />
          </>
        }
        onOk={handleChangePasswordSubmit}
        onCancel={handleCancelChangePassword}
        singleButton={true}
        type="error"
      />

      {/* Logout Confirmation Modal */}
      <CustomModal
        isVisible={isLogoutModalVisible}
        title="Confirm Logout"
        content="Are you sure you want to log out?"
        onOk={handleLogout}
        onCancel={() => setIsLogoutModalVisible(false)}
        singleButton={true}
        type="error"
      />
    </div>
  );
};

export default ProfileDropdown;
