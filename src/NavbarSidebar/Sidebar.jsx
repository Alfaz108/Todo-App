import React from "react";
import { useGetboardsQuery } from "../Features/apiSlice";
import { useRemoveBoardsMutation } from "../Features/apiSlice";
import { useAddBoardMutation } from "../Features/apiSlice";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faUser,
  faFileAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import avater from "../assets/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const { data } = useGetboardsQuery();

  const [removeBoards, { data: data2 }] = useRemoveBoardsMutation();
  const [addBoard] = useAddBoardMutation();
  const [defaultTitle, setDefaultTitle] = useState("Alfaz");
  const [defaultDescription, setDefaultDescription] = useState(
    "This is description"
  );

  const handleAddBoard = async () => {
    try {
      const { data } = await addBoard({
        title: defaultTitle,
        description: defaultDescription,
      });
    } catch (error) {
      console.error("Error adding board:", error);
    }
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-full sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 overflow-hidden "
        >
          <span className="sr-only">open sidebar</span>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-red-800 bg-red-200 m-1 rounded-full sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 overflow-hidden absolute right-0"
          >
            <span className="sr-only">close sidebar</span>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
            <a
              className="flex items-center p-2 font-bold text-gray-900 rounded-lg hover:bg-gray-100  group"
              href="/"
            >
              <img
                className="w-5 h-5 rounded transition duration-75"
                src={avater}
                alt="profile"
                referrerPolicy="no-referrer"
              />
              <span className="ml-3">unknown</span>
            </a>
            <ul className="space-y-2 font-medium ml-2">
              <li>
                <button
                  className="flex items-center gap-2 p-1 text-gray-500 rounded-lg hover:bg-gray-100 group w-full focus:outline-none active:bg-white"
                  onClick={handleAddBoard}
                >
                  <FontAwesomeIcon icon={faFileAlt} />
                  New Page
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-1 bg-red-100 text-red-500 rounded-lg hover:bg-red-50 group w-full focus:outline-none active:bg-white"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Logout
                </button>
              </li>
            </ul>

            <ul className="space-y-2 font-medium ml-2">
              <li>
                <small className="text-gray-400">favorite</small>
              </li>
              <li>
                <small className="text-gray-400">private</small>
              </li>

              {data?.map((item, index) => (
                <li key={index} className="group">
                  <a className="flex items-center p-1 text-gray-600 rounded-lg hover:bg-gray-100 group">
                    {item.icon}
                    <Link
                      className="text-cyan-700 hover:underline hover:text-orange-600"
                      to={`/PageUpdate/${item.id}`}
                    >
                      <span className="ml-1">{item.title}</span>
                    </Link>

                    <div className="hidden group-hover:flex ml-2">
                      <span className="rounded text-sm active:text-sky-600 hover:bg-white p-1">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 576 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
                        </svg>
                      </span>
                      <span className="rounded text-sm active:text-sky-600 hover:bg-white p-1">
                        <svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 448 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </span>
                      <span className="rounded text-sm active:text-sky-600 hover:bg-white p-1 text-red-400">
                        <button onClick={() => removeBoards(item.id)}>
                          delete
                        </button>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
