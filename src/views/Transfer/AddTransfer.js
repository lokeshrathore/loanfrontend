/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from 'react-toastify';

const AddTransfer = ({ open, handleClose, walletData, AddTransferData }) => {
  const userId = localStorage.getItem('user_id');

  const validationSchema = yup.object({
    fromAccount: yup.string().required('From Account is required'),
    toAccount: yup.string().required('To Account is required'),
    amount: yup.string().required('Amount is required')
  });

  const initialValues = {
    fromAccount: '',
    toAccount: '',
    amount: '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('transferValues', values);
      AddTransferData(values);
      handleClose();
      formik.resetForm();
      toast.success('Transfer Add successfully');
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6">Fund Transfer </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12}>
                  <FormLabel>From this Account</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="fromAccount"
                      label=""
                      size="small"
                      value={formik.values.fromAccount}
                      onChange={formik.handleChange}
                      error={formik.touched.fromAccount && Boolean(formik.errors.fromAccount)}
                    >
                      {walletData?.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={`${item?.walletName}`}>
                            {`${item?.walletName}- Balance: ${item?.addFunds}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.fromAccount && Boolean(formik.errors.fromAccount)}>
                      {formik.touched.fromAccount && formik.errors.fromAccount}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormLabel>To this account</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="toAccount"
                      label=""
                      size="small"
                      value={formik.values.toAccount}
                      onChange={formik.handleChange}
                      error={formik.touched.toAccount && Boolean(formik.errors.toAccount)}
                    >
                      {walletData?.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={`${item?.walletName}`}>
                            {`${item?.walletName}- Balance: ${item?.addFunds}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.toAccount && Boolean(formik.errors.toAccount)}>
                      {formik.touched.toAccount && formik.errors.toAccount}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormLabel id="demo-row-radio-buttons-group-label">Amount to transfer</FormLabel>
                  <TextField
                    id="amount"
                    name="amount"
                    label=""
                    fullWidth
                    type="number"
                    size="small"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    error={formik.touched.amount && Boolean(formik.errors.amount)}
                    helperText={formik.touched.amount && formik.errors.amount}
                  />
                </Grid>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }} color="secondary">
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            onClick={() => {
              formik.resetForm();
              handleClose();
            }}
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTransfer;
