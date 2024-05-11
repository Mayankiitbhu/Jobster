import React from "react";

const FormRowSelect = ({ id, value, labelText, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={id} className="form-label">
        {labelText || id}
      </label>
      <select
        className="form-select"
        name={id}
        value={value}
        onChange={handleChange}
      >
        {list.map((o, index) => (
          <option key={index} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormRowSelect;
