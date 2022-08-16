import React from "react";
import { useNavigate } from "react-router-dom";
export default function Signin(props) {
  const [records, setRecords] = React.useState([]);
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });
  function handleChange(event) {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function onSubmit(e) {
    localStorage.setItem("currentUserName", form.username);
    e.preventDefault();
    if (
      !(
        records.find((x) => x.username === form.username) &&
        records.find((x) => x.password === form.password)
      )
    ) {
      window.alert("Invalid Credentials");
      return;
    }

    records.find((x) => {
      if (x.username === form.username) {
        console.log(x);
        localStorage.setItem("currentUserId", x._id);
        localStorage.setItem("currentUserName", x.username);
      }
    });
    setForm({
      username: "",

      password: "",
    });

    navigate(`/userHome/${localStorage.getItem("currentUserId").toString()}`);
    window.location.reload();
  }
  React.useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  return (
    <form
      id="signin"
      className={
        props.isActive ? "signinform signform dp" : "signform signinform"
      }
      action="submit"
    >
      <input
        type="name"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Username*"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password*"
      />
      <button className="buttonsignup" type="submit" onClick={onSubmit}>
        SIGN IN
      </button>
    </form>
  );
}
