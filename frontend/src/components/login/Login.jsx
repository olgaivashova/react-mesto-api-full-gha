import { useState } from "react";

const Login = ({handleSignin }) => {
  const [loginValue, setLoginValue] = useState({
   password: '',
   email: ''
     })
 
 
   const handleChange = (e) => {
     const {name, value} = e.target;
 
     setLoginValue({
       ...loginValue,
       [name]: value
     });
   }

  function onLogin (e) {
    e.preventDefault();
    if (!loginValue.password || !loginValue.email){
      return;
    }
   handleSignin(loginValue.password, loginValue.email)
  }

  return (

    <div className="login">
      <p className="login__title">
        Вход
      </p>
      <form onSubmit={onLogin} className="login__form">
       <div className="login__info">
        <input required className="login__input login__input_type_email"id="email" name="email" type="text" placeholder="Email"value={loginValue.email} onChange={handleChange} />
        <input required className="login__input login__input_type_password" id="password" name="password" type="password" placeholder="Пароль" value={loginValue.password} onChange={handleChange} />
        </div>
          <button type="submit" className="login__button">Войти</button>
       </form>
    </div>
 )
};

export default Login;
