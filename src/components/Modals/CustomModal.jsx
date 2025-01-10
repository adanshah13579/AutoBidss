import React from "react";
import { Modal, Button } from "antd";

const CustomModal = ({ isVisible, title, content, onOk, onCancel, singleButton, type }) => (
  <Modal
    title={title}
    open={isVisible}
    onCancel={onCancel}
    footer={
      singleButton
        ? [
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
              OK
            </Button>,
          ]
        : [
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>,
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
              OK
            </Button>,
          ]
    }
  >
    <p>{content}</p>
  </Modal>
);

export default CustomModal;
