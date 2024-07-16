/* eslint-disable react-hooks/exhaustive-deps */
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
// import { useEffect, useState } from 'react';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select } from '@mui/material';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

const AddLoans = (props) => {
  const { open, handleClose, AddLoanData, loanTypeData, borrowerData, walletData, editLoanData, setEditLoanData, UpDateLoanData } = props;

  const userId = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    loanType: yup.string().required('loan Type is required'),
    borrowers: yup.string().required('Borrowers is required'),
    loanStatus: yup.string().required('loan Status is required'),
    principleAmount: yup.string().required('principle Amount  is required'),
    loanDuration: yup.string().required('loan Duration is required'),
    durationPeriod: yup.string().required('Duration Period is required'),
    releaseDate: yup.string().required('Release Date To is required'),
    repaymentAmount: yup.string().required('Release Date is required'),
    interestAmount: yup.string().required('Repayment Amount is required'),
    interestRate: yup.string().required('Interest Rate is required'),
    fromAccount: yup.string().required('fromAccount is required'),
    TransactionReference: yup.string().required('Transaction Reference is required')
  });

  // -----------   initialValues
  const initialValues = {
    loanType: editLoanData ? editLoanData.loanType : '',
    borrowers: editLoanData ? editLoanData.borrowers : '',
    loanStatus: editLoanData ? editLoanData.loanStatus : '',
    principleAmount: editLoanData ? editLoanData.principleAmount : '',
    loanDuration: editLoanData ? editLoanData.loanDuration : '',
    durationPeriod: editLoanData ? editLoanData.durationPeriod : '',
    releaseDate: editLoanData ? editLoanData.releaseDate : '',
    repaymentAmount: editLoanData ? editLoanData.repaymentAmount : '',
    interestAmount: editLoanData ? editLoanData.interestAmount : '',
    interestRate: editLoanData ? editLoanData.interestRate : '',
    fromAccount: editLoanData ? editLoanData.fromAccount : '',
    TransactionReference: editLoanData ? editLoanData.TransactionReference : '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      editLoanData ? UpDateLoanData(values) : AddLoanData(values);
      handleClose();
      setEditLoanData('');
      editLoanData ? null : toast.success(' Add Loans successfully');
      resetForm();
    }
  });

  const calculateInterest = (principleAmount, interestRate, duration, period) => {
    let ratePerPeriod = 0;

    switch (period) {
      case 'daily':
        ratePerPeriod = interestRate / 365; // Assuming 365 days in a year
        break;
      case 'weekly':
        ratePerPeriod = interestRate / 52; // Assuming 52 weeks in a year
        break;
      case 'monthly':
        ratePerPeriod = interestRate / 12; // Assuming 12 months in a year
        break;
      case 'yearly':
        ratePerPeriod = interestRate;
        break;
      default:
        return 0;
    }

    return (principleAmount * ratePerPeriod * duration) / 100;
  };

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
          <Typography variant="h6"> {editLoanData ? 'Edit Loan' : 'Create Loan '}</Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Type</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="loanType"
                      label=""
                      size="small"
                      value={formik.values.loanType}
                      onChange={(event) => {
                        const selectedLoanType = event.target.value;
                        formik.setFieldValue('loanType', selectedLoanType);

                        // Determine and set corresponding values for duration or interest rate
                        const selectedLoan = loanTypeData.find((item) => item.loanName === selectedLoanType);
                        if (selectedLoan) {
                          // Assuming duration and interest rate fields are available in formik.values
                          formik.setFieldValue('durationPeriod', selectedLoan.interestCycle);
                          formik.setFieldValue('interestRate', selectedLoan.interestRate);
                        }
                      }}
                      error={formik.touched.loanType && Boolean(formik.errors.loanType)}
                    >
                      {loanTypeData?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item.loanName}>
                            {item.loanName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.loanType && Boolean(formik.errors.loanType)}>
                      {formik.touched.loanType && formik.errors.loanType}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Borrowers</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="borrowers"
                      label=""
                      size="small"
                      value={formik.values.borrowers || null}
                      onChange={formik.handleChange}
                      error={formik.touched.borrowers && Boolean(formik.errors.borrowers)}
                    >
                      {borrowerData?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item.firstName}>
                            {`${item.firstName}${item.lastName}-${item.phoneNumber}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.borrowers && Boolean(formik.errors.borrowers)}>
                      {formik.touched.borrowers && formik.errors.borrowers}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Status</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="loanStatus"
                      label=""
                      size="small"
                      value={formik.values.loanStatus || null}
                      onChange={formik.handleChange}
                      error={formik.touched.loanStatus && Boolean(formik.errors.loanStatus)}
                    >
                      <MenuItem value="partially">Requested</MenuItem>
                      <MenuItem value="pending">Processing</MenuItem>
                      <MenuItem value="approved">Approved</MenuItem>
                      <MenuItem value="denied">Denied</MenuItem>
                      <MenuItem value="defaulted">Defaulted</MenuItem>
                      <MenuItem value="fullyPaid">Fully Paid</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.loanStatus && Boolean(formik.errors.loanStatus)}>
                      {formik.touched.loanStatus && formik.errors.loanStatus}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Principle Amount</FormLabel>
                  <TextField
                    id="principleAmount"
                    name="principleAmount"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.principleAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.principleAmount && Boolean(formik.errors.principleAmount)}
                    helperText={formik.touched.principleAmount && formik.errors.principleAmount}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Duration</FormLabel>
                  <TextField
                    id="loanDuration"
                    name="loanDuration"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.loanDuration}
                    onChange={(event) => {
                      const loanDuration = event.target.value;
                      formik.setFieldValue('loanDuration', loanDuration);

                      // Calculate interest amount based on principle amount, interest rate, and duration
                      const principleAmount = formik.values.principleAmount;
                      const interestRate = formik.values.interestRate;
                      const durationPeriod = formik.values.durationPeriod;
                      const interestAmount = calculateInterest(principleAmount, interestRate, loanDuration, durationPeriod);
                      // Set the calculated interest amount value in the form
                      formik.setFieldValue('interestAmount', parseInt(interestAmount));
                      formik.setFieldValue('repaymentAmount', principleAmount + parseInt(interestAmount));
                    }}
                    error={formik.touched.loanDuration && Boolean(formik.errors.loanDuration)}
                    helperText={formik.touched.loanDuration && formik.errors.loanDuration}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Duration Period</FormLabel>
                  <TextField
                    id="durationPeriod"
                    name="durationPeriod"
                    size="small"
                    fullWidth
                    value={formik.values.durationPeriod}
                    onChange={formik.handleChange}
                    error={formik.touched.durationPeriod && Boolean(formik.errors.durationPeriod)}
                    helperText={formik.touched.durationPeriod && formik.errors.durationPeriod}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Loan Release Date</FormLabel>
                  <TextField
                    name="releaseDate"
                    type={'date'}
                    size="small"
                    fullWidth
                    value={dayjs(formik.values.releaseDate).format('YYYY-MM-DD')}
                    onChange={formik.handleChange}
                    error={formik.touched.releaseDate && Boolean(formik.errors.releaseDate)}
                    helperText={formik.touched.releaseDate && formik.errors.releaseDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Repayment Amount</FormLabel>
                  <TextField
                    id="repaymentAmount"
                    name="repaymentAmount"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.repaymentAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.loanDuration && Boolean(formik.errors.repaymentAmount)}
                    helperText={formik.touched.repaymentAmount && formik.errors.repaymentAmount}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormLabel>Interest Amount</FormLabel>
                  <TextField
                    id="interestAmount"
                    name="interestAmount"
                    size="small"
                    fullWidth
                    value={formik.values.interestAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.interestAmount && Boolean(formik.errors.interestAmount)}
                    helperText={formik.touched.interestAmount && formik.errors.interestAmount}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>Interest Rate</FormLabel>
                  <TextField
                    id="interestRate"
                    name="interestRate"
                    size="small"
                    fullWidth
                    value={formik.values.interestRate}
                    onChange={formik.handleChange}
                    error={formik.touched.interestRate && Boolean(formik.errors.interestRate)}
                    helperText={formik.touched.interestRate && formik.errors.interestRate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>From this Account</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="fromAccount"
                      label=""
                      size="small"
                      value={formik.values.fromAccount || null}
                      onChange={formik.handleChange}
                      error={formik.touched.fromAccount && Boolean(formik.errors.fromAccount)}
                    >
                      {walletData?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item.walletName}>
                            {`${item.walletName}- Balance: ${item.addFunds}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.fromAccount && Boolean(formik.errors.fromAccount)}>
                      {formik.touched.fromAccount && formik.errors.fromAccount}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormLabel>Transaction Reference</FormLabel>
                  <TextField
                    id="TransactionReference"
                    name="TransactionReference"
                    size="small"
                    fullWidth
                    value={formik.values.TransactionReference}
                    onChange={formik.handleChange}
                    error={formik.touched.TransactionReference && Boolean(formik.errors.TransactionReference)}
                    helperText={formik.touched.TransactionReference && formik.errors.TransactionReference}
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
              setEditLoanData('');
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

export default AddLoans;
