import React from 'react';
import Wrapper from '../assets/wrappers/Job';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import JobInfo from './JobInfo';
import { useDispatch } from 'react-redux';
import { deleteJob } from '../feature/slice/allJobSlice';
import { Link } from 'react-router-dom';
import { setEditFields } from '../feature/slice/jobSlice';
import moment from 'moment';

const formattedDate = (createdAt) => {
    return moment(createdAt).format('MMM Do, YYYY');
}
const Job = ({jobType, position, location, company, status, jobId, createdAt}) => {

    const dispatch = useDispatch();

    const onDeleteHandler = () => {
        dispatch(deleteJob(jobId));
    };

    const onEditHandler = () => {
        dispatch(setEditFields({
            position,
            jobLocation : location,
            jobType,
            company,
            status,
            editJobId : jobId
        }));
    }

  return (
    <Wrapper>
        <header>
            <div className="main-icon">
                {company.charAt(0)}
            </div>
            <div className="info">
                <h5>{position}</h5>
                <p>{company}</p>
            </div>
        </header>
        <div className="content">
            <div className="content-center">
                <JobInfo icon={<FaLocationArrow />} text={location}/>
                <JobInfo icon={<FaCalendarAlt />} text={formattedDate(createdAt)}/>
                <JobInfo icon={<FaBriefcase />} text={jobType}/>
                <div className={`status ${status}`}>{status}</div>
            </div>
            <footer>
                <Link to='/add-job' className='btn edit-btn' onClick={onEditHandler}>Edit</Link>
                <button className='btn delete-btn' onClick={onDeleteHandler}>Delete</button>
            </footer>
        </div>
    </Wrapper>
  )
}

export default Job;