import { useState } from "react";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill all fields !");
      return;
    }

    onRegister({ username, password, firstName, lastName, emailAddress });

    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmailAddress("");
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>E-mail address</label>
        <input
          type="text"
          placeholder="E-mail address"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>
      <input type="submit" value="Register" className="btn btn-block" />
    </form>
  );
}

export default Register;
