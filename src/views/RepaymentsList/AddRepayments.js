/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import { useState } from 'react';

const AddRepayment = (props) => {
  const { open, handleClose, loanData, AddRepaymentData, editRepaymentData, EditRepayments, setEditRepaymentData } = props;

  const userId = localStorage.getItem('user_id');

  const [loanStatus, setLoanStatus] = useState('');

  // -----------  validationSchema
  const validationSchema = yup.object({
    borrowersName: yup.string().required('Borrowers is required'),
    repaymentAmount: yup.string().required('Repayment is required'),
    currentBalance: yup.string().required('Current Balance is required'),
    paymentMethod: yup.string().required('payment Method is required'),
    transactionReference: yup.string().required('Transaction is required')
  });

  // -----------   initialValues
  const initialValues = {
    borrowersName: editRepaymentData ? editRepaymentData.borrowersName : '',
    repaymentAmount: editRepaymentData ? editRepaymentData.repaymentAmount : '',
    currentBalance: editRepaymentData ? editRepaymentData.currentBalance : '',
    paymentMethod: editRepaymentData ? editRepaymentData.paymentMethod : '',
    transactionReference: editRepaymentData ? editRepaymentData.transactionReference : '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const newPayload = {
        ...values,
        loanStatus: loanStatus
      };
      editRepaymentData ? EditRepayments(newPayload) : AddRepaymentData(newPayload);
      handleClose();
      setLoanStatus('');
      setEditRepaymentData('');
      editRepaymentData ? null : toast.success('RePayments Add successfully');
      resetForm();
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
          }}
        >
          <Typography variant="h6"> {editRepaymentData ? 'Edit Repayments ' : 'Create Repayments'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Borrowers Name</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="borrowersName"
                      label=""
                      size="small"
                      value={formik.values.borrowersName || null}
                      onChange={(event) => {
                        const selectedBorrowersLoan = event.target.value;
                        formik.setFieldValue('borrowersName', selectedBorrowersLoan);
                        const selectedLoanRepayment = loanData.find((item) => item.borrowers === selectedBorrowersLoan);
                        if (selectedLoanRepayment) {
                          setLoanStatus(selectedLoanRepayment?.loanStatus);
                          formik.setFieldValue('currentBalance', selectedLoanRepayment.principleAmount);
                        }
                      }}
                      error={formik.touched.borrowersName && Boolean(formik.errors.borrowersName)}
                    >
                      {loanData?.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={`${item?.borrowers}`}>
                            {`${item?.borrowers} `}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.borrowersName && Boolean(formik.errors.borrowersName)}>
                      {formik.touched.borrowersName && formik.errors.borrowersName}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Repayment Amount</FormLabel>
                  <TextField
                    id="repaymentAmount"
                    name="repaymentAmount"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.repaymentAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.repaymentAmount && Boolean(formik.errors.repaymentAmount)}
                    helperText={formik.touched.repaymentAmount && formik.errors.repaymentAmount}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Current Balance</FormLabel>
                  <TextField
                    id="currentBalance"
                    name="currentBalance"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.currentBalance}
                    onChange={formik.handleChange}
                    error={formik.touched.currentBalance && Boolean(formik.errors.currentBalance)}
                    helperText={formik.touched.currentBalance && formik.errors.currentBalance}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Payment method</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="paymentMethod"
                      label=""
                      size="small"
                      value={formik.values.paymentMethod || null}
                      onChange={formik.handleChange}
                      error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
                    >
                      <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                      <MenuItem value="mobileTransfer">Mobile Money</MenuItem>
                      <MenuItem value="cheque">Cheque</MenuItem>
                      <MenuItem value="cash">Cash</MenuItem>
                      <MenuItem value="pemic">PEMIC</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}>
                      {formik.touched.paymentMethod && formik.errors.paymentMethod}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormLabel>Transaction Reference</FormLabel>
                  <TextField
                    id="transactionReference"
                    name="transactionReference"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.transactionReference}
                    onChange={formik.handleChange}
                    error={formik.touched.transactionReference && Boolean(formik.errors.transactionReference)}
                    helperText={formik.touched.transactionReference && formik.errors.transactionReference}
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
              setLoanStatus('');
              setEditRepaymentData('');
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

export default AddRepayment;
