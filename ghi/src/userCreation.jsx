import { useState, useEffect } from "react";

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
    const [occupation, setOccupation] = useState([]);
    const [location, setLocation] = useState([]);

    useEffect(() => {
        async function getInfo() {
            const url = "https://frontend-take-home.fetchrewards.com/form"
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json()
            console.log(data)
            if (response.ok) {
                setOccupation(data.occupations)
                setLocation(data.states)
                console.log(occupation)
                console.log(location, "states")
            }

        } getInfo()
    }, []
    );


    async function handleSubmit(e) {
        e.preventDefault(e)
        const postUrl = "https://frontend-take-home.fetchrewards.com/form"
        const response = await fetch(
            postUrl, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ setName, setEmail, setPassword, setOccupation, setLocation })
        }
        )
        if (response.ok) {
            console.log("response sent, should see 201")
        }
    };



    return (
        <div name="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Enter new user info</h1>
                        <form className="justify-content-center">
                            <BootStrapInput
                                id="name"
                                placeholder="Full name"
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                            <BootStrapInput
                                id="email"
                                placeholder="email"
                                type="text"
                                onChange={e => setEmail(e.target.value)}
                                value={email} />
                            <BootStrapInput
                                id="password"
                                placeholder="password"
                                type="text"
                                onChange={e => setPassword(e.target.value)}
                                value={password} />
                            <div className="form-floating mb-3">
                                <input placeholder="Occupation" required type="text" name="occupation" id="occupation" className="form-control" />
                                <label htmlFor="occupation">Occupation</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select>
                                    <option value="">Choose a state</option>

                                </select>
                            </div>
                            <button onClick={handleSubmit}> Submit </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForm


// function getInfo() {
//     console.log("getting occupations and states")
//     const url = "https://frontend-take-home.fetchrewards.com/form"
//     const response = fetch(url, {
//         method: "get",
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//     )
//     if (response.ok) {
//         const data = response.json()
//         console.log(data, "this should be the occupations and states")
//         setOccupation({ occupation: data.occupation })
//         setLocation({ location: data.states.name })
//     }


// } getInfo()

// fetch("https://frontend-take-home.fetchrewards.com/form")
//     .then(response => response.json())
//     .then(data => setData(data))
//     .then(setOccupation(data.occupations))
//     .then(setLocation(data.states))
//     .catch(error => console.error(error))
// console.log(location, "locations")
// console.log(occupation, "these are the occupations")
// console.log(data, "this should be the data")