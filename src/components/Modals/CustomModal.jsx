import React from "react";
import { Modal, Button } from "antd";

<<<<<<< HEAD
const CustomModal = ({ isVisible, title, content, onOk, onCancel, singleButton }) => (
=======
const CustomModal = ({ isVisible, title, content, onOk, onCancel, singleButton, type }) => (
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
  <Modal
    title={title}
    open={isVisible}
    onCancel={onCancel}
    footer={
      singleButton
        ? [
<<<<<<< HEAD
            <Button key="confirm" type="primary" onClick={onOk}>
=======
            <Button
              key="confirm"
              type={type === "error" ? "danger" : "primary"}
              onClick={onOk}
              style={{
                backgroundColor: "#2B59FF", // Blue color for OK button
                borderColor: "#2B59FF",
                color: "#ffffff", // White text color
                // Optional: Add border color
              }}
            >
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
              OK
            </Button>,
          ]
        : [
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>,
<<<<<<< HEAD
            <Button key="confirm" type="primary" onClick={onOk}>
=======
            <Button
              key="confirm"
              type={type === "error" ? "danger" : "primary"}
              onClick={onOk}
              style={{
                backgroundColor: "#2B59FF", // Blue color for OK button
                borderColor: "#2B59FF",
                font:"white"// Optional: Add border color
                
              }}
            >
>>>>>>> 15ac29a88a191a413cfc89564940f43c50160181
              OK
            </Button>,
          ]
    }
  >
    <p>{content}</p>
  </Modal>
);

export default CustomModal;
