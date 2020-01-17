import React, { useEffect, useState } from "react";
import axios from "axios";
import Actions from "./components/Actions";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [values, setValues] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    const getProjects = () => {
      axios.get("http://ctfjmg01:4000/api/projects").then(res => {
        setProjects(res.data);
      });
    };
    getProjects();
  }, []);

  const addProject = () => {
    axios.post("http://ctfjmg01:4000/api/projects", values).then(res => {
      axios.get("http://ctfjmg01:4000/api/projects").then(res => {
        setProjects(res.data);
      });
    });
  };
  const deleteProject = id => {
    axios.delete(`http://ctfjmg01:4000/api/projects/${id}`).then(res => {
      axios.get("http://ctfjmg01:4000/api/projects").then(res => {
        setProjects(res.data);
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
    <div className="App">
      <h1>Add Project:</h1>
      <div className="addPost">
        <p> Name: </p>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
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
        <button onClick={() => addProject()}> Add </button>
      </div>
      <h1> Current Projects: </h1>
      <div className="postBox">
        {projects.map(project => (
          <div className="postCard" key={project.id}>
            <p>Project ID: {project.id}</p>
            <p>Project NAME: {project.name} </p>
            <p>Project DESCRIPTION: {project.description}</p>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
          </div>
        ))}
      </div>
      <Actions />
    </div>
  );
}

export default App;
