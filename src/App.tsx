import React from "react";
import "./App.scss";
import logo from "./logo.svg";

const App = () => {
	return (
		<div className='app'>
			<img src={logo} className='App-logo' alt='logo' />
			<h1>React Coding Kata!!!</h1>
			<h4>Author - Javed Hussain</h4>
			<p>
				This project is setup using <span>React</span>, <span>Typescript</span>,{" "}
				<span>Webpack</span>, <span>Babel</span> and <span>Scss</span>
			</p>
		</div>
	);
};

export default App;
