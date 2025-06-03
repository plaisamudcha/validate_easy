import React from "react";
import { NavLink } from "react-router";

export default function Navbar() {
  const menu = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Post", path: "/post" },
    { id: 3, name: "Create Post", path: "/createpost" },
  ];
  return (
    <div className="flex gap-3 h-15 bg-primary items-center px-3">
      {menu.map((el) => (
        <NavLink
          key={el.id}
          to={el.path}
          className="border rounded-md shadow-gray-500 shadow-sm px-2 py-1"
        >
          {el.name}
        </NavLink>
      ))}
    </div>
  );
}
