import React from "react";
import "./CarReportModal.css";

const CarReportModal = ({ isOpen, onClose, carReport, setCarReport, testStatusEnum }) => {
  if (!isOpen) return null;

  const handleChange = (category, field, value) => {
    setCarReport((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Add save logic here if needed, e.g., API call or local storage update
    console.log("Car report saved:", carReport);
    onClose(); // Close modal after saving
  };

  return (
    <div className="modal-overlay">
    <div className="modal-content">
    <div className="modal-header">
          <h2>Car Inspection Report</h2>
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
          <div className="radio-info">
            <div className="radio-item">
              <input type="radio"  checked className="status-green" />
              <label> Ok</label>
            </div>
            <div className="radio-item">
              <input type="radio"  checked className="status-yellow" />
              <label> Require Some Attention</label>
            </div>
            <div className="radio-item">
              <input type="radio"  checked className="status-red" />
              <label> Require Immediate Attention</label>
            </div>
            <div className="radio-item">
              <input type="radio"  checked className="status-grey" />
              <label> Not Tested</label>
            </div>
            <div className="radio-item">
              <input type="radio"  checked className="status-blue" />
              <label> Not Applicable</label>
            </div>
          </div>
        
  <div className="scrollable-content">
    {Object.keys(carReport).map((category) => (
      <div key={category} className="category-section">
        <h3>{category}</h3>
        {Object.keys(carReport[category]).map((field) => (
          <div key={field} className="field-row">
            <h4>{field}</h4>
            <div className="radio-group">
              {testStatusEnum.map((status) => (
                <label key={status} className="radio-option">
                  <input
                    type="radio"
                    name={`${category}-${field}`}
                    value={status}
                    checked={carReport[category][field] === status}
                    onChange={() => handleChange(category, field, status)}
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
  <div className="modal-buttons">
    <button className="modal-save" onClick={handleSave}>
      Save
    </button>
    <button className="modal-cancel" onClick={onClose}>
      Cancel
    </button>
  </div>
</div>
    </div>
  );
};

export default CarReportModal;
