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
            <Button key="confirm" type={type === "error" ? "danger" : "primary"} onClick={onOk}>
              OK
            </Button>,
          ]
        : [
            <Button key="cancel" onClick={onCancel}>
              Cancel
            </Button>,
            <Button key="confirm" type={type === "error" ? "danger" : "primary"} onClick={onOk}>
              OK
            </Button>,
          ]
    }
  >
    <p>{content}</p>
  </Modal>
);

export default CustomModal;
