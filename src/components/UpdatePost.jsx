import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, updatePosts } from "../services";
import Swal from "sweetalert2";

const UpdatePosts = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [Designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState([]);
  const [values, setValues] = useState({
    id: id,
  });
  useEffect(() => {
    getPostById(id)
      .then((res) => {
        setValues(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (values) {
      setImage(values.image);
    }
  }, [values]);

  useEffect(() => {
    getPostById(id)
      .then((res) => {
        const data = res.data.data;
        setName(data.name);
        setEmail(data.email);
        setMobileNo(data.mobileNo);
        setDesignation(data.Designation);
        setGender(data.gender);
        setCourse(data.course.split(", "));
        setImage(null); // Keep the existing image or handle it as needed
      })
      .catch((err) => console.log(err));
  }, [id]);

  const valid = () => {
    let err = {};

    if (!name) {
      err = { ...err, name: true };
    }
    if (!email) {
      err = { ...err, email: true };
    }
    if (!mobileNo) {
      err = { ...err, mobileNo: true };
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
    if (image === null && !image) {
      // Handle existing image properly
      err = { ...err, image: true };
    }

    setErrors(err);
    return Object.values(err).every((val) => !val);
  };

  const postData = async (e) => {
    e.preventDefault();
    if (!valid()) {
      return false;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobileNo", mobileNo);
    formData.append("Designation", Designation);
    formData.append("gender", gender);
    formData.append("course", course.join(", "));

    if (image) {
      formData.append("image", image);
    }

    updatePosts(id, formData)
      .then((res) => {
        Swal.fire("Success!", "Employee updated successfully", "success");
        history("/post");
      })
      .catch((e) => {
        const message =
          typeof e.response.data.message === "string"
            ? e.response.data.message
            : e.response.data.message.join("<br/>");
        Swal.fire("Error!", message, "error");
      });
  };

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "mobileNo":
        setMobileNo(value);
        break;
      case "Designation":
        setDesignation(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "course":
        setCourse((prevCourse) =>
          checked
            ? [...prevCourse, value]
            : prevCourse.filter((c) => c !== value)
        );
        break;
      case "image":
        setImage(files[0]);
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !value,
    }));
  };

  return (
    <>
      <div
        style={{ height: "100vh", width: "80vw", margin: "auto" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="card">
          <div className="card-header">
            <h3>Update Employee</h3>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  value={email}
                />
                {errors.email && (
                  <span className="text-danger">Please enter email</span>
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
                  onChange={handleChange}
                  value={mobileNo}
                />
                {errors.mobileNo && (
                  <span className="text-danger">Please enter mobile no</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="Designation" className="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  name="Designation"
                  id="Designation"
                  className={
                    errors.Designation
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter designation"
                  onChange={handleChange}
                  value={Designation}
                />
                {errors.Designation && (
                  <span className="text-danger">Please enter designation</span>
                )}
              </div>
              <div className="mt-2 form-group">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  className={
                    errors.gender
                      ? "form-control border-danger"
                      : "form-control"
                  }
                  placeholder="Enter gender"
                  onChange={handleChange}
                  value={gender}
                />
                {errors.gender && (
                  <span className="text-danger">Please enter gender</span>
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
                    onChange={handleChange}
                    checked={course.includes("MCA")}
                  />
                  MCA
                  <input
                    type="checkbox"
                    name="course"
                    value="BCA"
                    onChange={handleChange}
                    checked={course.includes("BCA")}
                    className="ms-2"
                  />
                  BCA
                  <input
                    type="checkbox"
                    name="course"
                    value="BCS"
                    onChange={handleChange}
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
                <div>
                  <img
                    src={`http://localhost:3000/${values.image}`}
                    alt={`${values.image}`}
                    width="100"
                    height="100"
                  />
                </div>

                <div>
                  {image && (
                    <img
                      src={`http://localhost:3000/${image}`}
                      alt="Current"
                      width="100"
                      height="100"
                    />
                  )}
                </div>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className={
                    errors.image ? "form-control border-danger" : "form-control"
                  }
                  onChange={handleChange}
                />
                {errors.image && (
                  <span className="text-danger">Please upload an image</span>
                )}
              </div>
              <div className="d-flex justify-content-center mt-2 col-12">
                <button className="btn btn-primary" onClick={postData}>
                  Update Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePosts;

// with only input fields
// import { useNavigate, useParams } from "react-router-dom";
// import { getPostById, updatePosts } from "../services";
// import Swal from "sweetalert2";

// const API = "http://127.0.0.1:3000/post/";

// const UpdatePosts = () => {
//   const { id } = useParams();
//   const history = useNavigate();
//   const [image, setImage] = useState(null);
// const [data, setData] = useState([]);
// const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobileNo, setMobileNo] = useState("");
//   const [Designation, setDesignation] = useState("");
//   const [gender, setGender] = useState("");
//   const [course, setCourse] = useState("");
//   const [values, setValues] = useState({
//     id: id,
//   });
//   useEffect(() => {
//     getPostById(id)
//       .then((res) => {
//         setValues(res.data.data);
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   useEffect(() => {
//     if (values) {
//       setName(values.name);
//       setEmail(values.email);
//       setMobileNo(values.mobileNo);
//       setDesignation(values.Designation);
//       setGender(values.gender);
//       setCourse(values.course);
//       setImage(values.image);
//     }
//   }, [values]);

//   const valid = () => {
//     let err = {};

//     if (!name) {
//       err = { ...err, name: true };
//     }
//     if (!email) {
//       err = { ...err, email: true };
//     }
//     if (!mobileNo) {
//       err = { ...err, mobileNo: true };
//     }
//     if (!Designation) {
//       err = { ...err, Designation: true };
//     }
//     if (!gender) {
//       err = { ...err, gender: true };
//     }
//     if (!course) {
//       err = { ...err, course: true };
//     }
//     if (!image) {
//       err = { ...err, image: true };
//     }

//     setErrors(err);
//     const result = Object.values(err)?.some((val) => val === true);
//     if (result) {
//       return false;
//     }
//     return true;
//   };

//   const postData = async (e) => {
//     e.preventDefault();
//     if (!valid()) {
//       return false;
//     }
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("image", image);
//     formData.append("mobileNo", mobileNo);
//     formData.append("Designation", Designation);
//     formData.append("gender", gender);
//     formData.append("course", course);

//     updatePosts(id, formData)
//       .then((res) => {
//         localStorage.setItem("useremail", res?.data?.data?.userName);
//         history("/post");
//       })
//       .catch((e) => {
//         const message =
//           typeof e?.response?.data?.message === "string"
//             ? e?.response?.data?.message
//             : e?.response?.data?.message?.join("<br/>");
//         Swal.fire("Error!", message, "error");
//       });
//   };

//   const nameChange = (e) => {
//     const val = e.target.value;
//     if (!val) {
//       setErrors({ ...errors, name: true });
//     } else {
//       setErrors({ ...errors, name: false });
//     }
//     setName(val);
//   };
//   const emailChange = (e) => {
//     const val = e.target.value;
//     if (!val) {
//       setErrors({ ...errors, email: true });
//     } else {
//       setErrors({ ...errors, email: false });
//     }
//     setEmail(val);
//   };
//   const designationChange = (e) => {
//     const val = e.target.value;
//     if (!val) {
//       setErrors({ ...errors, Designation: true });
//     } else {
//       setErrors({ ...errors, Designation: false });
//     }
//     setDesignation(val);
//   };
//   const genderChange = (e) => {
//     const val = e.target.value;
//     if (!val) {
//       setErrors({ ...errors, gender: true });
//     } else {
//       setErrors({ ...errors, gender: false });
//     }
//     setGender(val);
//   };
//   const courseChange = (e) => {
//     const val = e.target.value;
//     if (!val) {
//       setErrors({ ...errors, course: true });
//     } else {
//       setErrors({ ...errors, course: false });
//     }
//     setCourse(val);
//   };
//   const imageChange = (e) => {
//     const val = e.target.files[0];
//     if (!val) {
//       setErrors({ ...errors, image: true });
//     } else {
//       setErrors({ ...errors, image: false });
//     }
//     setImage(val);
//   };
//   const mobileNoChange = (e) => {
//     const val = e.target.value;
//     if (!val) {
//       setErrors({ ...errors, mobileNo: true });
//     } else {
//       setErrors({ ...errors, mobileNo: false });
//     }
//     setMobileNo(val);
//   };

//   return (
//     <>
//       <div
//         style={{ height: "100vh", width: "80vw", margin: "auto" }}
//         className="d-flex align-items-center justify-content-center"
//       >
//         <div className="card">
//           <div className="card-header">
//             <h3>Create Employee</h3>
//           </div>
//           <div className="card-body">
//             <div className="row">
//               <div className="form-group">
//                 <label htmlFor="name" className="form-label">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   id="name"
//                   className={
//                     errors?.name ? "form-control border-danger" : "form-control"
//                   }
//                   placeholder="Enter name"
//                   onChange={nameChange}
//                   value={name}
//                 />
//                 {errors?.name && (
//                   <span className="text-danger">Please enter name</span>
//                 )}
//               </div>
//               <div className="mt-2 form-group">
//                 <label htmlFor="email" className="form-label">
//                   email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   id="email"
//                   className={
//                     errors?.email
//                       ? "form-control border-danger"
//                       : "form-control"
//                   }
//                   placeholder="Enter email"
//                   onChange={emailChange}
//                   value={email}
//                 />
//                 {errors?.email && (
//                   <span className="text-danger">Please enter email</span>
//                 )}
//               </div>
//               <div className="mt-2 form-group">
//                 <label htmlFor="mobileNo" className="form-label">
//                   mobileNo
//                 </label>
//                 <input
//                   type="text"
//                   name="mobileNo"
//                   id="mobileNo"
//                   className={
//                     errors?.mobileNo
//                       ? "form-control border-danger"
//                       : "form-control"
//                   }
//                   placeholder="Enter mobileNo"
//                   onChange={mobileNoChange}
//                   value={mobileNo}
//                 />
//                 {errors?.mobileNo && (
//                   <span className="text-danger">Please enter mobileNo</span>
//                 )}
//               </div>
//               <div className="mt-2 form-group">
//                 <label htmlFor="Designation" className="form-label">
//                   Designation
//                 </label>
//                 <input
//                   type="text"
//                   name="Designation"
//                   id="Designation"
//                   className={
//                     errors?.Designation
//                       ? "form-control border-danger"
//                       : "form-control"
//                   }
//                   placeholder="Enter Designation"
//                   onChange={designationChange}
//                   value={Designation}
//                 />
//                 {errors?.Designation && (
//                   <span className="text-danger">Please enter Designation</span>
//                 )}
//               </div>

//               <div className="mt-2 form-group">
//                 <label htmlFor="gender" className="form-label">
//                   gender
//                 </label>
//                 <input
//                   type="text"
//                   name="gender"
//                   id="gender"
//                   className={
//                     errors?.gender
//                       ? "form-control border-danger"
//                       : "form-control"
//                   }
//                   placeholder="Enter gender"
//                   onChange={genderChange}
//                   value={gender}
//                 />
//                 {errors?.gender && (
//                   <span className="text-danger">Please enter gender</span>
//                 )}
//               </div>
//               <div className="mt-2 form-group">
//                 <label htmlFor="course" className="form-label">
//                   course
//                 </label>
//                 <input
//                   type="text"
//                   name="course"
//                   id="course"
//                   className={
//                     errors?.course
//                       ? "form-control border-danger"
//                       : "form-control"
//                   }
//                   placeholder="Enter course"
//                   onChange={courseChange}
//                   value={course}
//                 />
//                 {errors?.course && (
//                   <span className="text-danger">Please enter course</span>
//                 )}
//               </div>
//               <div className="mt-2 form-group">
//                 <label htmlFor="image" className="form-label">
//                   Image
//                 </label>
//                 <div>
//                   <img
//                     src={http://localhost:3000/${values.image}}
//                     alt={${values.image}}
//                     width="100"
//                     height="100"
//                   />
//                 </div>
//                 <input
//                   type="file"
//                   name="image"
//                   id="image"
//                   className={
//                     errors?.image
//                       ? "form-control border-danger"
//                       : "form-control"
//                   }
//                   placeholder="Enter image"
//                   onChange={imageChange}
//                   // value={image}
//                 />
//                 {errors?.image && (
//                   <span className="text-danger">Please enter image</span>
//                 )}
//               </div>
//               <div className="d-flex justify-content-center mt-2 col-12">
//                 <button className="btn btn-primary" onClick={postData}>
//                   Update Employee
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpdatePosts;
