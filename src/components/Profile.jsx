import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deletePosts, getPosts } from "../services";
import DeleteConfirmation from "./DeleteUser";
import "../App.css";
const Profile = () => {
  const [data, setData] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    getPosts() // from axios
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deletePosts(id)
      .then((res) => {
        setData(data.filter((post) => post._id !== id));
        history("/post");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container_post-body">
        <div className="container_post">
          <div className="postdata">
            <tables className="tables">
              <thead className="tables-head">
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>Profile</th>
                <th>mobileNo</th>
                <th>Role</th>
                <th>User_status</th>
                <th>gender</th>
                <th>course</th>
                <th>created_date</th>
                <th>updated_date</th>
                <th>UpdatePost</th>
                <th>DeletePost</th>
              </thead>

              <tbody className="tables-body">
                {data && data.length > 0 ? (
                  data.map((data, index) => (
                    <tr key={index}>
                      <td>{data._id}</td>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>
                        <div className="image">
                          <img
                            // src={data.image?.replace(
                            //   "./files",
                            //   "http://localhost:3000"
                            // )}
                            src={`http://localhost:3000/${data.image}`}
                            alt={data.image}
                            width="100"
                            height="100"
                          />
                        </div>
                      </td>
                      <td>{data.mobileNo}</td>
                      <td>{data.Designation}</td>
                      <td>{data.status}</td>
                      <td>{data.gender}</td>
                      <td>{data.course}</td>
                      <td>
                        {new Date(data.created_date).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(data.updated_date).toLocaleDateString()}
                      </td>

                      <td>
                        <button className="UpdateButton">
                          <Link to={`/updatePost/${data._id}`}>Update</Link>
                        </button>
                      </td>
                      <td>
                        {/* <button
                          className="deleteButton"
                          // onClick={() => setShowModal(true)}
                          onClick={() => showRemoveConfirmation(data._id)}
                        >
                          Delete
                        </button> */}
                        <DeleteConfirmation
                          id={data._id}
                          onDelete={handleDelete}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="no-data">
                    <td colSpan="10">No data available</td>
                  </tr>
                )}
              </tbody>
            </tables>
          </div>
        </div>
      </div>
      <div className="createPostLink">
        <p>
          want to Create Post ? <Link to="/createPost">Create Post</Link>
        </p>
      </div>
    </>
  );
};

export default Profile;
