import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"

const TagInput = ({ name, label, register, setValue, getValues ,Style}) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { editCourse, course } = useSelector((state) => state.course)
  
  
  useEffect(() => {
    if (editCourse) {
      setTags(JSON.parse(course?.tag))
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, tags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])

  //add in tags array
  function addTags(e) {
    e.preventDefault();

    if (inputValue) {
      const newTag=[...tags,inputValue]
      setTags(newTag);
      setInputValue("");
    }
  }

  // remove from the tags array
  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <div>
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <div
              key={index}
              className="inline-block bg-richblue-600 rounded-md p-2 mr-2 mb-2 text-richblue-100 font-bold"
            >
              <span>{tag}</span>
              <button
                className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() => handleTagRemove(tag)}
              >
                &times;
              </button>
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-1 ">
        <p className="text-richblack-50">{label} <sup>*</sup></p>
        <input
          type="text"
          name={name}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder=" Enter to add a tag"
          className={Style} 
       
        />
        <div className="my-1">
          <button
            onClick={(e) => addTags(e)}
            className="bg-yellow-50 text-richblack-900 font-bold px-6  py-2 rounded-md"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagInput;
