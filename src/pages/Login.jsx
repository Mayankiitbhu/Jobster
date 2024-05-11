import React from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Logo } from '../components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, login } from '../feature/slice/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const initialState = {
  email : '',
  password : ''
}

const Login = () => {

  const [values, setValue] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useSelector(userSelector);

  const changeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setValue({...values, [name] : value});
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.warn('Please fill all the fields');
      return;
    } else {
      dispatch(login({ email, password }));
      return;
    }
  };

  const onDemoApp = () => {
    dispatch(login({ 
      email : 'john@gmail.com',
      password : 'secret'
    }));
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className='full-page'>
      <section className='form'>
        <Logo />
        <h3>Login</h3>
        <form action="submit" onSubmit={onSubmitHandler}>
          <FormRow type='email' labelText='Email' id='email' handleChange={e => changeHandler(e)} value={values.email} />
          <FormRow type='password' labelText='Password' id='password' handleChange={e => changeHandler(e)} value={values.password} />

          <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading ? 'Please wait...' : 'Submit'}</button>
        </form>
        <button className='btn btn-hipster btn-block' onClick={onDemoApp} disabled={isLoading}>{isLoading ? 'Please wait...' : 'Demo App'}</button>
        <p>Not a member? <Link to='/register' className='member-btn'>Register</Link></p>
          
      </section>
    </Wrapper>
  )
}

export default Login;