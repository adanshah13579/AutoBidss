import React, { useEffect, useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./CarImages.css";

const CarImages = ({SetImageData}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);

  // Handle preview
  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewOpen(true);
  };

  // Handle file changes
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // Close preview modal
  const handleCancel = () => setPreviewOpen(false);

  // Render upload button
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
 
  useEffect(()=>{
    SetImageData((prev)=>({...prev,...fileList}))
  },[fileList])

  return (
    <div className="car-images-container" style={{paddingLeft:'60px'}}>
      <div className="heading-container" style={{width:'900px'}}>
        <h2 className="heading"style={{width:'100%'}}>Car Images</h2>
      </div>
      <Upload
        action="" // You can add the endpoint if required for uploading
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={() => false} // Prevent auto-upload; handle uploads manually
        multiple="true"
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
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

export default CarImages;
