import React from "react";

const DynamicBtn = ({ btnval, Dvar, DsetVar, DbuttonId }) => {
  const handleSizeButtonClick = (buttonId) => {
    DsetVar(buttonId === Dvar ? null : buttonId);
  };
  // console.log('btnval',btnval)
  return (
    <div
      onClick={() => handleSizeButtonClick(DbuttonId)}
      className={
        Dvar === DbuttonId
          ? "btn btn-outline-dark border-2 rounded-pill my-3 d-flex me-2 dw-os-selected"
          : "btn btn-outline-dark rounded-pill my-3 d-flex me-2"
      }
    >
      {btnval}
    </div>
  );
};

export default DynamicBtn;
