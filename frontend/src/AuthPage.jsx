import PropTypes from 'prop-types';
import axios from 'axios';

const AuthPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[0]; 

    if (!value.trim()) { 
      console.log("Error: Username cannot be empty");
      return;
    }

    axios
      .post("http://localhost:3001/authenticate", { username: value })
      .then((response) => props.onAuth({ ...response.data, secret: value }))
      .catch((error) => console.error("Authentication error:", error));
  };

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="form-card">
        <div className="form-title">Join the Chat! 💬</div>
        <div className="form-subtitle">Pick a username to start chatting</div>
        <div className="auth">
          <div className="auth-label">Your Username</div>
          <input
            className="auth-input"
            name="username"
            placeholder="Choose a username"
          />
          <button className="auth-button" type="submit">Let&apos;s Go!</button>
        </div>
      </form>
    </div>
  );
}  

AuthPage.propTypes = {
  onAuth: PropTypes.func.isRequired, 
};

export default AuthPage;
