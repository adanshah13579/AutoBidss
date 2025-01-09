import React, { useEffect, useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import InspectionSVG from "../../../assets/SellCarAssests/Assets/Frame 2.svg";
import "./Inspection.css";

const Inspection = () => {
  // State for image preview and uploads
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  // Handle preview for uploaded image
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  // Handle image uploads
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // Close preview modal
  const handleCancel = () => setPreviewOpen(false);

  // Handle SVG click
  const handleSVGClick = () => {
    alert("Upload images for the Car Inspection Report!");
  };

  // Update parent component with uploaded images
  // useEffect(() => {
  //   setInspectionData((prev) => ({ ...prev, images: fileList }));
  // }, [fileList]);

  // Upload button template
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="car-images-container" style={{paddingLeft:'60px'}}>
      <div className="heading-container" style={{width:'900px'}}>
        <h2 className="heading" style={{width:'100%'}}>Car Inspection Report</h2>
      </div>

      {/* <div className="image-container">
        <img
          src={InspectionSVG}
          alt="Upload Image"
          onClick={handleSVGClick}
          className="clickable-svg"
        />
      </div> */}

      {/* Upload Component */}
      <Upload
        action=""
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false}
        multiple
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>

      {/* Preview Modal */}
      <Modal
        open={previewOpen}
        title="Preview Image"
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

export default Inspection;
