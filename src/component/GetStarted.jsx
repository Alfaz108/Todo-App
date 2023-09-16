import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAddBoardMutation } from "../Features/apiSlice";

const GetStarted = () => {
  const [addBoard, { data: dataResponse }] = useAddBoardMutation();
  const [defaultTitle, setDefaultTitle] = useState("Alfaz");
  const [defaultDescription, setDefaultDescription] = useState(
    "This is description"
  );

  const navigate = useNavigate();
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

  if (dataResponse) {
    navigate(`/pageUpdate/${dataResponse?._id}`);
  }

  return (
    <div>
      <div className="flex justify-center md:items-start gap-5 min-h-[70vh] flex-col mx-2 md:mx-10">
        <h2 className="md:text-center text-5xl">getting started</h2>
        <p className="max-w-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea hic
          voluptate omnis minu quas soluta facilis porro nihil accusantium
          obcaecati.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
          onClick={handleAddBoard}
        >
          + new
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
