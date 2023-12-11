import React, { useEffect, useState } from "react";
import "./Post.css";
// import houseImg from "./Images/House.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Posts = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImgs, setUploadedImgs] = useState([]);
  const [submitedInfo, setSubmitedInfo] = useState({});
  const [submittedInput, setSubmittedInput] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitedInfo((prevInfo) => ({
      ...prevInfo,
      ...submittedInput,
      uploadedImgs,
    }));
    // console.log(submitedInfo);
    console.log(uploadedImgs);
    // try {
    //   const response = await axios.post(
    //     "http://localhost:8080/test",
    //     submitedInfo
    //   );
    //   console.log("Form submitted successfully");
    //   // Handle successful response
    // } catch (error) {
    //   console.error("Error submitting form");
    //   // Handle error
    // }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setSubmittedInput((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  // function handleCheckboxChange(e) {
  //   const { name, checked } = e.target;
  //   setIsChecked(e.target.isChecked);
  //   setSubmitedInfo((prevInfo) => ({
  //     ...prevInfo,
  //     [name]: checked,
  //   }));
  // }
  useEffect(() => {
    const submitForm = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/post",
          submitedInfo
        );
        setIsChecked(true);
        console.log("Form submitted successfully");
        // Handle successful response
      } catch (error) {
        console.error("Error submitting form");
        // Handle error
      }
    };

    // if (submitedInfo.uploadedImgs.length > 0) {
    submitForm();
    // }
  }, [submitedInfo]);

  const readURL = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log("Readerrr: ", reader.result);
      setUploadedImgs((prevFiles) => {
        return [...prevFiles, reader.result];
      });
      // setSubmitedInfo((prevInfo) => ({
      //   ...prevInfo,
      //   uploadedImgs: uploadedImgs,
      // }));
    };
    reader.onerror = (error) => {
      console.log("Reader: ", error);
    };

    console.log("dkfjadklfj", uploadedImgs);

    // const file = e.target.files[0];
    // console.log("readUrl", e.target.files[0]);
    // setUploadedImgs((prevFiles) => {
    //   return [...prevFiles, URL.createObjectURL(file)];
    // });
    // console.log("readURL", uploadedImgs);
    // setSubmitedInfo((prevInfo) => ({
    //   ...prevInfo,
    //   [uploadedImgs]: uploadedImgs,
    // }));
    // Rest of the code...
  };

  const addNewUpload = () => {
    setUploadedFiles((prevUploadedFiles) => [
      ...prevUploadedFiles,
      { id: Date.now(), note: "" },
    ]);
  };

  const deleteUpload = (id) => {
    setUploadedFiles((prevUploadedFiles) =>
      prevUploadedFiles.filter((file) => file.id !== id)
    );
  };

  const handleDeleteUpload = (e) => {
    if (document.querySelectorAll(".uploadDoc").length > 4) {
      const closestUploadDoc = e.target.closest(".uploadDoc");
      closestUploadDoc.remove();
    } else {
      alert("You have to upload at least 4 document.");
    }
  };

  return (
    <>
      <div className="backgroundPost1"></div>
      <div className="backgroundPost2"></div>
      <div className="backgroundPost3"></div>
      <div className="backgroundPost4"></div>
      <div className="backgroundPost5"></div>
      <div className="backgroundPost">
        {/* <img src={houseImg} alt="houseimage" /> */}
      </div>

      <div className="container">
        <div className="row it">
          <div className="col-sm-offset-1 col-sm-10" id="one">
            <p>Please upload documents only in 'jpg', 'jpeg', 'png' format.</p>
            <br />
            <div className="row">
              <div className="col-sm-offset-4 col-sm-4 form-group">
                <h3 className="text-center">Upload at least 4 Images</h3>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div id="uploader">
                  {uploadedFiles.map((file) => (
                    <div className="row uploadDoc" key={file.id}>
                      <div className="col-sm-3">
                        <div className="docErr">Please upload valid file</div>
                        <div className="fileUpload btn btn-orange">
                          <span className="upl" id="upload">
                            <FontAwesomeIcon icon={faUpload} />
                            Upload Image
                          </span>
                          <input
                            type="file"
                            className="upload up"
                            id="up"
                            onChange={readURL}
                            accept=".jpg, .jpeg, .png"
                          />
                        </div>
                      </div>

                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          name=""
                          placeholder="Note (Optional)"
                        />
                      </div>

                      <div className="closeBtn">
                        <a className="b" onClick={handleDeleteUpload}>
                          <FontAwesomeIcon icon={faClose} />
                        </a>
                      </div>
                    </div>
                  ))}

                  <div className="text-center">
                    <a className="btn btn-new" onClick={addNewUpload}>
                      <FontAwesomeIcon icon={faPlus} /> Add Image
                    </a>
                  </div>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Title: eg - The White House"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Location eg: Mekanisa Street,
                  A.A,Ethiopia"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="area"
                  placeholder="Area (sqMeter)"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="bedrooms"
                  placeholder="Number of Bedroom eg: 2"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  placeholder="Price in ETB"
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="for"
                  placeholder="what is the for, sale or rent"
                  onChange={handleInputChange}
                />
                {/* <div className="checkbox-wrapper-4">
                  <input
                    className="inp-cbx"
                    name="sale"
                    id="morning"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={isChecked}
                  />
                  <label className="cbx" htmlFor="morning">
                    <span>
                      <svg width="12px" height="10px"></svg>
                    </span>
                    <span>Click if it is For Sale</span>
                  </label>
                  <svg className="inline-svg">
                    <symbol id="check-4" viewbox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </symbol>
                  </svg>
                </div> */}
                <div className="text-center">
                  <button className="btn btn-next" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
