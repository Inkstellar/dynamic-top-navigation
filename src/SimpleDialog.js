import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, makeActive } from './store/slice';

const SimpleDialog = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);
  const elementRef = React.useRef();
  const [tab, setTab] = React.useState();
  const dispatch = useDispatch();

  React.useImperativeHandle(ref, () => ({
    openDialog: () => {
      handleClickOpen();
    },
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (event) => {
    setTab((prev) => (prev = event.target.value));
  };

  const addMenuItem = () => {
    if (tab) {
      dispatch(addItem(tab));
      dispatch(makeActive(tab));
      setOpen(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        ref={elementRef}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Enter name for a new Tab'}
        </DialogTitle>
        <DialogContent>
          <input type="text" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addMenuItem} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default SimpleDialog;
