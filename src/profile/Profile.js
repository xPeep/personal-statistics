import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {editUser, getUser} from "../data-service/UserDataService";

function Profile() {
    const [id, setId] = useState();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");


    const getActualUser = () => {
        getUser().then((data) => {
            setId(data.id)
            setUsername(data.username);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setEmailAddress(data.emailAddress);
        });
    }

    useEffect(() => {
        getActualUser();
    }, []);

    const saveProfileChanges = () => {
        editUser({
            id, username, firstName, lastName, emailAddress
        }).then((data) => {
            getActualUser()
        })
    }

    return (
        <div>
            <div className="container-flex">
                <h1>User profile</h1>
            </div>

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                value={username}
                disabled={true}
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
                onChange={(e) => setLastName(e.target.value)}
            />
            <Button
                id="saveProfileDataButton"
                type="submit"
                fullWidth
                variant="contained"
                color="default"
                onClick={saveProfileChanges}
            >
                Save
            </Button>
        </div>
    );
}

export default Profile;
