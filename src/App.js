import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: " ",
    msg: " ",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "Item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "List emptied");
    setList([]);
  };
  const removeItem = (id) => {
    showAlert(true, "danger", "Item removed from List");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const completed = (id) => {
    showAlert(true, "success", "Task has been completed");
    
  };

  // saving on the local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="todoList-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>To-do List </h3>
        <div className="form-control">
          <input
            type="text"
            className="todoList"
            placeholder="Enter a task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="Add-btn">
            {isEditing ? "edit" : "Add Task"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todoList-container">
          <List items={list} removeItem={removeItem} editItem={editItem} completed={completed} />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
