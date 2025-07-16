import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [errors, setErrors] = useState({});
	const buttonRef = useRef();

	const validate = () => {
		const newErrors = {};
		if (!email.includes('@')) newErrors.email = 'Введите корректный email';
		if (password.length < 6)
			newErrors.password = 'Пароль должен быть не менее 6 символов ';
		if (repeatPassword !== password) newErrors.repeatPassword = 'Пароли не совпадают';

		return newErrors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const validationErrors = validate();
		setErrors(validationErrors);
		if (Object.keys(validationErrors).length === 0) {
			console.log(email, password, repeatPassword);
		}
	};

	useEffect(() => {
		const validationErrors = validate();
		if (Object.keys(validationErrors).length === 0) {
			buttonRef.current?.focus();
		}
	}, [email, password, repeatPassword]);

	const isValid = Object.keys(validate()).length === 0;

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Email</label>
				<input
					type="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				{errors.email && <p>{errors.email}</p>}
			</div>

			<div>
				<label>Пароль:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				{errors.password && <p>{errors.password}</p>}
			</div>

			<div>
				<label>Повторить пароль:</label>
				<input
					type="password"
					value={repeatPassword}
					onChange={(e) => {
						setRepeatPassword(e.target.value);
					}}
				/>
				{errors.repeatPassword && <p>{errors.repeatPassword}</p>}
			</div>

			<button type="submit" ref={buttonRef} disabled={!isValid}>
				Зарегистрироваться
			</button>
		</form>
	);
}

export default App;
