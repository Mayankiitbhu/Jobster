import React from 'react';
import { Link } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { Logo } from '../components';


const Landing = () => {
  return (
    <Wrapper>
        <nav>
           <Logo /> 
        </nav>
        <div className="container page">
          <section>
              <h1>Job <span>Tracking</ span> App</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos aspernatur eos qui nesciunt suscipit vel earum saepe repellat explicabo odio!</p>
              <Link to='/login' className='btn btn-hero'>Login/Register</Link>
          </section>
          <section>
            <img src={main} alt='main-img' className='main-img' />
          </section>
        </div>
    </Wrapper>
  )
}

export default Landing;