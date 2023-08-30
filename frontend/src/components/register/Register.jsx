import { Link } from "react-router-dom";
import { useState } from "react";



const Register = ( {handleSignup}) => {
 const [formValue, setFormValue] = useState({
   password: '',
   email: ''
    })


  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(formValue.password, formValue.email )
}
  

  return (
    <>       
   <section className="register">
      <p className="register__title">
        Регистрация
      </p>
      <form onSubmit={handleSubmit} className="register__form">
        <div className="register__info">
        <input className="register__input register__input_type_email" id="email" name="email" type="email" placeholder="Email" value={formValue.email} onChange={handleChange} />
        <input className="register__input register__input_type_password" id="password" name="password" type="password" placeholder="Пароль" value={formValue.password} onChange={handleChange} />
         </div>
         <button type="submit" className="register__button">Зарегистрироваться</button>
       
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
       <Link to="/sign-in" className="register__signin-link">Войти</Link>    
        </div>
    </section>
    </>
  )
};

export default Register;
