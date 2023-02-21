function BootStrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props


    return (
        <div className="mb-4">
            <label htmlFor={id}>{labelText}</label>
            <input required value={value} onChange={onChange} type={type} className="form-control" id={id} placeholder={placeholder} />
        </div>
    )
}

function UserForm(props) {
    return (
        <form>
            <BootStrapInput
                id="name"
                placeholder="ex. John Smith"
                labelText="Full Name"
                type="text" />
            <BootStrapInput
                id="email"
                placeholder="ex. johnsmith@gmail.com"
                labelText="Email"
                type="text" />

            <button> Submit </button>
        </form>
    )
}

export default UserForm