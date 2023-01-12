import React, { useEffect } from "react";
import "./Input.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Danger from "../Alert/Danger";

export default function Input({ getClass, getInput, handleOpenModal, uploadFilehandleOpen }) {

  const classIdSchema = Yup.object().shape({
    classId: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Class id is requird"),
  });

  const classId = useFormik({
    initialValues: {
      classId: "",
    },
    validationSchema: classIdSchema,
    onSubmit: async (values) => {
      console.log(values);
      getClass(values)

      // setStdClassId(values)
      // await axios.get(`http://localhost:8000/data/getItem/${values.classId}`)
      //   .then(function (response) {
      //     console.log(response.data);
      //     if (response.data === "No Class Found") {
      //       setIdFound(true)
      //       setClassData("No Class Found")
      //     } else {
      //       console.log("no error")
      //       setClassData(response.data)
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .finally(function () {

      //   });
      // setTimeout(() => {
      //   setIdFound(false)
      // }, 2000);
    },
  }
  );
  const inputSchema = Yup.object().shape({
    inputText: Yup.string()
      .min(5, "Too Short!")
      .required("Please enter something "),
  });
  const classInput = useFormik({
    initialValues: {
      inputText: "",

    },
    validationSchema: inputSchema,
    // validateOnChange:false,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      getInput(values)
    },
  });





  return (
    <>
      <div className="alert">
        <div className="alert-left">
          {/* {idFound ? (
            <Danger errorTxt={classData} />
          ) : null} */}
          {Boolean(classId.errors.classId) ? (
            <Danger errorTxt={classId.errors.classId} />
          ) : null}
          {
            Boolean(classInput.errors.inputText) ? (
              <Danger errorTxt={classInput.errors.inputText} />
            ) : null}
        </div>
      </div>
      <div className="input-box">
        <div className="input-class">
          <form onSubmit={classId.handleSubmit}>
            <div className="input-with-btn">
              <input
                type="text"
                placeholder="Class ID"
                onChange={classId.handleChange}
                name="classId"
                className={Boolean(classId.errors.classId) ? "classValid" : ""}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </form>
        </div>
        <form onSubmit={classInput.handleSubmit} method="get" id="form1">
          <div className="input-add-text">
            <input
              type="text"
              placeholder="Add Item "
              onChange={classInput.handleChange}
              name="inputText"
              className={Boolean(classInput.errors.inputText) ? "isValid" : ""}
              onBlur={classInput.handleBlur}
            />
          </div>
        </form>
        <div className="button-box">
          <div className="button-pad">
            <div className="btn-add">
              <button className="button-36" type="submit" form="form1" value="Submit">
                Submit
              </button>
            </div>
          </div>
          <div className="button-pad">
            <div className="image-upload">
              <label htmlFor="file-input" onClick={uploadFilehandleOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="59"
                  height="59"
                  viewBox="0 0 59 59"
                >
                  <image
                    id="icons8-upload-to-the-cloud-144"
                    width="59"
                    height="59"
                    xlinkHref="data:image/png;base64,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"
                  />
                </svg>
              </label>
              <input id="button"
              
              />
            </div>
          </div>
          <div className="button-pad">
            <div className="btn-cleare">
              <button className="button-36" onClick={handleOpenModal}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
