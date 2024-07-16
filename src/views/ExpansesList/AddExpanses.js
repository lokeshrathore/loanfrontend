/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
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
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, Box } from '@mui/material';
import dayjs from 'dayjs';
import { getApi } from 'services/api';

const AddExpanses = (props) => {
  const { open, handleClose, AddExpansesData, editExpansesData, UpdateExpanses, setEditExpansesData } = props;

  const userId = localStorage.getItem('user_id');

  const [walletData, setWalletData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const [file, setFile] = useState();

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  const getWalletList = async () => {
    const response = await getApi('Wallet/list');
    if (response && response.status === 200) {
      setWalletData(response.data.getAllResult);
    }
  };

  const getAllExpanseCategoriesData = async () => {
    const response = await getApi('expansesCategories/list');
    if (response && response.status === 200) {
      setCategoriesData(response.data.getAllResult);
    }
  };

  useEffect(() => {
    getWalletList();
    getAllExpanseCategoriesData();
  }, []);

  // -----------  validationSchema
  const validationSchema = yup.object({
    expanseName: yup.string().required('Expanse Name is required'),
    expanseVendor: yup.string().required('Expanse Vendor is required'),
    expanseAmount: yup.string().required('Expanse Amount is required'),
    expanseFromAccount: yup.string().required('From Account is required'),
    expanseCategory: yup.string().required('Expanse Category is required'),
    expanseDate: yup.string().required('Expanse Date is required')
  });

  // -----------   initialValues
  const initialValues = {
    expanseName: editExpansesData ? editExpansesData.expanseName : '',
    expanseVendor: editExpansesData ? editExpansesData.expanseVendor : '',
    expanseAmount: editExpansesData ? editExpansesData.expanseAmount : '',
    expanseFromAccount: editExpansesData ? editExpansesData.expanseFromAccount : '',
    expanseCategory: editExpansesData ? editExpansesData.expanseCategory : '',
    expanseDate: editExpansesData ? editExpansesData.expanseDate : '',
    file: editExpansesData ? editExpansesData?.path : '',
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
        file: file,
        fileName: file?.name,
        fileType: file?.type
      };
      editExpansesData ? UpdateExpanses(newPayload) : AddExpansesData(newPayload);
      handleClose();
      setEditExpansesData('');
      resetForm();
    }
  });

  useEffect(() => {
    setFile(editExpansesData?.path);
  }, [editExpansesData]);

  const getFileName = (fullFileName) => {
    if (!fullFileName) {
      return ''; // Return an empty string if fullFileName is undefined or null
    }
    const fileNameParts = fullFileName.split('\\');
    return fileNameParts[fileNameParts.length - 1];
  };

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
          <Typography variant="h6"> {editExpansesData ? 'Edit Expanse' : 'Create Expanse'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Expanse Name</FormLabel>
                  <TextField
                    id="expanseName"
                    name="expanseName"
                    size="small"
                    fullWidth
                    value={formik.values.expanseName}
                    onChange={formik.handleChange}
                    error={formik.touched.expanseName && Boolean(formik.errors.expanseName)}
                    helperText={formik.touched.expanseName && formik.errors.expanseName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Expanse Vendor</FormLabel>
                  <TextField
                    id="expanseVendor"
                    name="expanseVendor"
                    size="small"
                    fullWidth
                    value={formik.values.expanseVendor}
                    onChange={formik.handleChange}
                    error={formik.touched.expanseVendor && Boolean(formik.errors.expanseVendor)}
                    helperText={formik.touched.expanseVendor && formik.errors.expanseVendor}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Expanse Amount</FormLabel>
                  <TextField
                    id="expanseAmount"
                    name="expanseAmount"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.expanseAmount}
                    onChange={formik.handleChange}
                    error={formik.touched.expanseAmount && Boolean(formik.errors.expanseAmount)}
                    helperText={formik.touched.expanseAmount && formik.errors.expanseAmount}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>From this Account</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="expanseFromAccount"
                      label=""
                      size="small"
                      value={formik.values.expanseFromAccount || null}
                      onChange={formik.handleChange}
                      error={formik.touched.expanseFromAccount && Boolean(formik.errors.expanseFromAccount)}
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
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Expanse Category</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="expanseCategory"
                      label=""
                      size="small"
                      value={formik.values.expanseCategory || null}
                      onChange={formik.handleChange}
                      error={formik.touched.expanseCategory && Boolean(formik.errors.expanseCategory)}
                    >
                      {categoriesData?.map((item) => {
                        return (
                          <MenuItem key={item?._id} value={`${item?.categoryName}`}>
                            {`${item?.categoryName}`}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.expanseCategory && Boolean(formik.errors.expanseCategory)}>
                      {formik.touched.expanseCategory && formik.errors.expanseCategory}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormLabel>Expanse Date</FormLabel>
                  <TextField
                    name="expanseDate"
                    type={'date'}
                    size="small"
                    fullWidth
                    value={dayjs(formik.values.expanseDate).format('YYYY-MM-DD')}
                    onChange={formik.handleChange}
                    error={formik.touched.expanseDate && Boolean(formik.errors.expanseDate)}
                    helperText={formik.touched.expanseDate && formik.errors.expanseDate}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <FormLabel>Expanse attachment</FormLabel>
                  <Box component="section" sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,application/pdf"
                      style={{ color: 'blue', cursor: 'pointer' }}
                    />
                    {editExpansesData && <p>Selected file: {file && typeof file === 'object' ? file?.name : getFileName(file)}</p>}
                  </Box>
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
              setEditExpansesData('');
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

export default AddExpanses;
