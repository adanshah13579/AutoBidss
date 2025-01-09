import React, { useState, useRef, useEffect } from "react";
import "./NavbarLoggedIn.css";
import { Input, Select, Avatar, Badge } from "antd";
import Cookies from "js-cookie";
import {
  AudioOutlined,
  BellOutlined,
  MessageOutlined,
  MessageTwoTone,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ProfileDropdown from "./profileDropDown";
import { Link } from "react-router-dom";
import { checkUnreadNotifications, fetchUserNotifications } from "../../../RESTAPI/Notifify/notify";
const { Search } = Input;
import { useNavigate } from "react-router-dom";

const NavbarLoggedIn = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationIsOpen, notificationsetIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [notifications, setNotifications] = useState([]); 
  const notificationRef = useRef(null);
  const navigate = useNavigate();


  const userId = Cookies.get("userId");

  const toggleMenu = () => {
    notificationsetIsOpen(!notificationIsOpen);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const onLocationChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onLocationSearch = (value) => {
    console.log("Loc search:", value);
  };


  useEffect(() => {
    if (!userId) return; 

    const checkNotifications = async () => {
      const result = await checkUnreadNotifications(userId); 
      if (result.success) {
        setHasUnread(result.data.hasUnread === "yes"); 
      }
    };

    const fetchNotifications = async () => {
      const result = await fetchUserNotifications(userId); 
      console.log("resulttt",result);
      
      if (result.success) {
        setNotifications(result.data.notifications); 
      }
    };

    checkNotifications();
    fetchNotifications();

  }, [userId]); // Fetch only when userId changes (on mount)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        notificationsetIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleNotificationClick = (carId) => {
    if (carId) {
      navigate(`/carDetails/${carId}`);
    }
  };
  
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to='/home' style={{color:"black"}}>AutoBids</Link>
        </div>

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Search
            placeholder="What are you looking for?"
            size="middle"
            onSearch={onSearch}
            style={{
              width: 300,
            }}
          />
          <Select
            showSearch
            placeholder="Location"
            optionFilterProp="label"
            style={{ width: 150, marginLeft: 2 }}
            onChange={onLocationChange}
            onSearch={onLocationSearch}
            options={[
              {
                value: "Rawalpindi",
                label: "Rawalpindi",
              },
              {
                value: "Lahore",
                label: "Lahore",
              },
              {
                value: "Islamabad",
                label: "Islamabad",
              },
            ]}
          />
        </li>

        <li>
          <Link to="/home">Home</Link>
        </li>

        <li>
          <a href="/contact">Contact Us</a>
        </li>

        <li>
          <div className="avatars">
          <Badge showZero={false} count={0} size="small">
              <Link to={'/message'}>
                <Avatar
                  style={{ backgroundColor: "transparent", color: "#2B59FF" }}
                  size={35}
                  shape="circle"
                  icon={<MessageTwoTone />}
                />
              </Link>
            </Badge>

            <div className="notification-container">
              {/* Conditionally display red dot if unread notifications are present */}
              <Badge
            dot={hasUnread} // Show the red dot if `hasUnread` is true
            size="small"
            style={{
              backgroundColor: hasUnread ? "red" : "transparent", // Red dot when `hasUnread` is true
              position: "absolute", // Position it
              top: "4px",          // Adjust the top position
              right: "7px",        // Adjust the right position
            }}
          >
            <Avatar
              className="notification-icon"
              style={{ backgroundColor: "transparent", color: "#2B59FF" }}
              size={35}
              shape="circle"
              icon={<BellOutlined />}
              onClick={toggleMenu}
            />
          </Badge>
                           {notificationIsOpen && (
                <div
                  className="notification-menu slide-down"
                  ref={notificationRef}
                >
                  <h3 className="notiTitle">Notifications</h3>
                  <hr className="notiLine" />
                  {notifications.length === 0 ? (
                    <p>No notifications.</p>
                  ) : (
                    notifications.map((notification) => (
                      <div key={notification._id} className="notification-item" onClick={() => handleNotificationClick(notification.carId)}
                      style={{ cursor: "pointer" }} >
                        <img
                          src="https://artprojectsforkids.org/wp-content/uploads/2023/12/How-to-Draw-a-Bell-web.jpg"
                          alt="notification"
                          className="notification-img"
                        />
                        {/* Render the notification body */}
                        <span className="notification-text">{notification.body}</span>
                      </div>
                    ))
                  )}
                </div>
              )}

            </div>

            <ProfileDropdown />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarLoggedIn;
