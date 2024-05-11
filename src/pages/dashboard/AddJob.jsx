import React from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow, FormRowSelect } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  addJob,
  clearValues,
  handleChange,
  editJob
} from "../../feature/slice/jobSlice";

const AddJob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    status,
    jobType,
    statusOptions,
    jobTypeOptions,
    isEditing,
    editJobId
  } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.warn("Please fill out all the fields..");
      return;
    }
    !isEditing ? 
    dispatch(addJob({ position, company, jobLocation, status, jobType })) :
    dispatch(editJob({jobId : editJobId, jjob : { position, company, jobLocation, status, jobType}}));
  };

  const onClearHandler = () => {
    dispatch(clearValues());
  };

  return (
    <Wrapper>
      <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
      <div className="form-center">
        <FormRow
          type="text"
          id="position"
          labelText="Position"
          value={position}
          handleChange={onChangeHandler}
        />

        <FormRow
          type="text"
          id="company"
          labelText="Company"
          value={company}
          handleChange={onChangeHandler}
        />

        <FormRow
          type="text"
          id="jobLocation"
          labelText="Job Location"
          value={jobLocation}
          handleChange={onChangeHandler}
        />

        <FormRowSelect
          id="status"
          labelText="Job Status"
          value={status}
          handleChange={onChangeHandler}
          list={statusOptions}
        />

        <FormRowSelect
          id="jobType"
          labelText="Job Type"
          value={jobType}
          handleChange={onChangeHandler}
          list={jobTypeOptions}
        />

        <div className="btn-container">
          <button
            className="clear-btn btn"
            onClick={onClearHandler}
            disabled={isLoading}
          >
            {isLoading ? "Please wait.." : "Clear"}
          </button>
          <button
            className="btn"
            onClick={onSubmitHandler}
            disabled={isLoading}
          >
            {isLoading ? "Please wait.." : "Submit"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddJob;
