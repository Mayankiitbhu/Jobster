import React from 'react'

const FormRow = ({ id, type, value, labelText, handleChange }) => {
  return (
    <div className='form-row'>
        <label htmlFor={id} className='form-label'>{ labelText || id }</label>
        <input name={id} type={type} value={value || ''} onChange={handleChange} className='form-input' />
    </div>
  )
}

export default FormRow;