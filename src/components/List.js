import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { BsFillPatchCheckFill } from "react-icons/bs";

const List = ({ items, removeItem, editItem, completed }) => {


  return (
    <div className="todoList-list">
      {items.map((item, index) => {
        const { id, title } = item;
        return (
          <article key={id} className="todoList-item">
            
            <p className="title">
                <span className='serial_number'>{index + 1}</span>
                {title}
            </p>
            <div className="btn-container">
              <button
                type="button"
                className="completed_btn"
                onClick={() => completed(id)}
              >
                <BsFillPatchCheckFill />
              </button>
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
