import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GlobalContext } from '../../Context/context';
import { useContext } from "react";

export default function Modal({ modalState, handleSubmit, handleClose, adminPass, ifError }) {
  let {state} = useContext(GlobalContext);
  return (
    <div>
      <Dialog open={modalState} onClose={handleClose} >
        <DialogTitle sx={{
          "backgroundColor": state.Theme === "dark" ? "#181818" : "#D5D5D5",
          "color": state.Theme === "dark" ? "#D5D5D5" : "black"
        }}>Remove</DialogTitle>
        <DialogContent sx={{
          "backgroundColor": state.Theme === "dark" ? "#181818" : "#D5D5D5",
          "color": state.Theme === "dark" ? "#D5D5D5" : "black"
        }}>
          <DialogContentText sx={{

            "color": state.Theme === "dark" ? "#D5D5D5" : "black"
          }}>
            Please Enter The Admin Password To Remove
          </DialogContentText>
          <TextField
            autoFocus
            error={ifError}
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            helperText="Incorrect password."
            sx={{
              "& .MuiInputLabel-root": { color: state.Theme === "dark" ? "#D5D5D5" : "black" },//styles the label
              "&:not(.Mui-disabled)": {
                borderColor: "red"
              },
              '& .MuiInput-underline:before': { borderBottomColor: state.Theme === "dark"
              ? "#6C00FF"
              : "#1E2022", },
              '& .MuiInput-underline:after': { borderBottomColor: state.Theme === "dark"
              ? "#6C00FF"
              : "#1E2022",},

              '& .MuiInputBase-root': {
                color: state.Theme === "dark" ? "#D5D5D5" : "black",
              },
            }}
            onChange={(e) => adminPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{
          "backgroundColor": state.Theme === "dark" ? "#181818" : "#D5D5D5",
          "color": state.Theme === "dark" ? "#D5D5D5" : "black"
        }}>
          <Button onClick={handleClose} sx={{
            "color": state.Theme === "dark" ? "#D5D5D5" : "black",
            '&:hover': {
              backgroundColor: state.Theme === "dark"
                ? "#6C00FF"
                : "#1E2022",
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
              backgroundColor: state.Theme === "dark"
                ? "#6C00FF"
                : "#1E2022",
            },
          }}>Cancel</Button>
          <Button onClick={handleSubmit} sx={{
            "color": state.Theme === "dark" ? "#D5D5D5" : "black",
            '&:hover': {
              backgroundColor: state.Theme === "dark"
                ? "#6C00FF"
                : "#1E2022",
              boxShadow: 'none',
            },
            '&:active': {
              boxShadow: 'none',
              backgroundColor: state.Theme === "dark"
                ? "#6C00FF"
                : "#1E2022",
            },
          }}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
