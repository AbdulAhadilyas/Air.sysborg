import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./fileUpload.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Progress } from 'antd';
import { GlobalContext } from '../../Context/context';
import { useContext } from "react";


export default function Modal({
  modalState,
  handleSubmit,
  handleClose,
  postFile,
  isLoading,
  progress
}) {
  let { state } = useContext(GlobalContext);


  const buttonSx = {
    color: state.Theme === "dark" ? "#D5D5D5" : "black",
    "&:hover": {
      color: "#D5D5D5",
      background:
      state.Theme === "dark"
      ? "#6C00FF"
      : "#1E2022",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      background:
       state.Theme === "dark"
      ? "#6C00FF"
      : "#1E2022",
    },
  };

  return (
    <div>
      <Dialog open={modalState} onClose={handleClose}>

        <>
          <DialogTitle
            sx={{
              backgroundColor:  state.Theme === "dark" ? "#181818" : "#D5D5D5",
              color:  state.Theme === "dark" ? "#D5D5D5" : "black",
            }}
          >
            Upload File
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor:  state.Theme === "dark" ? "#181818" : "#D5D5D5",
              color:  state.Theme === "dark" ? "#D5D5D5" : "black",
            }}
          >
            {Boolean(progress) ? <div className="progress">
            <Progress type="circle" percent={progress} style={{ marginRight: 8 }} />
            </div> :
              <label htmlFor="images" className="drop-container">
                <span className="drop-title" >Drop files here</span>
                or
                <input
                  type="file"
                  id="images"
                  required
                  onChange={(e) => postFile(e.target.files[0])}
                />
              </label>}
          </DialogContent>
        </>
        <DialogActions
          sx={{
            backgroundColor:  state.Theme === "dark" ? "#181818" : "#D5D5D5",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color:  state.Theme === "dark" ? "#D5D5D5" : "black",
              "&:hover": {
                color: "#D5D5D5",
                background:
                 state.Theme === "dark"
                ? "#6C00FF"
                : "#1E2022",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
                background:
                   state.Theme === "dark"
                    ? "#6C00FF"
                    : "#1E2022",
              },
            }}
          >
            Cancel
          </Button>
          <Box sx={{ m: 1, position: "relative" }}>
            <Button onClick={handleSubmit} disabled={isLoading} sx={buttonSx}>
              Upload
              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color:  state.Theme === "dark" ? "#D5D5D5" : "black",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </div>
  );
}
