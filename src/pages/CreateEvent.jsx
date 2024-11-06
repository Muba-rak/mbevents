import React, { useState } from "react";
import Layout from "../components/Layout";
import { MdCancel } from "react-icons/md";
import { useForm } from "react-hook-form";
import ActionBtn from "../components/ActionBtn";
import { MdLocationPin } from "react-icons/md";

const CreateEvent = () => {
  const [online, setOnline] = useState(false);
  const [free, setFree] = useState(false);

  const [imgPreview, setImgPreview] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const handleKeyDown = (e) => {
    // Check for Enter or comma to add a tag
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput(""); // Clear input
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const handleImage = () => {
    const fileInput = document.getElementById("imgInput");
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setFileError("File size should not exceed 2MB");
        setImgPreview(null);
      } else {
        setImgPreview(URL.createObjectURL(file));
        setFileError(null);
        setValue("photo", file); // Set the file in react-hook-form
      }
    }
  };
  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <Layout>
      <div className="container my-4">
        <h2 className="fs-4">Create Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="mb-2 position-relative">
            <label htmlFor="photo" className="form-label fs-5 fw-semibold">
              Upload Photo
            </label>
            {imgPreview && (
              <p
                role="button"
                onClick={() => setImgPreview(null)}
                className="z-1 text-danger position-absolute"
                style={{ top: "55px", right: "30px" }}
              >
                <MdCancel size={28} />
              </p>
            )}

            <div
              onClick={handleImage}
              className="rounded-2"
              style={{
                backgroundImage: imgPreview ? `url(${imgPreview})` : "none",
                backgroundColor: imgPreview ? "transparent" : "#d9d9d9",
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                id="imgInput"
                {...register("photo", { required: "Photo is required" })}
                onChange={handleFileChange}
              />

              {!imgPreview && (
                <p className="bg-white rounded-2 p-2 fw-medium">Upload Photo</p>
              )}
            </div>
            {fileError && <p className="text-danger mt-2">{fileError}</p>}
            {errors.photo && (
              <p className="text-danger mt-2">{errors.photo.message}</p>
            )}
          </div>
          {/* end of photo design */}
          <div className="mt-3">
            <label className="form-label fs-4 fw-semibold">
              Time & Location
            </label>
            <div>
              <label htmlFor="date" className="form-label fs-6 fw-semibold">
                Date
              </label>
              <input
                id="date"
                type="date"
                className="form-control shadow-none bg-secondary-subtle py-2"
                placeholder="DD/MM/YYYY"
                style={{ width: "279px" }}
              />
            </div>

            <div className="d-flex flex-wrap gap-3 my-3">
              <div>
                <label htmlFor="start" className="form-label fs-6 fw-semibold">
                  Time (Start)
                </label>
                <input
                  id="start"
                  type="time"
                  className="form-control shadow-none bg-secondary-subtle py-2"
                  placeholder="00:00pm"
                  style={{ width: "279px" }}
                />
              </div>

              <div>
                <label htmlFor="end" className="form-label fs-6 fw-semibold">
                  Time (End)
                </label>
                <input
                  type="time"
                  id="end"
                  className="form-control shadow-none bg-secondary-subtle py-2"
                  placeholder="00:00pm"
                  style={{ width: "279px" }}
                />
              </div>
            </div>
          </div>
          {/* end of time */}
          {/* beginning of location */}
          <div className="my-2">
            <label htmlFor="location" className="form-label fs-6 fw-semibold">
              Location
            </label>
            <div className="d-flex justify-content-between gap-3 align-items-center position-relative">
              <MdLocationPin
                className="position-absolute"
                style={{ left: "3px" }}
              />
              <input
                id="location"
                type="text"
                className="form-control shadow-none bg-secondary-subtle py-2 w-100 ps-4"
                placeholder="Enter Location"
              />
              <div className="form-check form-check-reverse form-switch">
                <input
                  className="form-check-input shadow-none"
                  type="checkbox"
                  role="switch"
                  checked={online}
                  onChange={() => setOnline(!online)}
                />
                <label
                  htmlFor="online"
                  className="form-check-label fs-6 fw-semibold"
                >
                  Online
                </label>
              </div>
            </div>
          </div>

          {/* description */}
          <div className="my-2">
            <label htmlFor="desc" className="form-label fs-4 fw-semibold my-2">
              Description
            </label>
            <textarea
              name=""
              id="desc"
              className="form-control bg-secondary-subtle shadow-none"
              rows="12"
            ></textarea>
          </div>
          {/* start of category */}
          <div className="my-4">
            <label className="form-label fs-4 fw-semibold my-2">
              Categories
            </label>

            <div className="d-flex gap-3 flex-wrap align-items-center">
              <div>
                <label
                  htmlFor="category"
                  className="form-label fs-6 fw-semibold"
                >
                  Select Category
                </label>
                <select
                  id="category"
                  className="form-select shadow-none border border-1 py-2"
                  style={{ width: "241px" }}
                >
                  <option selected>Category</option>
                  <option value="sport">Sports</option>
                  <option value="party">Party</option>
                  <option value="tech">Tech</option>
                  <option value="religion">Religion</option>
                </select>
              </div>
              <div className="">
                <label htmlFor="tags" className="form-label fs-6 fw-semibold">
                  Tags
                </label>
                <div
                  className="d-flex flex-wrap gap-2 "
                  style={{ maxWidth: "454px" }}
                >
                  <input
                    type="text"
                    className="form-control bg-secondary-subtle py-2 shadow-none"
                    style={{ maxWidth: "454px" }}
                    placeholder="Type a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
            <div className="d-flex gap-2 my-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className=" rounded-2 bg-white border border-2 border-secondary text-dark d-flex align-items-center gap-2 px-2 py-1"
                >
                  <span>{tag}</span>
                  <MdCancel
                    size={18}
                    role="button"
                    className="bg-white text-dark rounded-circle border-0"
                    onClick={() => handleRemoveTag(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* end of category */}
          {/* start of pricing */}
          <div style={{ maxWidth: "400px" }}>
            <label className="form-label fs-4 fw-semibold my-2">Pricing</label>
            <div className="my-2 d-flex align-items-center justify-content-between">
              <label className="form-label fs-6 fw-semibold">Free</label>
              <div className="form-switch">
                <input
                  className="form-check-input shadow-none"
                  type="checkbox"
                  role="switch"
                  checked={free}
                  onChange={() => setFree(!free)}
                />
              </div>
            </div>
            <div>
              <label className="form-label fs-6 fw-semibold">Regular</label>
              <input
                type="number"
                className="form-control shadow-none bg-secondary-subtle py-2 w-100"
                placeholder="Regular Ticket"
              />
              <label className="form-label fs-6 fw-semibold mt-3">VIP</label>
              <input
                type="number"
                className="form-control shadow-none bg-secondary-subtle py-2 w-100"
                placeholder="VIP Ticket"
              />
            </div>
          </div>

          {/* end of pricing */}

          {/* submit btn */}
          <div className="d-flex gap-2 align-items-center my-5 justify-content-between">
            <button
              style={{ height: "50px", width: "150px" }}
              className="btn-outline-dark btn border border-2 border-dark fw-bold"
              type="button"
            >
              Cancel
            </button>
            <ActionBtn type="submit" width={"172px"} content="Continue" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateEvent;
