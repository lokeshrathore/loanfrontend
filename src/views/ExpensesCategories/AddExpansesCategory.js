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
import { FormLabel } from '@mui/material';
import { toast } from 'react-toastify';

const AddExpansesCategory = (props) => {
  const { open, handleClose, AddExpanseCategories, editExpanseData, UpdateExpanseCategories, setEditExpanseData } = props;

  const userId = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    categoryName: yup.string().required('Category Name is required'),
    categoryCode: yup.string().required('Category Code is required')
  });

  // -----------   initialValues
  const initialValues = {
    categoryCode: editExpanseData ? editExpanseData.categoryCode : '',
    categoryName: editExpanseData ? editExpanseData.categoryName : '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log('expanseCategoryValues', values);
      editExpanseData ? UpdateExpanseCategories(values) : AddExpanseCategories(values);
      handleClose();
      setEditExpanseData('');
      editExpanseData ? null : toast.success('Expanse Category Add successfully');
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
          <Typography variant="h6"> {editExpanseData ? 'Edit Expanse Category' : 'Create Expanse Category'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Category Name</FormLabel>
                  <TextField
                    id="categoryName"
                    name="categoryName"
                    size="small"
                    fullWidth
                    value={formik.values.categoryName}
                    onChange={formik.handleChange}
                    error={formik.touched.categoryName && Boolean(formik.errors.categoryName)}
                    helperText={formik.touched.categoryName && formik.errors.categoryName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Category Code</FormLabel>
                  <TextField
                    id="categoryCode"
                    name="categoryCode"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.categoryCode}
                    onChange={formik.handleChange}
                    error={formik.touched.categoryCode && Boolean(formik.errors.categoryCode)}
                    helperText={formik.touched.categoryCode && formik.errors.categoryCode}
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
              setEditExpanseData('');
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

export default AddExpansesCategory;
