import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { getUser } from "../data-service/UserDataService";

function Profile() {
  const [disable, setDisable] = useState(true);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    getUser().then((data) => {
      setUsername(data.username);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmailAddress(data.emailAddress);
    });
  }, []);

  const onEnableEdit = () => {
    setDisable(!disable);
  };

  return (
    <div>
      <div className="container-flex">
        <h1>User profile</h1>
        <Switch
          checked={disable}
          onChange={onEnableEdit}
          name="edit"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
      </div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="userName"
        label="User Name"
        name="userName"
        disabled={true}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={emailAddress}
        disabled={true}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="First Name"
        name="firstName"
        value={firstName}
        disabled={disable}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        value={lastName}
        disabled={disable}
        onChange={(e) => setLastName(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="default"
        disabled={disable}
        onClick={onEnableEdit}
      >
        Save
      </Button>
    </div>
  );
}

export default Profile;
