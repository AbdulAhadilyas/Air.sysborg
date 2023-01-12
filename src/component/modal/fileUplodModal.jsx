import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./fileUpload.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MyProgress from "../../component/progressCircle/MyProgress";
import { Progress } from 'antd';
export default function Modal({
  modalState,
  handleSubmit,
  handleClose,
  postFile,
  isLoading,
  progress
}) {
  let theme = localStorage.getItem("theme");

  const buttonSx = {
    color: theme === "dark" ? "#D5D5D5" : "black",
    "&:hover": {
      background:
        theme === "dark"
          ? "linear-gradient( 68.1deg,  rgba(152,25,175,1) -0.1%, rgba(149,22,182,1) 8.2%, rgba(92,21,173,1) 49.1%, rgba(88,22,168,1) 57.9%, rgba(74,17,177,1) 85.2%, rgba(65,17,154,1) 100.1% )"
          : "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      background:
        theme === "dark"
          ? "linear-gradient( 68.1deg,  rgba(152,25,175,1) -0.1%, rgba(149,22,182,1) 8.2%, rgba(92,21,173,1) 49.1%, rgba(88,22,168,1) 57.9%, rgba(74,17,177,1) 85.2%, rgba(65,17,154,1) 100.1% )"
          : "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)",
    },
  };

  return (
    <div>
      <Dialog open={modalState} onClose={handleClose}>

        <>
          <DialogTitle
            sx={{
              backgroundColor: theme === "dark" ? "#181818" : "#D5D5D5",
              color: theme === "dark" ? "#D5D5D5" : "black",
            }}
          >
            Upload File
          </DialogTitle>
          <DialogContent
            sx={{
              backgroundColor: theme === "dark" ? "#181818" : "#D5D5D5",
              color: theme === "dark" ? "#D5D5D5" : "black",
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
            backgroundColor: theme === "dark" ? "#181818" : "#D5D5D5",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              color: theme === "dark" ? "#D5D5D5" : "black",
              "&:hover": {
                background:
                  theme === "dark"
                    ? "linear-gradient( 68.1deg,  rgba(152,25,175,1) -0.1%, rgba(149,22,182,1) 8.2%, rgba(92,21,173,1) 49.1%, rgba(88,22,168,1) 57.9%, rgba(74,17,177,1) 85.2%, rgba(65,17,154,1) 100.1% )"
                    : "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)",
                boxShadow: "none",
              },
              "&:active": {
                boxShadow: "none",
                background:
                  theme === "dark"
                    ? "linear-gradient( 68.1deg,  rgba(152,25,175,1) -0.1%, rgba(149,22,182,1) 8.2%, rgba(92,21,173,1) 49.1%, rgba(88,22,168,1) 57.9%, rgba(74,17,177,1) 85.2%, rgba(65,17,154,1) 100.1% )"
                    : "linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%)",
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
                    color: theme === "dark" ? "#D5D5D5" : "black",
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
