import { useState, useEffect } from "react";
import { Form } from 'react-bootstrap';

function BootStrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props


    return (
        <div className="mb-4">
            <label htmlFor={id}>{labelText}</label>
            <input required value={value} onChange={onChange} type={type} className="form-control" id={id} placeholder={placeholder} />
        </div>
    )
};

function UserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [occupation, setOccupation] = useState("");
    const [location, setLocation] = useState("");
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        async function getInfo() {
            const url = "https://frontend-take-home.fetchrewards.com/form"
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const info = await response.json()
            if (response.ok) {
                setUserInfo(info)
            }

        } getInfo()
    }, []
    );


    async function handleSubmit(e) {
        e.preventDefault();
        if (name.length !== 0 && email.length !== 0 && password.length !== 0 && occupation.length !== 0 && location.length !== 0) {
            const postUrl = "https://frontend-take-home.fetchrewards.com/form"
            const response = await fetch(
                postUrl, {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, occupation, "state": location })
            }
            )
            if (response.ok) {
                alert("Form submitted!");
                setName("");
                setEmail("");
                setPassword("");
                setOccupation("");
                setLocation("");
            }
        } else {
            alert("Fields cannot be empty!");
        }
    };



    return (
        <div name="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Enter new user info</h1>
                        <Form className="justify-content-center">
                            <BootStrapInput
                                required
                                id="name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                            <BootStrapInput
                                required
                                id="email"
                                placeholder="email"
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                value={email} />
                            <BootStrapInput
                                required
                                id="password"
                                placeholder="password"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                value={password} />
                            <div className="mb-3">
                                <select className="form-select" onChange={e => setOccupation(e.target.value)}>
                                    <option value="">Choose an occupation </option>
                                    {userInfo.occupations && userInfo.occupations.map((job) => {
                                        return (
                                            <option required key={job} value={job}>
                                                {job}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <select className="form-select" onChange={e => setLocation(e.target.value)}>
                                    <option value=""> Location </option>
                                    {userInfo.states && userInfo.states.map((state) => {
                                        return (
                                            <option required key={state.abbreviation} value={state.abbreviation}>
                                                {state.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <button type="submit" onClick={handleSubmit}> Submit </button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm
