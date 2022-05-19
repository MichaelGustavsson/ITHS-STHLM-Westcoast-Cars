import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onHandleUserNameTextChanged = (e) => {
    // console.log(e.target.name);
    setUserName(e.target.value);
  };

  const onHandlePasswordTextChanged = (e) => {
    // console.log(e.target.name);
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_BASEURL}/auth/login`;
    console.log(url);

    const user = {
      userName: userName,
      password: password,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    console.log(response);

    if (response.status >= 200 && response.status <= 299) {
      const result = await response.json();
      localStorage.setItem('token', JSON.stringify(result.token));
      navigate('/list');
    } else {
      console.log('Det gick inte att logga in');
    }
  };

  return (
    <>
      <h1 className='page-title'>Logga In</h1>
      <section className='form-container'>
        <h4>Användar info</h4>
        <section className='form-wrapper'>
          <form className='form' onSubmit={handleLogin}>
            <div className='form-control'>
              <label htmlFor='userName'>Användarnamn/Email</label>
              <input
                onChange={onHandleUserNameTextChanged}
                value={userName}
                type='text'
                id='userName'
                name='userName'
              />
            </div>
            <div className='form-control'>
              <label htmlFor='password'>Lösenord</label>
              <input
                onChange={onHandlePasswordTextChanged}
                value={password}
                type='password'
                id='password'
                name='password'
              />
            </div>
            <div className='buttons'>
              <button type='submit' className='btn'>
                Logga In
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default Login;
