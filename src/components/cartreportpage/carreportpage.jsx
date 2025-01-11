import React, { useState } from "react";
import CarReportModal from "../CarReportModal/CarReportModal";

const CarReportPage = () => {
  const [carReport, setCarReport] = useState({
    dynamicOperation: {
      brakeEfficiencyTest: "",
      handBrakeTest: "",
      staticGearSelection: "",
      reverseClutchSlipTest: "",
      steeringNoise: "",
      suspensionRideHeight: "",
      airconPower: "",
      satNavPower: "",
      icePower: "",
      centralLocking: "",
      convertibleSunroofElectrics: "",
      horn: "",
    },
    engineBay: {
      batteryHealth: "",
      coolantLevel: "",
      powerSteeringFluid: "",
      brakeFluidLevel: "",
      engineOilLevel: "",
      oilCoolantContamination: "",
    },
    engineRunning: {
      starts: "",
      engineRunning: "",
      engineSmoking: "",
      auxBeltPulleyNoise: "",
      exhaustSecure: "",
    },
    interiorChecks: {
      engineManagementLight: "",
      brakeWearIndicatorLight: "",
      absWarningLight: "",
      oilWarningLight: "",
      airbagWarningLight: "",
      glowPlugLight: "",
    },
    tyreTread: {
      frontLeft: "",
      rearLeft: "",
      frontRight: "",
      rearRight: "",
      sideWallCuts: "",
    },
    essentialChecks: {
      headlights: "",
      sidelights: "",
      brakelights: "",
      foglights: "",
      indicators: "",
      electricWindows: "",
      electricMirrors: "",
      wipers: "",
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const testStatusEnum = [
    "Ok",
    "Require Some Attention",
    "Require Immediate Attention",
    "Not Tested",
    "Not Applicable",
  ];

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Car Report Modal</button>
      <CarReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        carReport={carReport}
        setCarReport={setCarReport}
        testStatusEnum={testStatusEnum}
      />
    </div>
  );
};

export default CarReportPage;
