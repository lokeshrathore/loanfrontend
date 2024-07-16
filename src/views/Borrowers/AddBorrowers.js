/* eslint-disable react/prop-types */
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Palette from '../../ui-component/ThemePalette';

const AddBorrowers = (props) => {
  const { open, handleClose, AddBorrower, editBorrowerData, setEditBorrowerData, EditBorrower } = props;
  const userId = localStorage.getItem('user_id');

  const [file, setFile] = useState();
  const [idDocument, setIdDocument] = useState();

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  function handleIdDocumentChange(event) {
    setIdDocument(event.target.files[0]);
  }

  // -----------  validationSchema
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    dateOfBirth: yup.date().required('Date of Birth is required'),
    gender: yup.string().required('Gender is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number is invalid')
      .required('Phone number is required'),
    occupation: yup.string().required('Occupation is required'),
    identificationId: yup.string().required('Identification ID is required'),
    emailAddress: yup.string().email('Invalid email').required('Email is required'),
    address: yup.string().required('Address is required'),
    KinPhoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number is invalid')
  });

  // -----------   initialValues
  const initialValues = {
    title: editBorrowerData?.title ? editBorrowerData?.title : '',
    firstName: editBorrowerData?.firstName ? editBorrowerData?.firstName : '',
    lastName: editBorrowerData?.lastName ? editBorrowerData?.lastName : '',
    dateOfBirth: editBorrowerData?.dateOfBirth ? editBorrowerData?.dateOfBirth : '',
    gender: editBorrowerData?.gender ? editBorrowerData?.gender : '',
    phoneNumber: editBorrowerData?.phoneNumber ? editBorrowerData?.phoneNumber : '',
    occupation: editBorrowerData?.occupation ? editBorrowerData?.occupation : '',
    identificationId: editBorrowerData?.identificationId ? editBorrowerData?.identificationId : '',
    emailAddress: editBorrowerData?.emailAddress ? editBorrowerData?.emailAddress : '',
    address: editBorrowerData?.address ? editBorrowerData?.address : '',
    city: editBorrowerData?.city ? editBorrowerData?.city : '',
    zipCode: editBorrowerData?.zipCode ? editBorrowerData?.zipCode : '',
    kinFirstName: editBorrowerData?.kinFirstName ? editBorrowerData?.kinFirstName : '',
    kinLastName: editBorrowerData?.kinLastName ? editBorrowerData?.kinLastName : '',
    KinPhoneNumber: editBorrowerData?.KinPhoneNumber ? editBorrowerData?.KinPhoneNumber : '',
    relationShip: editBorrowerData?.relationShip ? editBorrowerData?.relationShip : '',
    kinAddress: editBorrowerData?.kinAddress ? editBorrowerData?.kinAddress : '',
    bankName: editBorrowerData?.bankName ? editBorrowerData?.bankName : '',
    branchName: editBorrowerData?.branchName ? editBorrowerData?.branchName : '',
    bankShortCode: editBorrowerData?.bankShortCode ? editBorrowerData?.bankShortCode : '',
    accountNumber: editBorrowerData?.accountNumber ? editBorrowerData?.accountNumber : '',
    accountName: editBorrowerData?.accountName ? editBorrowerData?.accountName : '',
    mobileMoneyNumber: editBorrowerData?.mobileMoneyNumber ? editBorrowerData?.mobileMoneyNumber : '',
    createdBy: userId
  };

  useEffect(() => {
    setFile(editBorrowerData?.imageName);
    setIdDocument(editBorrowerData?.documentFileName);
  }, [editBorrowerData]);

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const newPayload = {
        ...values,
        image: file,
        imageName: file?.name,
        imageType: file?.type,
        document: idDocument,
        documentName: idDocument?.name
      };

      editBorrowerData ? EditBorrower(newPayload) : AddBorrower(newPayload);
      handleClose();
      setEditBorrowerData('');
      formik.resetForm();
    }
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // TransitionComponent={Transition}
      >
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6"> {editBorrowerData ? 'Edit Borrower' : 'Add Borrower'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Typography style={{ marginBottom: '15px' }} variant="h6">
                Basic Information
              </Typography>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={4} md={4}>
                  <FormControl fullWidth>
                    <FormLabel>Title</FormLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="title"
                      name="title"
                      label=""
                      size="small"
                      fullWidth
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                    >
                      <MenuItem value="Mr.">Mr.</MenuItem>
                      <MenuItem value="Mrs.">Mrs. </MenuItem>
                      <MenuItem value="Miss.">Miss. </MenuItem>
                      <MenuItem value="Ms.">Ms. </MenuItem>
                      <MenuItem value="Dr.">Dr. </MenuItem>
                    </Select>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.title && formik.errors.title}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>First name</FormLabel>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label=""
                    size="small"
                    maxRows={10}
                    fullWidth
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                  <FormLabel>Last name</FormLabel>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Date Of Birth</FormLabel>
                  <TextField
                    name="dateOfBirth"
                    type="date"
                    size="small"
                    fullWidth
                    value={formik.values.dateOfBirth}
                    onChange={formik.handleChange}
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Phone number</FormLabel>
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Occupation</FormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="demo-simple-select-label"
                      id=""
                      name="occupation"
                      label=""
                      size="small"
                      value={formik.values.occupation || null}
                      onChange={formik.handleChange}
                      error={formik.touched.occupation && Boolean(formik.errors.occupation)}
                    >
                      <MenuItem value="employed">Employed</MenuItem>
                      <MenuItem value="selfEmployed">Self-Employed</MenuItem>
                      <MenuItem value="unEmployed">Un-Employed</MenuItem>
                      <MenuItem value="student">Student</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.occupation && Boolean(formik.errors.occupation)}>
                      {formik.touched.occupation && formik.errors.occupation}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    id="emailAddress"
                    name="emailAddress"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.emailAddress}
                    onChange={formik.handleChange}
                    error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                    helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row name="gender" onChange={formik.handleChange} value={formik.values.gender}>
                      <FormControlLabel value="Male" control={<Radio />} label="Male" />
                      <FormControlLabel value="Female" control={<Radio />} label="Female" />
                      <FormControlLabel value="Other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    <FormHelperText style={{ color: Palette.error.main }}>{formik.touched.gender && formik.errors.gender}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Address</FormLabel>
                  <TextField
                    id="address"
                    name="address"
                    label=""
                    size="small"
                    multiline
                    rows={5}
                    fullWidth
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    error={formik.touched.address && Boolean(formik.errors.address)}
                    helperText={formik.touched.address && formik.errors.address}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>City</FormLabel>
                  <TextField
                    id="city"
                    name="city"
                    label=""
                    size="small"
                    fullWidth
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>ZipCode</FormLabel>
                  <TextField
                    id="zipCode"
                    name="zipCode"
                    label=""
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.zipCode}
                    onChange={formik.handleChange}
                    error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                  />
                </Grid>
              </Grid>
              <Grid container rowSpacing={3} mt={0.5} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel> Next of kin First Name</FormLabel>
                  <TextField
                    id="kinFirstName"
                    name="kinFirstName"
                    size="small"
                    fullWidth
                    value={formik.values.kinFirstName}
                    onChange={formik.handleChange}
                    error={formik.touched.kinFirstName && Boolean(formik.errors.kinFirstName)}
                    helperText={formik.touched.kinFirstName && formik.errors.kinFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel> Next of kin last Name</FormLabel>
                  <TextField
                    id="kinLastName"
                    name="kinLastName"
                    size="small"
                    fullWidth
                    value={formik.values.kinLastName}
                    onChange={formik.handleChange}
                    error={formik.touched.kinLastName && Boolean(formik.errors.kinLastName)}
                    helperText={formik.touched.kinLastName && formik.errors.kinLastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel> Next of kin Phone number</FormLabel>
                  <TextField
                    id="KinPhoneNumber"
                    name="KinPhoneNumber"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.KinPhoneNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.KinPhoneNumber && Boolean(formik.errors.KinPhoneNumber)}
                    helperText={formik.touched.KinPhoneNumber && formik.errors.KinPhoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel> RelationShip Next of kin</FormLabel>
                  <TextField
                    id="relationShip"
                    name="relationShip"
                    size="small"
                    fullWidth
                    value={formik.values.relationShip}
                    onChange={formik.handleChange}
                    error={formik.touched.relationShip && Boolean(formik.errors.relationShip)}
                    helperText={formik.touched.relationShip && formik.errors.relationShip}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormLabel>Address of Next kin</FormLabel>
                  <TextField
                    id="kinAddress"
                    name="kinAddress"
                    label=""
                    size="small"
                    multiline
                    rows={5}
                    fullWidth
                    value={formik.values.kinAddress}
                    onChange={formik.handleChange}
                    error={formik.touched.kinAddress && Boolean(formik.errors.kinAddress)}
                    helperText={formik.touched.kinAddress && formik.errors.kinAddress}
                  />
                </Grid>
              </Grid>

              <Grid container rowSpacing={3} mt={0.5} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Bank Name</FormLabel>
                  <TextField
                    id="bankName"
                    name="bankName"
                    size="small"
                    fullWidth
                    value={formik.values.bankName}
                    onChange={formik.handleChange}
                    error={formik.touched.bankName && Boolean(formik.errors.bankName)}
                    helperText={formik.touched.bankName && formik.errors.bankName}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Branch Name</FormLabel>
                  <TextField
                    id="branchName"
                    name="branchName"
                    size="small"
                    fullWidth
                    value={formik.values.branchName}
                    onChange={formik.handleChange}
                    error={formik.touched.branchName && Boolean(formik.errors.branchName)}
                    helperText={formik.touched.branchName && formik.errors.branchName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Bank Short Code </FormLabel>
                  <TextField
                    id="bankShortCode"
                    name="bankShortCode"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.bankShortCode}
                    onChange={formik.handleChange}
                    error={formik.touched.bankShortCode && Boolean(formik.errors.bankShortCode)}
                    helperText={formik.touched.bankShortCode && formik.errors.bankShortCode}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Bank Account Number</FormLabel>
                  <TextField
                    id="accountNumber"
                    name="accountNumber"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.accountNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.accountNumber && Boolean(formik.errors.accountNumber)}
                    helperText={formik.touched.accountNumber && formik.errors.accountNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Bank Account Name</FormLabel>
                  <TextField
                    id="accountName"
                    name="accountName"
                    size="small"
                    fullWidth
                    value={formik.values.accountName}
                    onChange={formik.handleChange}
                    error={formik.touched.accountName && Boolean(formik.errors.accountName)}
                    helperText={formik.touched.accountName && formik.errors.accountName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Mobile Money Number</FormLabel>
                  <TextField
                    id="mobileMoneyNumber"
                    name="mobileMoneyNumber"
                    size="small"
                    fullWidth
                    value={formik.values.mobileMoneyNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.mobileMoneyNumber && Boolean(formik.errors.mobileMoneyNumber)}
                    helperText={formik.touched.mobileMoneyNumber && formik.errors.mobileMoneyNumber}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} mt={0.8}>
                <FormLabel>Upload Photo</FormLabel>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    style={{ color: 'blue', cursor: 'pointer' }}
                  />
                  {editBorrowerData && <p>Selected file: {file && typeof file === 'object' ? file?.name : file}</p>}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={6} mt={1}>
                <FormLabel>Identification ID</FormLabel>
                <TextField
                  id="identificationId"
                  name="identificationId"
                  type="number"
                  size="small"
                  fullWidth
                  value={formik.values.identificationId}
                  onChange={formik.handleChange}
                  error={formik.touched.identificationId && Boolean(formik.errors.identificationId)}
                  helperText={formik.touched.identificationId && formik.errors.identificationId}
                />
              </Grid>
              <Grid item xs={12} md={12} mt={0.8}>
                <FormLabel>Upload ID Card Documents</FormLabel>
                <Box component="section" sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
                  <input
                    type="file"
                    onChange={handleIdDocumentChange}
                    accept="image/*,application/pdf"
                    style={{ color: 'blue', cursor: 'pointer' }}
                  />
                  {editBorrowerData && <p>Selected file: {idDocument && typeof idDocument === 'object' ? idDocument?.name : idDocument}</p>}
                </Box>
              </Grid>
            </DialogContentText>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={formik.handleSubmit} variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button
            onClick={() => {
              formik.resetForm();
              handleClose();
              setEditBorrowerData('');
            }}
            variant="outlined"
            color="error"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBorrowers;
