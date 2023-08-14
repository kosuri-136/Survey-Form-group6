import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../../App";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faList,
  faFilter,
  faEdit,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../Surveylist/Surveylist.css";
import Sidebar from "../SideBar/SideBar";
import Navcommon from "../Navbar/Navbar";

const REACT_APP_API_ENDPOINT = "http://localhost:3003";

const Surveylist = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [token] = useContext(Store);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(`${REACT_APP_API_ENDPOINT}/surveys/${email}`);
  }, []);

  const fetchData = (url) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        setSurveys(data.result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedSurvey, setEditedSurvey] = useState({});
  const [newSurvey, setNewSurvey] = useState({
    id: null,
    name: "",
    surveyType: "",
    description: "",
    startDate: "",
    endDate: "",
  });



    // useEffect(()=>{
    //     axios.get("http://localhost:3003/surveylist", {
    //         headers : {
    //           'x-token': token
    //         }
    //     }).then(res => setData(res.data)).catch((err)=> console.log(err))
    //   },[])
  
  
    //   if(!token){
    //     return navigate("/")
    //   }

  
    useEffect(() => {
      if (!token) {
        navigate('/');
      }
    }, [token, navigate]);











  const handleEditSurvey = (surveyId) => {
    const surveyToEdit = surveys.find((survey) => survey._id === surveyId);
    setEditedSurvey(surveyToEdit);
    setIsEditing(true);
  };

  const handleDeleteSurvey = (id) => {
    const email = localStorage.getItem("email");

    fetch(`${REACT_APP_API_ENDPOINT}/survey/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
      })
      .then((data) => {
        setSurveys((prevSurveys) =>
          prevSurveys.filter((survey) => survey._id !== id)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveEditSurvey = () => {
    const updatedSurveys = surveys.map((survey) =>
      survey._id === editedSurvey._id ? editedSurvey : survey
    );
    setSurveys(updatedSurveys);
    setIsEditing(false);
    setEditedSurvey({});
  };

  const handleSaveNewSurvey = () => {
    const updatedSurveys = [...surveys, newSurvey];
    setSurveys(updatedSurveys);
    setNewSurvey({
      id: null,
      name: "",
      surveyType: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    navigate("/createsurvey");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedSurvey({});
  };

  return (
    <>
      <Navcommon />
      <div className="frame">
        <Sidebar />
        <div className="main-list">
          <div className="Survey">
            <div className="list-page">
              <div className="search">
                <div>
                  <h2>
                    Survey List <FontAwesomeIcon icon={faSearch} />{" "}
                  </h2>
                </div>
                <div className="create">
            
                  <FontAwesomeIcon icon={faList} />
                  <FontAwesomeIcon icon={faFilter} />
                  <button className="save" onClick={handleSaveNewSurvey}>
                    Create
                  </button>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {surveys.map((survey) => (
                    <tr key={survey._id}>
                      <td className="table-data">{survey.name}</td>
                      <td className="table-data">{survey.surveyType}</td>
                      <td className="table-data">{survey.description}</td>
                      <td className="table-data">{survey.startDate}</td>
                      <td className="table-data">{survey.endDate}</td>
                      <td>
                        <FontAwesomeIcon
                          className="edit"
                          icon={faEdit}
                          onClick={() => handleEditSurvey(survey._id)}
                        />
                        <FontAwesomeIcon
                          className="edit"
                          icon={faDeleteLeft}
                          onClick={() => handleDeleteSurvey(survey._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isEditing ? (
                <>
                  <h3>Edit Survey</h3>
                  <input
                    type="text"
                    value={editedSurvey.name}
                    onChange={(e) =>
                      setEditedSurvey({
                        ...editedSurvey,
                        name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editedSurvey.surveyType}
                    onChange={(e) =>
                      setEditedSurvey({
                        ...editedSurvey,
                        surveyType: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editedSurvey.description}
                    onChange={(e) =>
                      setEditedSurvey({
                        ...editedSurvey,
                        description: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editedSurvey.startDate}
                    onChange={(e) =>
                      setEditedSurvey({
                        ...editedSurvey,
                        startDate: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    value={editedSurvey.endDate}
                    onChange={(e) =>
                      setEditedSurvey({
                        ...editedSurvey,
                        endDate: e.target.value,
                      })
                    }
                  />
                  <button onClick={handleSaveEditSurvey}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  {/* <h3>Create Survey</h3> */}
                  {/* Input fields for creating new survey */}
                  {/* <button onClick={handleSaveNewSurvey}>Save</button> */}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="foot">
      
      </div>
    </>
  );
};

export default Surveylist;
