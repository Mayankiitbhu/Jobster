import React from 'react';
import { Link } from 'react-router-dom';
import error from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={error} alt='not-found-img' />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you are looking for</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  );
}

export default Error;