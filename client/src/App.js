import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({
    text: "",
    user_id: 10
  });
  const [userValues, setUserValues] = useState({
    name: ""
  });
  useEffect(() => {
    const getUsers = () => {
      axios.get("http://ctfjmg01:4000/api/users").then(res => {
        setUsers(res.data);
      });
    };
    getUsers();
  }, []);

  const addUser = () => {
    axios.post("http://ctfjmg01:4000/api/users", userValues).then(res => {
      axios.get("http://ctfjmg01:4000/api/users").then(res => {
        setUsers(res.data);
      });
    });
  };
  const deleteUser = id => {
    axios.delete(`http://ctfjmg01:4000/api/users/${id}`).then(res => {
      axios.get("http://ctfjmg01:4000/api/users").then(res => {
        setUsers(res.data);
      });
    });
  };
  const onChangeUser = e => {
    const chng = e.target.value;
    setUserValues({
      ...userValues,
      [e.target.name]: chng
    });
  };

  useEffect(() => {
    const getPosts = () => {
      axios.get("http://ctfjmg01:4000/api/posts").then(res => {
        setPosts(res.data);
      });
    };
    getPosts();
  }, []);
  const addPost = () => {
    console.log(values);
    axios.post("http://ctfjmg01:4000/api/posts", values).then(res => {
      axios.get("http://ctfjmg01:4000/api/posts").then(res => {
        setPosts(res.data);
      });
    });
  };
  const deletePost = id => {
    axios.delete(`http://ctfjmg01:4000/api/posts/${id}`).then(res => {
      axios.get("http://ctfjmg01:4000/api/posts").then(res => {
        setPosts(res.data);
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
      <h1>Add User:</h1>
      <div className="addPost">
        <p> Name: </p>
        <input
          type="text"
          id="name"
          name="name"
          value={userValues.name}
          onChange={onChangeUser}
        ></input>
        <button onClick={() => addUser()}> Add </button>
      </div>
      <h1> Current Users: </h1>
      <div className="postBox">
        {users.map(user => (
          <div className="postCard" key={user.id}>
            <p>ID: {user.id}</p>
            <p>NAME: {user.name} </p>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        ))}
      </div>
      <h1>Add Post:</h1>
      <div className="addPost">
        <p> Text: </p>
        <input
          type="text"
          id="text"
          name="text"
          value={values.text}
          onChange={onChange}
        ></input>
        <button onClick={() => addPost()}> Add </button>
      </div>
      <h1> Current Posts: </h1>
      <div className="postBox">
        {posts.map(post => (
          <div className="postCard" key={post.id}>
            <p>ID: {post.id}</p>
            <p>TEXT: {post.text} </p>
            <p>Created by USER_ID: {post.user_id}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
