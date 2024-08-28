import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPosts } from "../services";
import Swal from "sweetalert2";

const Post = () => {
  const history = useNavigate();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [Designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]);

  const valid = () => {
    let err = {};

    if (!name) {
      err = { ...err, name: true };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      err = { ...err, email: true };
    } else if (!emailRegex.test(email)) {
      err = { ...err, email: true, emailInvalid: true };
    }

    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if (!mobileNo) {
      err = { ...err, mobileNo: true };
    } else if (!mobileRegex.test(mobileNo)) {
      err = { ...err, mobileNo: true, mobileNoInvalid: true };
    }

    if (!Designation) {
      err = { ...err, Designation: true };
    }
    if (!gender) {
      err = { ...err, gender: true };
    }
    if (course.length === 0) {
      err = { ...err, course: true };
    }
    if (!image) {
      err = { ...err, image: true };
    }

    setErrors(err);
    const result = Object.values(err).some((val) => val === true);
    if (result) {
      return false;
    }
    return true;
  };

  const postData = async (e) => {
    e.preventDefault();
    if (!valid()) {
      return false;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    formData.append("mobileNo", mobileNo);
    formData.append("Designation", Designation);
    formData.append("gender", gender);
    formData.append("course", course.join(","));

    createPosts(formData)
      .then((res) => {
        Swal.fire("Success!", "Employee Added successfully", "success");
        history("/");
      })
      .catch((e) => {
        const message =
          typeof e.response.data.message === "string"
            ? e.response.data.message
            : e.response.data.message;
        Swal.fire("Error!", message, "error");
      });
  };

  const handleNameChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, name: true });
    } else {
      setErrors({ ...errors, name: false });
    }
    setName(val);
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!val) {
      setErrors({ ...errors, email: true, emailInvalid: false });
    } else if (!emailRegex.test(val)) {
      setErrors({ ...errors, email: false, emailInvalid: true });
    } else {
      setErrors({ ...errors, email: false, emailInvalid: false });
    }
    setEmail(val);
  };

  const handleMobileNoChange = (e) => {
    const val = e.target.value;
    const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    if (!val) {
      setErrors({ ...errors, mobileNo: true, mobileNoInvalid: false });
    } else if (!mobileRegex.test(val)) {
      setErrors({ ...errors, mobileNo: false, mobileNoInvalid: true });
    } else {
      setErrors({ ...errors, mobileNo: false, mobileNoInvalid: false });
    }
    setMobileNo(val);
  };

  const handleDesignationChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, Designation: true });
    } else {
      setErrors({ ...errors, Designation: false });
    }
    setDesignation(val);
  };

  const handleGenderChange = (e) => {
    const val = e.target.value;
    if (!val) {
      setErrors({ ...errors, gender: true });
    } else {
      setErrors({ ...errors, gender: false });
    }
    setGender(val);
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    const updatedCourse = course.includes(value)
      ? course.filter((c) => c !== value)
      : [...course, value];

    if (updatedCourse.length === 0) {
      setErrors({ ...errors, course: true });
    } else {
      setErrors({ ...errors, course: false });
    }
    setCourse(updatedCourse);
  };

  const handleImageChange = (e) => {
    const val = e.target.files[0];
    if (!val) {
      setErrors({ ...errors, image: true });
    } else {
      setErrors({ ...errors, image: false });
    }
    setImage(val);
  };

  return (
    <>
      <div
        style={{ height: "100vh", width: "80vw", margin: "auto" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="card">
          <div className="card-header">
            <h3>Create Employee</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={
                    errors.name ? "form-control border-danger" : "form-control"
                  }
                  placeholder="Enter name"
                  onChange={handleNameChange}
                  value={name}
                />
                {errors.name && (
                  <span className="text-danger">Please enter name</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={
                    errors.email ? "form-control border-danger" : "form-control"
                  }
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                  value={email}
                />
                {errors?.email && (
                  <span className="text-danger">
                    Please enter email
                    <br />
                  </span>
                )}
                {errors?.emailInvalid && (
                  <span className="text-danger">
                    Please enter a valid email address
                  </span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="mobileNo" className="form-label">
                  Mobile No
                </label>
                <input
                  type="text"
                  name="mobileNo"
                  id="mobileNo"
                  className={
                    errors.mobileNo
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter mobile no"
                  onChange={handleMobileNoChange}
                  value={mobileNo}
                />
                {errors.mobileNo && (
                  <span className="text-danger">Please enter mobile no</span>
                )}
                {errors?.mobileNoInvalid && (
                  <span className="text-danger">
                    Please enter a valid Mobile no.
                  </span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="designation" className="form-label">
                  Designation
                </label>
                <select
                  name="designation"
                  id="designation"
                  className={
                    errors.Designation
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  onChange={handleDesignationChange}
                  value={Designation}
                >
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
                {errors.Designation && (
                  <span className="text-danger">Please select designation</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleGenderChange}
                    checked={gender === "Male"}
                  />
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleGenderChange}
                    checked={gender === "Female"}
                    className="ms-2"
                  />
                  Female
                </div>
                {errors.gender && (
                  <span className="text-danger">Please select gender</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="course" className="form-label">
                  Course
                </label>
                <div>
                  <input
                    type="checkbox"
                    name="course"
                    value="MCA"
                    onChange={handleCheckboxChange}
                    checked={course.includes("MCA")}
                  />
                  MCA
                  <input
                    type="checkbox"
                    name="course"
                    value="BCA"
                    onChange={handleCheckboxChange}
                    checked={course.includes("BCA")}
                    className="ms-2"
                  />
                  BCA
                  <input
                    type="checkbox"
                    name="course"
                    value="BCS"
                    onChange={handleCheckboxChange}
                    checked={course.includes("BCS")}
                    className="ms-2"
                  />
                  BCS
                </div>
                {errors.course && (
                  <span className="text-danger">Please select course</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className={
                    errors.image ? "form-control border-danger" : "form-control"
                  }
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <span className="text-danger">Please upload an image</span>
                )}
              </div>
              <div className="d-flex justify-content-center mt-2 col-12">
                <button className="btn btn-primary" onClick={postData}>
                  Create Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
