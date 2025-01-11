import React, { useState, useRef, useEffect } from "react";
import { Badge, Avatar, Modal, Button, Input, Spin, Form } from "antd";
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
    setOldPassword("");
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
    }}

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Show Modal and fetch profile data
  const showModal = async () => {
    setIsModalVisible(true);
    await fetchProfileData();
  };

  // Hide Modal and reset editing state
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditing(false);
  };

  // Fetch profile data from API
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

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    Cookies.remove("name");
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("userType");
    navigate("/login");
    setIsLogoutModalVisible(false);
  };

  // Handle Save Changes
  const handleSaveChanges = async () => {
    setLoading(true);
    setError(null);

    const changedData = {};

    // Compare current values with initial data
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
      {/* Avatar with Badge */}
      <Badge showZero={false} count={0} size="small">
        <Avatar
          style={{ backgroundColor: "transparent", color: "#2B59FF" }}
          size={35}
          shape="circle"
          icon={<UserOutlined />}
          onClick={toggleMenu}
        />
      </Badge>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="profile-menu">
          <div className="profile-header">
            <Avatar size={50} style={{ backgroundColor: "#2B59FF" }} />
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
            <div
              className="profile-link"
              onClick={() => setIsLogoutModalVisible(true)}
            >
              <span>
                <LogoutOutlined style={{ marginRight: 5 }} /> Log Out
              </span>
              <span>&gt;</span>
            </div>
          </div>
        </div>
      )}

<Modal
  title="My Profile"
  open={isModalVisible}
  onCancel={handleCancel}
  footer={[
    <Button key="close" onClick={handleCancel}>
      Close
    </Button>,
    isEditing && (
      <Button key="save" type="primary" onClick={handleSaveChanges} loading={loading}>
        Save Changes
      </Button>
    ),
    !isEditing && (
      <Button key="edit" type="primary" onClick={() => setIsEditing(true)}>
        Edit Profile
      </Button>
    ),
  ]}
>
  {loading ? (
    <Spin size="large" style={{ alignContent: 'center' }} />
  ) : error ? (
    <p style={{ color: 'red' }}>{error}</p>
  ) : profileData ? (
    <Form layout="vertical" style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '16px', rowGap: '8px' }}>
      <div style={{ display: 'contents' }}>
        <span>First Name</span>
        <Input
          value={profileData.firstName || ''}
          onChange={(e) =>
            setProfileData({ ...profileData, firstName: e.target.value })
          }
          disabled={!isEditing}
        />
        <span>Last Name</span>
        <Input
          value={profileData.lastName || ''}
          onChange={(e) =>
            setProfileData({ ...profileData, lastName: e.target.value })
          }
          disabled={!isEditing}
        />
        <span>Email</span>
        <Input
          value={profileData.email || ''}
          onChange={(e) =>
            setProfileData({ ...profileData, email: e.target.value })
          }
          disabled={!isEditing}
        />
        <span>City</span>
        <Input
          value={profileData.city || ''}
          onChange={(e) =>
            setProfileData({ ...profileData, city: e.target.value })
          }
          disabled={!isEditing}
        />
        <span>Country</span>
        <Input
          value={profileData.country || ''}
          onChange={(e) =>
            setProfileData({ ...profileData, country: e.target.value })
          }
          disabled={!isEditing}
        />
        <span>Account Status</span>
        <Input
          value={profileData.AccountStatus || ''}
          disabled
        />
        <span>User Type</span>
        <Input
          value={profileData.userType || ''}
          disabled
        />
      </div>
    </Form>
  ) : (
    <p>No profile data available.</p>
  )}
</Modal>


      <Modal
        title="Change Password"
        visible={isChangePasswordModalVisible}
        onCancel={handleCancelChangePassword}
        footer={null}
        width={400}
      >
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
        <Button type="primary" onClick={handleChangePasswordSubmit} block>
          Change Password
        </Button>
      </Modal>
      <CustomModal
        isVisible={isLogoutModalVisible}
        title="Confirm Logout"
        content="Are you sure you want to log out?"
        onOk={handleLogout}
        onCancel={() => setIsLogoutModalVisible(false)}
      />
    </div>
  );
};

export default ProfileDropdown;