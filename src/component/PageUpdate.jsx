import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useEditBoardsMutation,
  useGetSectionQuery,
  useAddSectionMutation,
  useRemoveSectionMutation,
  useEditSectionMutation,
} from "../Features/apiSlice";

const PageUpdate = () => {
  const { id } = useParams();
  const { data: boardSection } = useGetSectionQuery(id);
  const sections = boardSection?.sections;

  const [editBoards] = useEditBoardsMutation();
  // const [updateData, setUpdateData] = useState({});

  let timer;
  const waitTime = 1000;

  const onChangeHandler = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // setUpdateData({ ...updateData, [e.target.name]: e.target.value });
      editBoards({ id: id, title: e.target.value });
    }, waitTime);
  };
  const onChangeHandlerDescription = (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // setUpdateData({ ...updateData, [e.target.name]: e.target.value });
      editBoards({ id: id, description: e.target.value });
    }, waitTime);
  };

  // const handpress = () => {
  //   clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     editBoards({ id: id, data: updateData });
  //   }, waitTime);
  // };

  const [addSection] = useAddSectionMutation();

  const handleAddSection = async (e) => {
    e.preventDefault();
    try {
      const defaultSectionData = {
        title: "Default Title",
      };
      const { data: addedSection } = await addSection({
        id: id,
        data: defaultSectionData,
      });
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  const [removeSection] = useRemoveSectionMutation();

  const handleRemoveSection = (sectionId, e) => {
    e.preventDefault();
    removeSection({ id: id, id2: sectionId });
  };

  const [editSection] = useEditSectionMutation();
  const [sectionData, setSectionData] = useState({});

  useEffect(() => {
    if (sections) {
      const initialSectionData = {};
      sections.forEach((section) => {
        initialSectionData[section._id] = { ...section };
      });
      setSectionData(initialSectionData);
    }
  }, [sections]);

  const onChangeSectionHandler = (e, sectionId) => {
    setSectionData({
      ...sectionData,
      [sectionId]: {
        ...sectionData[sectionId],
        title: e.target.value, // Update the 'title' property
      },
    });
  };

  const handSecionPress = (sectionId) => {
    editSection({ id: id, id2: sectionId, data: sectionData[sectionId] });
  };

  return (
    <div>
      <form>
        <div className="p-2 flex-col rounded max-w-4xl flex  mx-auto my-5 min-h-screen">
          <h1
            className="text-4xl flex gap-2 items-center text-gray-700 font-bold"
            style={{ position: "relative" }}
          >
            <button>{boardSection?.icon || "Default Icon"}</button>

            <div
              style={{
                display: "none",
                position: "absolute",
                top: "100%",
                zIndex: 9999,
              }}
            >
              <div>
                <em-emoji-picker />
              </div>
            </div>
          </h1>
          <div style={{ display: "none", top: "100%", zIndex: 9999 }}>
            <div>
              <em-emoji-picker />
            </div>
          </div>
          <h2 className="text-4xl mb-5">
            <input
              type="text"
              className="debounce_input outline-none"
              name="title"
              defaultValue={boardSection?.title}
              onChange={onChangeHandler}
            />
          </h2>
          <p>
            <textarea
              className="debounce_input_textarea outline-none	resize-none h-[50px] overflow-hidden w-full border-0;"
              name="description"
              defaultValue={boardSection?.description}
              onChange={onChangeHandlerDescription}
            />
          </p>
          <button
            className="text-start flex items-center gap-2 p-1 text-red-500 rounded-lg  group w-full focus:outline-none active:bg-white"
            onClick={handleAddSection}
          >
            Add section
          </button>
          <span className="h-[.1px] w-full bg-gray-600 mb-3" />
          <div className="d-flex" />
          {sections?.map((item) => (
            <div
              key={item._id}
              id="scrollContainer"
              className="flex flex-no-wrap overflow-x-auto scrolling-touch items-start mb-8"
            >
              <form onKeyUp={() => handSecionPress(item._id)}>
                <div className="flex-none w-2/3 md:w-1/3 mr-8 md:pb-4 p-2 bg-gray-50 rounded-lg">
                  <h4 className="font-bold my-2 flex gap-2 items-center">
                    <input
                      type="text"
                      className="outline-none"
                      defaultValue={item.title || "untitled"}
                      onChange={(e) => onChangeSectionHandler(e, item._id)}
                    />
                    <button onClick={(e) => handleRemoveSection(item._id, e)}>
                      Delete
                    </button>
                  </h4>
                  <button>Add todo</button>
                </div>
              </form>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default PageUpdate;
