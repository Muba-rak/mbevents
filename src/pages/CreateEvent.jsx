import React, { useState } from "react";
import Layout from "../components/Layout";
import { MdCancel, MdLocationPin } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ActionBtn from "../components/ActionBtn";
import SuccessModal from "../components/SuccessModal";

// Define Yup validation schema
const schema = yup.object().shape({
  photo: yup
    .mixed()
    .required("Photo is required")
    .test("fileSize", "File size should not exceed 2MB", (value) => {
      return value && value.size <= 2 * 1024 * 1024;
    }),
  date: yup
    .date()
    .required("Date is required")
    .typeError("Please enter a valid date"),
  startTime: yup
    .string()
    .required("Start time is required")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid start time"
    ),
  endTime: yup
    .string()
    .required("End time is required")
    .matches(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please enter a valid end time"
    ),
  location: yup.string().when("online", {
    is: false,
    then: yup.string().required("Location is required for in-person events"),
    otherwise: yup.string(),
  }),
  online: yup.boolean(),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters"),
  category: yup
    .string()
    .required("Category is required")
    .oneOf(["sport", "party", "tech", "religion"], "Select a valid category"),
  tags: yup
    .array()
    .of(yup.string().min(2, "Each tag should be at least 2 characters"))
    .min(1, "At least one tag is required"),
  free: yup.boolean(),
  regularPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .when("free", {
      is: false,
      then: yup
        .number()
        .typeError("Please enter a valid price")
        .positive("Regular price must be a positive number")
        .required("Regular price is required"),
      otherwise: yup.number().nullable(),
    }),
  vipPrice: yup
    .number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue.trim() === "" ? null : value
    )
    .when("free", {
      is: false,
      then: yup
        .number()
        .typeError("Please enter a valid price")
        .positive("VIP price must be a positive number")
        .required("VIP price is required"),
      otherwise: yup.number().nullable(),
    }),
});

const CreateEvent = () => {
  const [online, setOnline] = useState(false);
  const [free, setFree] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      online: false,
      free: false,
    },
  });
  console.log(errors);

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleImage = () => {
    const fileInput = document.getElementById("imgInput");
    fileInput.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImgPreview(null);
      } else {
        setImgPreview(URL.createObjectURL(file));
        setValue("photo", file);
      }
    }
  };

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <Layout>
      {showModal && <SuccessModal showModal={showModal} />}
      <div className="container my-4">
        <h2 className="fs-4">Create Event</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Image Upload */}
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
                {...register("photo")}
                onChange={handleFileChange}
              />
              {!imgPreview && (
                <p className="bg-white rounded-2 p-2 fw-medium">Upload Photo</p>
              )}
            </div>
            {errors.photo && (
              <p className="text-danger">{errors.photo.message}</p>
            )}
          </div>

          {/* Date and Time */}
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
                {...register("date")}
                style={{ width: "279px" }}
              />
              {errors.date && (
                <p className="text-danger">{errors.date.message}</p>
              )}
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
                  {...register("startTime")}
                  style={{ width: "279px" }}
                />
                {errors.startTime && (
                  <p className="text-danger">{errors.startTime.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="end" className="form-label fs-6 fw-semibold">
                  Time (End)
                </label>
                <input
                  type="time"
                  id="end"
                  className="form-control shadow-none bg-secondary-subtle py-2"
                  {...register("endTime")}
                  style={{ width: "279px" }}
                />
                {errors.endTime && (
                  <p className="text-danger">{errors.endTime.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location */}
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
                {...register("location")}
              />
              {errors.location && (
                <p className="text-danger">{errors.location.message}</p>
              )}
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

          {/* Description */}
          <div className="my-2">
            <label htmlFor="desc" className="form-label fs-4 fw-semibold my-2">
              Description
            </label>
            <textarea
              id="desc"
              className="form-control bg-secondary-subtle shadow-none"
              rows="12"
              {...register("description")}
            ></textarea>
            {errors.description && (
              <p className="text-danger">{errors.description.message}</p>
            )}
          </div>

          {/* Add more form fields similarly and apply validations */}
          {/* Categories */}
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
                  {...register("category")}
                >
                  <option value="" disabled>
                    Category
                  </option>
                  <option value="sport">Sports</option>
                  <option value="party">Party</option>
                  <option value="tech">Tech</option>
                  <option value="religion">Religion</option>
                </select>
                {errors.category && (
                  <p className="text-danger">{errors.category.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="tags" className="form-label fs-6 fw-semibold">
                  Tags
                </label>
                <div
                  className="d-flex flex-wrap gap-2"
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
                {errors.tags && (
                  <p className="text-danger">{errors.tags.message}</p>
                )}
              </div>
            </div>
            <div className="d-flex gap-2 my-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="rounded-2 bg-white border border-2 border-secondary text-dark d-flex align-items-center gap-2 px-2 py-1"
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

          {/* Pricing */}
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
                  {...register("free")}
                />
              </div>
            </div>
            <div>
              <label className="form-label fs-6 fw-semibold">Regular</label>
              <input
                type="number"
                className="form-control shadow-none bg-secondary-subtle py-2 w-100"
                placeholder="Regular Ticket"
                {...register("regularPrice")}
              />
              {errors.regularPrice && (
                <p className="text-danger">{errors.regularPrice.message}</p>
              )}
              <label className="form-label fs-6 fw-semibold mt-3">VIP</label>
              <input
                type="number"
                className="form-control shadow-none bg-secondary-subtle py-2 w-100"
                placeholder="VIP Ticket"
                {...register("vipPrice")}
              />
              {errors.vipPrice && (
                <p className="text-danger">{errors.vipPrice.message}</p>
              )}
            </div>
          </div>

          {/* Submit button */}
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
