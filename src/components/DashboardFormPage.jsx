import React from 'react';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import FormRow from './FormRow';

const DashboardFormPage = ({ title, profileFields }) => {
  return (
    <Wrapper>
        <h3>{title}</h3>
        <div className="form form-center">
            {profileFields.map(field => <FormRow  />)}
        </div>
    </Wrapper>
  )
}

export default DashboardFormPage;