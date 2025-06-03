import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Sch } from "../Validate/Schema";
import { YupToError } from "../Validate/YupToError";

export default function CreatePost() {
  const navi = useNavigate();
  const post = {
    name: "",
    post: "",
    image: "",
  };
  const [formData, setFormData] = useState(post);
  const [errObj, setErrObj] = useState({});
  const hdlChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      await Sch.validate(formData, { abortEarly: false });
      await fetch("http://localhost:8000/posts", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      navi("/post");
    } catch (error) {
      const errObj = YupToError(error);
      setErrObj(errObj);
    }
  };
  console.log(errObj);
  return (
    <div className="flex justify-center mt-5">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">What do you want to post...</legend>

        <label className="label" htmlFor="name">
          Name :
        </label>
        <input
          id="name"
          type="text"
          className="input"
          placeholder="name..."
          value={formData.name}
          onChange={hdlChange}
        />
        <p className="text-red-500 text-center">{errObj.name}</p>

        <label className="label" htmlFor="post">
          Post :
        </label>
        <input
          id="post"
          type="text"
          className="input"
          placeholder="post..."
          value={formData.post}
          onChange={hdlChange}
        />
        <p className="text-red-500 text-center">{errObj.post}</p>

        <label className="label" htmlFor="image">
          Image :
        </label>
        <input
          id="image"
          type="text"
          className="input"
          placeholder="image..."
          value={formData.image}
          onChange={hdlChange}
        />
        <p className="text-red-500 text-center">{errObj.image}</p>

        <button
          type="submit"
          className="btn btn-neutral mt-4"
          onClick={hdlSubmit}
        >
          Post to data
        </button>
      </fieldset>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
}
