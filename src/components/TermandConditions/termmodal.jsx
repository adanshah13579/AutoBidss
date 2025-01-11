import React, { useState } from "react";
import { Modal, Button } from "antd";

const TermsAndConditionsModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to open the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle OK button (Close modal)
  const handleOk = () => {
    setIsModalVisible(false);
  };

  // Function to handle Cancel button (Close modal)
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      {/* Button to trigger modal */}
      <Button type="primary" onClick={showModal}>
        Terms & Conditions
      </Button>

      {/* Modal component */}
      <Modal
        title="Terms & Conditions"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <h3>Last update: 25/07/22</h3>
        <p>Please read these terms of service, carefully before using our app operated by us.</p>

        <h4>Conditions of Use</h4>
        <p>
          Neque earum quo ea est porro asperiores reprehenderit sint. Dolore doloremque vitae ipsum officia accusamus
          aspernatur rerum. Voluptas quas distinctio blanditiis. Consectetur dolor vero ut. Fugiat voluptate non et
          consequuntur placeat voluptas voluptatem aliquid id. Saepe fugit repellendus sit eos porro voluptas voluptate
          cupiditate in. Neque earum quo ea est porro asperiores reprehenderit sint.
        </p>

        <p>
          Neque earum quo ea est porro asperiores reprehenderit sint. Dolore doloremque vitae ipsum officia accusamus
          aspernatur rerum. Voluptas quas distinctio blanditiis. Consectetur dolor vero ut. Fugiat voluptate non et
          consequuntur placeat voluptas voluptatem aliquid id. Saepe fugit repellendus sit eos porro voluptas voluptate
          cupiditate in.
        </p>
      </Modal>
    </div>
  );
};

export default TermsAndConditionsModal;
