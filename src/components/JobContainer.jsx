import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import Job from "./Job";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../feature/slice/allJobSlice";
import PageBtnContainer from "./PageBtnContainer";

const JobContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, jobs, totalJobs, searchStatus, searchType, search, sort, pageNumber } = useSelector((state) => state.allJobs);

  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch, searchStatus, searchType, search, sort, pageNumber]);

  return (
    <Wrapper>
      {isLoading ? (
        <h2>Loading ...</h2>
      ) : (
        <>
          {totalJobs === 0 ? (
            <h2>No Jobs Found..</h2>
          ) : totalJobs === 1 ? (
            <h5>1 Job Found</h5>
          ) : (
            <h5>{totalJobs} Jobs Found</h5>
          )}
          <div className="jobs">
            {jobs.map(job => <Job
              key = {job._id}
              company={job.company}
              position={job.position}
              status={job.status}
              jobType={job.jobType}
              location={job.jobLocation}
              jobId={job._id}
              createdAt={job.createdAt}
            />)}
            
          </div>
          <PageBtnContainer />
        </>
      )}
    </Wrapper>
  );
};

export default JobContainer;
