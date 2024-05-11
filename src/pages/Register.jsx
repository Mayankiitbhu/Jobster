import React from 'react';
import Wrapper from '../assets/wrappers/RegisterPage';
import { FormRow, Logo } from '../components';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector, register, login } from '../feature/slice/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name : '',
  email : '',
  password : ''
}

const Register = () => {

  const [values, setValue] = useState(initialState);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector(userSelector);
  const navigate = useNavigate();

  const changeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setValue({...values, [name] : value});
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { name, email, password } = values;
    if (!name || !email || !password) {
      toast.warn('Please fill all fields!');
      return;
    } else {
      dispatch(register({ email, password, name}));
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
        <h3>Register</h3>
        <form action="submit" onSubmit={onSubmitHandler}>

          <FormRow type='text' labelText='Name' id='name' handleChange={e => changeHandler(e)} value={values.name} />
          <FormRow type='email' labelText='Email' id='email' handleChange={e => changeHandler(e)} value={values.email} />
          <FormRow type='password' labelText='Password' id='password' handleChange={e => changeHandler(e)} value={values.password} />

          <button type='submit' className='btn btn-block' disabled={isLoading}>{isLoading ? 'Please wait...' : 'Submit'}</button>
        </form>
        <button className='btn btn-hipster btn-block' disabled={isLoading} onClick={onDemoApp}>{isLoading ? 'Please wait...' : 'Demo App'}</button>
        <p>Already a member? <Link to='/login' className='member-btn'>Login</Link></p>
          
      </section>
    </Wrapper>
  )
}

export default Register;