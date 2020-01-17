import React, { useEffect, useState } from "react";
import axios from "axios";

function Actions() {
  const [actions, setActions] = useState([]);
  const [values, setValues] = useState({
    project_id: 0,
    description: "",
    notes: ""
  });
  useEffect(() => {
    const getActions = () => {
      axios.get("http://ctfjmg01:4000/api/actions").then(res => {
        setActions(res.data);
      });
    };
    getActions();
  }, []);
  const addAction = () => {
    console.log(values);
    axios
      .post(
        `http://ctfjmg01:4000/api/actions/${values.project_id}/actions`,
        values
      )
      .then(res => {
        axios.get("http://ctfjmg01:4000/api/actions").then(res => {
          setActions(res.data);
        });
      });
  };
  const deleteAction = id => {
    axios.delete(`http://ctfjmg01:4000/api/actions/${id}`).then(res => {
      axios.get("http://ctfjmg01:4000/api/actions").then(res => {
        setActions(res.data);
      });
    });
  };
  const onChange = e => {
    const chng = e.target.value;
    setValues({
      ...values,
      [e.target.name]: chng
    });
  };
  return (
    <>
      <h1>Add Action:</h1>
      <div className="addPost">
        <p> Project: </p>
        <input
          type="text"
          id="project_id"
          name="project_id"
          value={values.project_id}
          onChange={onChange}
        ></input>
        <p> Description: </p>
        <input
          type="text"
          id="description"
          name="description"
          value={values.description}
          onChange={onChange}
        ></input>
        <p> Notes: </p>
        <input
          type="text"
          id="notes"
          name="notes"
          value={values.notes}
          onChange={onChange}
        ></input>
        <button onClick={() => addAction()}> Add </button>
      </div>
      <h1> Current Actions: </h1>
      <div className="postBox">
        {actions.map(action => (
          <div className="postCard" key={action.id}>
            <p>ID: {action.id}</p>
            <p>Project ID: {action.project_id}</p>
            <p>Description: {action.description} </p>
            <p>Notes: {action.notes}</p>
            <button onClick={() => deleteAction(action.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
export default Actions;
