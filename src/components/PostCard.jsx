import React, { useState } from "react";
import { Sch } from "../Validate/Schema";
import { YupToError } from "../Validate/YupToError";

export default function PostCard({ item }) {
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({
    name: item.name,
    post: item.post,
    image: item.image,
  });
  const [error, setError] = useState({});

  const hdlChange = (e) => {
    setDataEdit({ ...dataEdit, [e.target.name]: e.target.value });
  };

  const hdlSave = async (item) => {
    try {
      await Sch.validate(dataEdit, { abortEarly: false });
      await fetch(`http://localhost:8000/posts/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify(dataEdit),
      });
      setIsEdit(false);
    } catch (error) {
      const objErr = YupToError(error);
      setError(objErr);
    }
  };
  const hdlDelete = async (item) => {
    let check = prompt("ok or sure to delete");
    if (check === "sure" || check === "ok") {
      await fetch(`http://localhost:8000/posts/${item.id}`, {
        method: "DELETE",
      });
    }
  };
  return (
    <div className="card bg-base-100 w-80 h-100 shadow-sm p-2">
      <figure className="h-1/2">
        <img src={item.image} alt={item.name} className="h-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>{item.post}</p>
        <div className="card-actions justify-around">
          {!isEdit ? (
            <button className="btn btn-primary" onClick={() => setIsEdit(true)}>
              Edit
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => hdlSave(item)}>
              Save
            </button>
          )}
          <button className="btn btn-primary" onClick={() => hdlDelete(item)}>
            Delete
          </button>
        </div>

        {isEdit && (
          <div>
            <label htmlFor={`${item.id}+${item.name}`}>Edit name : </label>
            <input
              type="text"
              id={`${item.id}+${item.name}`}
              name="name"
              className="input"
              value={dataEdit.name}
              onChange={hdlChange}
            />
            {error.name && <p className="text-red-500">{error.name}</p>}
            <label htmlFor={`${item.id}+${item.post}`}>Edit post : </label>
            <input
              type="text"
              id={`${item.id}+${item.post}`}
              name="post"
              className="input"
              value={dataEdit.post}
              onChange={hdlChange}
            />
            {error.post && <p className="text-red-500">{error.post}</p>}
            <label htmlFor={`${item.id}+${item.image}`}>Edit image : </label>
            <input
              type="text"
              id={`${item.id}+${item.image}`}
              name="image"
              className="input"
              value={dataEdit.image}
              onChange={hdlChange}
            />
            {error.image && <p className="text-red-500">{error.image}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
