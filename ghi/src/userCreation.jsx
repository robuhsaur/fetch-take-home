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

function UserForm(props) {
    const name = useState("");
    const email = useState("");
    const password = useState("");
    const occupation = useState([]);
    const state = useState([]);

    useEffect(() => {
        async function getInfo() {
            console.log("getting occupations and states")
            const url = "https://frontend-take-home.fetchrewards.com/form"
            const response = await fetch(url, {
                method: "get",
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            const formData = await response.json()
            if (response.ok) {
                const occupation = formData.occupation.value
            }

        }
    }
    )

    async function handleSubmit() {
        const postUrl = "https://frontend-take-home.fetchrewards.com/form"
        const response = await fetch(
            postUrl, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, occupation, state })
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
                                placeholder="ex. John Smith"
                                type="text"
                                className="form-control" />
                            <BootStrapInput
                                id="email"
                                placeholder="ex. johnsmith@gmail.com"
                                type="text" />
                            <BootStrapInput
                                id="password"
                                placeholder="password"
                                type="text" />
                            <div className="form-floating mb-3">
                                <input placeholder="Occupation" required type="text" name="occupation" id="occupation" className="form-control" />
                                <label htmlFor="occupation">Occupation</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="State" required type="text" name="State" id="State" className="form-control" />
                                <label htmlFor="State">State</label>
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