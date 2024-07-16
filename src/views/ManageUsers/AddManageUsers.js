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

const AddManageUser = (props) => {
  const { open, handleClose, rolesData, AddMangeUserData, editManageUserData, setEditManageUserData, UpdateManageUserData } = props;

  const userId = localStorage.getItem('user_id');

  // -----------  validationSchema
  const validationSchema = yup.object({
    fname: yup.string().required('First name is required'),
    lname: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email address is required'),
    password: yup.string().required('password is required'),
    role: yup.string().required('Role is required')
  });

  // -----------   initialValues
  const initialValues = {
    fname: editManageUserData ? editManageUserData.firstName : '',
    lname: editManageUserData ? editManageUserData.lastName : '',
    email: editManageUserData ? editManageUserData.emailAddress : '',
    password: editManageUserData ? editManageUserData.password : '',
    role: editManageUserData ? editManageUserData.role : '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      editManageUserData ? UpdateManageUserData(values) : AddMangeUserData(values);
      handleClose();
      setEditManageUserData('');
      editManageUserData ? null : toast.success('User add successfully');
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
          <Typography variant="h6"> {editManageUserData ? 'Edit User' : 'Create User'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>First Name</FormLabel>
                  <TextField
                    id="fname"
                    name="fname"
                    size="small"
                    fullWidth
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    error={formik.touched.fname && Boolean(formik.errors.fname)}
                    helperText={formik.touched.fname && formik.errors.fname}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Last Name</FormLabel>
                  <TextField
                    id="lname"
                    name="lname"
                    size="small"
                    fullWidth
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                    error={formik.touched.lname && Boolean(formik.errors.lname)}
                    helperText={formik.touched.lname && formik.errors.lname}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Email Address</FormLabel>
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    size="small"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                {!editManageUserData ? 
                  <Grid item xs={12} sm={6} md={6}>
                    <FormLabel>Password</FormLabel>
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      size="small"
                      fullWidth
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                    />
                  </Grid>: ""}
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Roles</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="role"
                      label=""
                      size="small"
                      value={formik.values.role || null}
                      onChange={formik.handleChange}
                      error={formik.touched.role && Boolean(formik.errors.role)}
                    >
                      {rolesData?.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item?.roleName}>
                            {item?.roleName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText error={formik.touched.role && Boolean(formik.errors.role)}>
                      {formik.touched.role && formik.errors.role}
                    </FormHelperText>
                  </FormControl>
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
              setEditManageUserData('');
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

export default AddManageUser;
