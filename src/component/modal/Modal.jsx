import Button from '@mui/material/Button';
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function Modal({ modalState, handleSubmit, handleClose ,adminPass ,ifError}) {
  return (
    <div>
     
      <Dialog open={modalState} onClose={handleClose} >
        <DialogTitle sx={{
          "backgroundColor": "#181818",
          "color": "white"
        }}>Remove</DialogTitle>
        <DialogContent sx={{
          "backgroundColor": "#181818",
          "color": "white"
        }}>
          <DialogContentText sx={{

            "color": "white"
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
              "& .MuiInputLabel-root": { color: 'white' },//styles the label
              "&:not(.Mui-disabled)": {
                borderColor: "red"
              },
              '& .MuiInput-underline:before': { borderBottomColor: 'purple' },
              '& .MuiInput-underline:after': { borderBottomColor: 'purple' },

              '& .MuiInputBase-root': {
                color: 'white',
              },
            }}
            onChange={(e)=>adminPass(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{
          "backgroundColor": "#181818",
          "color": "white"
        }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

}
