/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FormHelperText, FormLabel } from '@mui/material';
import { toast } from 'react-toastify';

const AddLoansTypes = (props) => {
  const { open, handleClose, AddLoanType, EditLoanType, editData, setEditData } = props;

  const UserId = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    loanName: yup.string().required('loan Name is required'),
    interestRate: yup
      .number()
      .min(1, 'Interest rate must be at least 1%')
      .max(30, 'Interest rate cannot exceed 30%')
      .required('Interest rate is required'),
    interestCycle: yup.string().required('Interest Cycle is required')
  });

  // -----------   initialValues
  const initialValues = {
    loanName: editData ? editData.loanName : '',
    interestRate: editData ? editData.interestRate : '',
    interestCycle: editData ? editData.interestCycle : '',
    createdBy: UserId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      editData ? EditLoanType(values) : AddLoanType(values);
      handleClose();
      setEditData('');
      editData ? null : toast.success(' Add Loans Types successfully');
      formik.resetForm();
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
          <Typography variant="h6"> {editData ? 'Edit Loan Type' : 'Add New Loan Type'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              Basic Information
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Loan name</FormLabel>
                <TextField
                  id="loanName"
                  name="loanName"
                  size="small"
                  maxRows={10}
                  fullWidth
                  value={formik.values.loanName}
                  onChange={formik.handleChange}
                  error={formik.touched.loanName && Boolean(formik.errors.loanName)}
                  helperText={formik.touched.loanName && formik.errors.loanName}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormLabel>Interest Rate</FormLabel>
                <TextField
                  id="interestRate"
                  name="interestRate"
                  type="number"
                  size="small"
                  fullWidth
                  value={formik.values.interestRate}
                  onChange={formik.handleChange}
                  error={formik.touched.interestRate && Boolean(formik.errors.interestRate)}
                  helperText={formik.touched.interestRate && formik.errors.interestRate}
                />
              </Grid>
            </Grid>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <FormLabel>Interest Cycle</FormLabel>
                  <Select
                    id="interestCycle"
                    name="interestCycle"
                    size="small"
                    value={formik.values.interestCycle}
                    onChange={formik.handleChange}
                    error={formik.touched.interestCycle && Boolean(formik.errors.interestCycle)}
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                    <MenuItem value="yearly">Yearly</MenuItem>
                  </Select>
                  <FormHelperText error={formik.touched.interestCycle && Boolean(formik.errors.interestCycle)}>
                    {formik.touched.interestCycle && formik.errors.interestCycle}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" onClick={formik.handleSubmit} style={{ textTransform: 'capitalize' }}>
            Save
          </Button>
          <Button
            type="reset"
            variant="outlined"
            style={{ textTransform: 'capitalize' }}
            color="error"
            onClick={() => {
              formik.resetForm();
              handleClose();
              setEditData('');
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLoansTypes;
