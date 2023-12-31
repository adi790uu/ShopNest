import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { gql, useQuery } from '@apollo/client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';
import { useUser } from '../store/selectors/user';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUser = useSetRecoilState(userState);

  const LOGIN_USER = gql`
    query Query($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        address
        email
        id
        name
        orders {
          bookId
          quantity
          status
          userId
        }
      }
    }
  `;

  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === '' || password === '') {
      toast.error('Enter the required details!', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (validator.isEmail(email)) {
      const { data, error, loading } = useQuery(LOGIN_USER, {
        variables: { email, password },
      });
      if (data) {
        setEmail('');
        setPassword('');
        toast.success('Registration Successfull!', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/home');
      }

      if (error) {
        console.log(error);
      }

      if (loading) {
        return <div>Loading...</div>;
      }

      navigate('/auth');
    } else {
      toast.error('Invalid Email!', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <div className='max-w-xl rounded-2xl bg-slate-900 m-auto mt-44 border shadow-md font-body bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800'>
        <div className='flex flex-col gap-2 p-8'>
          <p className='text-center text-3xl text-gray-300 mb-4 font-semibold tracking-wide'>
            Login
          </p>

          <input
            className='bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 font-display'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 mt-2'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className='mt-4 mb-4'>
            New Here?{' '}
            <Link to='/signup'>
              <span className='font-bold hover:underline ml-1'>Register</span>
            </Link>
          </span>

          <button
            onClick={handleLogin}
            className='inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95'
          >
            Login
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
