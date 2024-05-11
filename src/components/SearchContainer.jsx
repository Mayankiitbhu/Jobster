import React from "react";
import Wrapper from "../assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { handleChange, clearValues } from "../feature/slice/allJobSlice";

const SearchContainer = () => {
  const { jobTypeOptions, statusOptions } = useSelector((state) => state.jobs);
  const { sortOptions } = useSelector((state) => state.allJobs);
  const [localSearch, setLocalSearch] = useState("");
  const dispatch = useDispatch();

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearValues());
  };

  const debounce = () => {
    let timeoutId;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  const optimisedDebounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form className="form">
        <h3>Search Form</h3>
        <div className="form-center">
          <FormRow
            labelText="Search"
            value={localSearch}
            id="search"
            type="text"
            handleChange={optimisedDebounce}
          />
          <FormRowSelect
            labelText="Status"
            id="searchStatus"
            list={["all", ...statusOptions]}
            handleChange={onChange}
          />
          <FormRowSelect
            labelText="Job Type"
            id="searchType"
            list={["all", ...jobTypeOptions]}
            handleChange={onChange}
          />
          <FormRowSelect
            labelText="Sort"
            id="sort"
            list={["all", ...sortOptions]}
            handleChange={onChange}
          />
          <button className="btn btn-block btn-danger" onClick={onSubmit}>
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
