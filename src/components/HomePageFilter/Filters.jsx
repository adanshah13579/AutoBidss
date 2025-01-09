import React, { useState, useEffect } from "react";
import { Collapse, Input, Checkbox, Button } from "antd";
import { DownOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons";
import "./filters.css";
import useWindowSize from "./WinSizeHook"; // Import the custom hook

const { Panel } = Collapse;

const Filter = ({ filters, setFilters }) => {
  const { width } = useWindowSize();
  const isMobile = width <= 768; // Define mobile width threshold

  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false); // Tracks expanded panels

  const [activeKeys, setActiveKeys] = useState([]); // Tracks expanded panels
  const allKeys = ["1", "2", "3", "4"]; // All panel keys

  // Trigger effect whenever filters change
  useEffect(() => {
    console.log("Filters updated:", filters);
  }, [filters]);

  // Handle input change
  const handleInputChange = (e, field, subField) => {
    setFilters((prev) => ({
      ...prev,
      [field]: { ...prev[field], [subField]: e.target.value },
    }));
  };

  // Handle checkbox group change
  const handleCheckboxChange = (field, values) => {
    setFilters((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      priceRange: { min: "", max: "" },
      year: { from: "", to: "" },
      mileage: { min: "", max: "" },
      city: [],
      make: [],
      registeredIn: [],
      transmission: [],
    });
  };

  // Toggle Expand/Collapse All
  const toggleExpandCollapse = () => {
    if (activeKeys.length === allKeys.length) {
      setActiveKeys([]); // Collapse all
    } else {
      setActiveKeys(allKeys); // Expand all
    }
  };
  const toggleMobileMenu = () => {
    setisMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      {isMobile && (
        <div className="mobileMenuIcon" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <CloseOutlined style={{ color: "black", position: "fixed" }} />
          ) : (
            <>
              <Button className="FilterButton">
                <MenuOutlined style={{ color: "black" }} />
                <span style={{ marginLeft: 6 }}>Filters</span>
              </Button>
            </>
          )}
        </div>
      )}
      {((isMobileMenuOpen && isMobile) || !isMobile) && (
        <div className="filterContainer">
          <div className="filterHeader">
            <h3>Filter</h3>
            <Button
              type="link"
              className="clearAllButton"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          </div>

          <div className="filterFields">
            {/* Price Range */}
            <div className="filterField">
              <label>Price Range ($)</label>

              <div className="filterInputGroup">
                <Input
                  placeholder="Min"
                  value={filters?.priceRange.min}
                  onChange={(e) => handleInputChange(e, "priceRange", "min")}
                />
                <Input
                  placeholder="Max"
                  value={filters?.priceRange.max}
                  onChange={(e) => handleInputChange(e, "priceRange", "max")}
                />
              </div>
              <hr className="hline" />
            </div>

            {/* Year */}
            <div className="filterField">
              <label>Year</label>
              <div className="filterInputGroup">
                <Input
                  placeholder="From"
                  value={filters?.year?.from}
                  onChange={(e) => handleInputChange(e, "year", "from")}
                />
                <Input
                  placeholder="To"
                  value={filters?.year?.to}
                  onChange={(e) => handleInputChange(e, "year", "to")}
                />
              </div>
              <hr className="hline" />
            </div>

            {/* Mileage */}
            <div className="filterField">
              <label>Mileage (KMs)</label>
              <div className="filterInputGroup">
                <Input
                  placeholder="Min"
                  value={filters?.mileage?.min}
                  onChange={(e) => handleInputChange(e, "mileage", "min")}
                />
                <Input
                  placeholder="Max"
                  value={filters?.mileage?.max}
                  onChange={(e) => handleInputChange(e, "mileage", "max")}
                />
              </div>
              <hr className="hline" />
            </div>

            {/* Collapse Sections */}
            <Collapse
              bordered={false}
              expandIcon={({ isActive }) => (
                <DownOutlined rotate={isActive ? 180 : 0} />
              )}
              activeKey={activeKeys} // Controlled keys for expanded panels
              onChange={(keys) => setActiveKeys(keys)} // Update active keys
              className="filterCollapse"
            >
              {/* City */}
              <Panel header="City" key="1">
                <Checkbox.Group
                  className="filterCheckboxGroup"
                  value={filters?.city}
                  onChange={(values) => handleCheckboxChange("city", values)}
                >
                  <Checkbox value="New York, NY">New York, NY</Checkbox>
                  <Checkbox value="Los Angeles, CA">Los Angeles, CA</Checkbox>
                  <Checkbox value="Chicago, IL">Chicago, IL</Checkbox>
                  <Checkbox value="Houston, TX">Houston, TX</Checkbox>
                  <Checkbox value="Phoenix, AZ">Phoenix, AZ</Checkbox>
                </Checkbox.Group>
              </Panel>

              {/* Make */}
              <Panel header="Make" key="2">
                <Checkbox.Group
                  className="filterCheckboxGroup"
                  value={filters?.make}
                  onChange={(values) => handleCheckboxChange("make", values)}
                >
                  <Checkbox value="Ford">Ford</Checkbox>
                  <Checkbox value="Toyota">Toyota</Checkbox>
                  <Checkbox value="Honda">Honda</Checkbox>
                  <Checkbox value="Hyundai">Hyundai</Checkbox>
                  <Checkbox value="Suzuki">Suzuki</Checkbox>
                </Checkbox.Group>
              </Panel>

              {/* Registered In */}
              <Panel header="Registered In" key="3">
                <Checkbox.Group
                  className="filterCheckboxGroup"
                  value={filters?.registeredIn}
                  onChange={(values) =>
                    handleCheckboxChange("registeredIn", values)
                  }
                >
                  <Checkbox value="California">California</Checkbox>
                  <Checkbox value="Texas">Texas</Checkbox>
                  <Checkbox value="New York">New York</Checkbox>
                  <Checkbox value="Florida">Florida</Checkbox>
                  <Checkbox value="Alaska">Alaska</Checkbox>
                </Checkbox.Group>
              </Panel>

              {/* Transmission */}
              <Panel header="Transmission" key="4">
                <Checkbox.Group
                  className="filterCheckboxGroup"
                  value={filters?.transmission}
                  onChange={(values) =>
                    handleCheckboxChange("transmission", values)
                  }
                >
                  <Checkbox value="Automatic">Automatic</Checkbox>
                  <Checkbox value="Manual">Manual</Checkbox>
                </Checkbox.Group>
              </Panel>
            </Collapse>
          </div>

          <div className="expandAllSection">
            <Button type="link" onClick={toggleExpandCollapse}>
              {activeKeys.length === allKeys.length
                ? "Collapse all"
                : "Expand all"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
