/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Button,
  Dialog,
  FormGroup,
  FormControlLabel,
  Switch,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  Box,
  Checkbox
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Accordion, AccordionSummary, AccordionDetails, Card, CardContent, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect } from 'react';

const AddRoles = (props) => {
  const { open, handleClose, AddRolesData, editRolesData, setEditRolesData, UpdateRolesData } = props;

  const userId = localStorage.getItem('user_id');

  const [mainSelectChecked, setMainSelectChecked] = useState(false);
  const [parentBorrowersChecked, setParentBorrowersChecked] = useState(false);
  const [childBorrowerChecked, setChildBorrowerChecked] = useState(Array(12).fill(false));
  const [parentExpanseChecked, setParentExpanseChecked] = useState(false);
  const [childExpanseChecked, setChildExpanseChecked] = useState(Array(12).fill(false));
  const [parentExpanseCategoryChecked, setParentExpanseCategoryChecked] = useState(false);
  const [childExpanseCategoryChecked, setChildExpanseCategoryChecked] = useState(Array(12).fill(false));
  const [parentLoanChecked, setParentLoanChecked] = useState(false);
  const [childLoanChecked, setChildLoanChecked] = useState(Array(12).fill(false));
  const [parentAgreementChecked, setParentAgreementChecked] = useState(false);
  const [childAgreementChecked, setChildAgreementChecked] = useState(Array(12).fill(false));
  const [parentSettlementChecked, setParentSettlementChecked] = useState(false);
  const [childSettlementChecked, setChildSettlementChecked] = useState(Array(12).fill(false));
  const [parentLoanTypeChecked, setParentLoanTypeChecked] = useState(false);
  const [childLoanTypeChecked, setChildLoanTypeChecked] = useState(Array(12).fill(false));
  const [parentRepaymentChecked, setParentRepaymentChecked] = useState(false);
  const [childRepaymentChecked, setChildRepaymentChecked] = useState(Array(12).fill(false));
  const [parentTransactionChecked, setParentTransactionChecked] = useState(false);
  const [childTransactionChecked, setChildTransactionChecked] = useState(Array(12).fill(false));
  const [parentWalletChecked, setParentWalletChecked] = useState(false);
  const [childWalletChecked, setChildWalletChecked] = useState(Array(12).fill(false));
  const [parentUserChecked, setParentUserChecked] = useState(false);
  const [childUserChecked, setChildUserChecked] = useState(Array(12).fill(false));

  const handleAllSelectedChange = () => {
    setMainSelectChecked((prevState) => !prevState);
    setParentBorrowersChecked((prevState) => !prevState);
    setChildBorrowerChecked((prevState) => new Array(12).fill(!prevState));
    setParentExpanseChecked((prevState) => !prevState);
    setChildExpanseChecked((prevState) => new Array(12).fill(!prevState));
    setParentExpanseCategoryChecked((prevState) => !prevState);
    setChildExpanseCategoryChecked((prevState) => new Array(12).fill(!prevState));
    setParentLoanChecked((prevState) => !prevState);
    setChildLoanChecked((prevState) => new Array(12).fill(!prevState));
    setParentAgreementChecked((prevState) => !prevState);
    setChildAgreementChecked((prevState) => new Array(12).fill(!prevState));
    setParentSettlementChecked((prevState) => !prevState);
    setChildSettlementChecked((prevState) => new Array(12).fill(!prevState));
    setParentLoanTypeChecked((prevState) => !prevState);
    setChildLoanTypeChecked((prevState) => new Array(12).fill(!prevState));
    setParentRepaymentChecked((prevState) => !prevState);
    setChildRepaymentChecked((prevState) => new Array(12).fill(!prevState));
    setParentTransactionChecked((prevState) => !prevState);
    setChildTransactionChecked((prevState) => new Array(12).fill(!prevState));
    setParentWalletChecked((prevState) => !prevState);
    setChildWalletChecked((prevState) => new Array(12).fill(!prevState));
    setParentUserChecked((prevState) => !prevState);
    setChildUserChecked((prevState) => new Array(12).fill(!prevState));
  };

  const handleParentBorrowersChange = (event) => {
    const isChecked = event.target.checked;
    setParentBorrowersChecked(isChecked);
    setChildBorrowerChecked(new Array(12).fill(isChecked));
  };

  const handleChildBorrowersChange = (index) => (event) => {
    const newChecked = [...childBorrowerChecked];
    newChecked[index] = event.target.checked;
    setChildBorrowerChecked(newChecked);
    setParentBorrowersChecked(newChecked.every((checked) => checked));
  };

  const handleParentExpanseChange = (event) => {
    const isChecked = event.target.checked;
    setParentExpanseChecked(isChecked);
    setChildExpanseChecked(new Array(12).fill(isChecked));
  };

  const handleChildExpanseChange = (index) => (event) => {
    const newChecked = [...childExpanseChecked];
    newChecked[index] = event.target.checked;
    setChildExpanseChecked(newChecked);
    setParentExpanseChecked(newChecked.every((checked) => checked));
  };

  const handleParentExpanseCategoryChange = (event) => {
    const isChecked = event.target.checked;
    setParentExpanseCategoryChecked(isChecked);
    setChildExpanseCategoryChecked(new Array(12).fill(isChecked));
  };

  const handleChildExpanseCategoryChange = (index) => (event) => {
    const newChecked = [...childExpanseCategoryChecked];
    newChecked[index] = event.target.checked;
    setChildExpanseCategoryChecked(newChecked);
    setParentExpanseCategoryChecked(newChecked.every((checked) => checked));
  };

  const handleParentLoanChange = (event) => {
    const isChecked = event.target.checked;
    setParentLoanChecked(isChecked);
    setChildLoanChecked(new Array(12).fill(isChecked));
  };

  const handleChildLoanChange = (index) => (event) => {
    const newChecked = [...childLoanChecked];
    newChecked[index] = event.target.checked;
    setChildLoanChecked(newChecked);
    setParentLoanChecked(newChecked.every((checked) => checked));
  };

  const handleParentAgreementChange = (event) => {
    const isChecked = event.target.checked;
    setParentAgreementChecked(isChecked);
    setChildAgreementChecked(new Array(12).fill(isChecked));
  };

  const handleChildAgreementChange = (index) => (event) => {
    const newChecked = [...childAgreementChecked];
    newChecked[index] = event.target.checked;
    setChildAgreementChecked(newChecked);
    setParentAgreementChecked(newChecked.every((checked) => checked));
  };

  const handleParentSettlementChange = (event) => {
    const isChecked = event.target.checked;
    setParentSettlementChecked(isChecked);
    setChildSettlementChecked(new Array(12).fill(isChecked));
  };

  const handleChildSettlementChange = (index) => (event) => {
    const newChecked = [...childSettlementChecked];
    newChecked[index] = event.target.checked;
    setChildSettlementChecked(newChecked);
    setParentSettlementChecked(newChecked.every((checked) => checked));
  };

  const handleParentLoanTypeChange = (event) => {
    const isChecked = event.target.checked;
    setParentLoanTypeChecked(isChecked);
    setChildLoanTypeChecked(new Array(12).fill(isChecked));
  };

  const handleChildLoanTypeChange = (index) => (event) => {
    const newChecked = [...childLoanTypeChecked];
    newChecked[index] = event.target.checked;
    setChildLoanTypeChecked(newChecked);
    setParentLoanTypeChecked(newChecked.every((checked) => checked));
  };

  const handleParentRepaymentChange = (event) => {
    const isChecked = event.target.checked;
    setParentRepaymentChecked(isChecked);
    setChildRepaymentChecked(new Array(12).fill(isChecked));
  };

  const handleChildRepaymentChange = (index) => (event) => {
    const newChecked = [...childRepaymentChecked];
    newChecked[index] = event.target.checked;
    setChildRepaymentChecked(newChecked);
    setParentRepaymentChecked(newChecked.every((checked) => checked));
  };

  const handleParentTransactionChange = (event) => {
    const isChecked = event.target.checked;
    setParentTransactionChecked(isChecked);
    setChildTransactionChecked(new Array(12).fill(isChecked));
  };

  const handleChildTransactionChange = (index) => (event) => {
    const newChecked = [...childTransactionChecked];
    newChecked[index] = event.target.checked;
    setChildTransactionChecked(newChecked);
    setParentTransactionChecked(newChecked.every((checked) => checked));
  };

  const handleParentWalletChange = (event) => {
    const isChecked = event.target.checked;
    setParentWalletChecked(isChecked);
    setChildWalletChecked(new Array(12).fill(isChecked));
  };

  const handleChildWalletChange = (index) => (event) => {
    const newChecked = [...childWalletChecked];
    newChecked[index] = event.target.checked;
    setChildWalletChecked(newChecked);
    setParentWalletChecked(newChecked.every((checked) => checked));
  };

  const handleParentUserChange = (event) => {
    const isChecked = event.target.checked;
    setParentUserChecked(isChecked);
    setChildUserChecked(new Array(12).fill(isChecked));
  };

  const handleChildUserChange = (index) => (event) => {
    const newChecked = [...childUserChecked];
    newChecked[index] = event.target.checked;
    setChildUserChecked(newChecked);
    setParentUserChecked(newChecked.every((checked) => checked));
  };
  // -----------  validationSchema
  const validationSchema = yup.object({
    roleName: yup.string().required('Role Name is required'),
    guardName: yup.string().required('Guard Name is required')
  });

  const labelNames = [
    'View',
    'Restore',
    'Delete',
    'View Any',
    'Delete Any',
    'Checkbox Any',
    'Create',
    'Replicate',
    'Force Delete',
    'Update',
    'Reorder',
    'Force Delete Any'
  ];

  useEffect(() => {
    if (editRolesData) {
      setMainSelectChecked(editRolesData ? editRolesData?.MainAllSelect : false);
      setParentBorrowersChecked(editRolesData ? editRolesData?.borrowersData?.selectAllBorrowers : false);
      const borrowersChecked = editRolesData?.borrowersData?.childCheckboxes?.map((i) => i.value);
      setChildBorrowerChecked(borrowersChecked);

      setParentExpanseChecked(editRolesData ? editRolesData?.expansesData?.selectAllExpanses : false);
      const expanseChecked = editRolesData?.expansesData?.childCheckboxes?.map((i) => i.value);
      setChildExpanseChecked(expanseChecked);

      setParentExpanseCategoryChecked(editRolesData ? editRolesData?.expansesCategoryData?.selectAllExpansesCategory : false);
      const expanseCategoryChecked = editRolesData?.expansesCategoryData?.childCheckboxes?.map((i) => i.value);
      setChildExpanseCategoryChecked(expanseCategoryChecked);

      setParentLoanChecked(editRolesData ? editRolesData?.loanData?.selectAllLoan : false);
      const loanChecked = editRolesData?.loanData?.childCheckboxes?.map((i) => i.value);
      setChildLoanChecked(loanChecked);

      setParentAgreementChecked(editRolesData ? editRolesData?.loanAgreementData?.selectAllLoanAgreement : false);
      const agreementChecked = editRolesData?.loanAgreementData?.childCheckboxes?.map((i) => i.value);
      setChildAgreementChecked(agreementChecked);

      setParentSettlementChecked(editRolesData ? editRolesData?.loanSettlementData?.selectAllLoanSettlement : false);
      const settlementChecked = editRolesData?.loanSettlementData?.childCheckboxes?.map((i) => i.value);
      setChildSettlementChecked(settlementChecked);

      setParentRepaymentChecked(editRolesData ? editRolesData?.repaymentsData?.selectAllRepayments : false);
      const repaymentChecked = editRolesData?.repaymentsData?.childCheckboxes?.map((i) => i.value);
      setChildSettlementChecked(repaymentChecked);

      setParentLoanTypeChecked(editRolesData ? editRolesData?.loanTypeData?.selectAllRepayments : false);
      const loanTypeChecked = editRolesData?.loanTypeData?.childCheckboxes?.map((i) => i.value);
      setChildLoanTypeChecked(loanTypeChecked);

      setParentTransactionChecked(editRolesData ? editRolesData?.transactionData?.selectAllTransaction : false);
      const transactionChecked = editRolesData?.transactionData?.childCheckboxes?.map((i) => i.value);
      setChildTransactionChecked(transactionChecked);

      setParentWalletChecked(editRolesData ? editRolesData?.walletData?.selectAllWallet : false);
      const walletChecked = editRolesData?.walletData?.childCheckboxes?.map((i) => i.value);
      setChildWalletChecked(walletChecked);

      setParentUserChecked(editRolesData ? editRolesData?.usersData?.selectAllUser : false);
      const userChecked = editRolesData?.usersData?.childCheckboxes?.map((i) => i.value);
      setChildUserChecked(userChecked);
    }
  }, [editRolesData]);

  // -----------   initialValues
  const initialValues = {
    roleName: editRolesData ? editRolesData.roleName : '',
    guardName: editRolesData ? editRolesData.guardName : '',
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const newPayload = {
        ...values,
        MainAllSelect: mainSelectChecked,
        borrowersData: {
          selectAllBorrowers: parentBorrowersChecked,
          childCheckboxes: childBorrowerChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        expansesData: {
          selectAllExpanses: parentExpanseChecked,
          childCheckboxes: childExpanseChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        expansesCategoryData: {
          selectAllExpansesCategory: parentExpanseCategoryChecked,
          childCheckboxes: childExpanseCategoryChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        loanData: {
          selectAllLoan: parentLoanChecked,
          childCheckboxes: childLoanChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        loanAgreementData: {
          selectAllLoanAgreement: parentAgreementChecked,
          childCheckboxes: childAgreementChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        loanSettlementData: {
          selectAllLoanSettlement: parentSettlementChecked,
          childCheckboxes: childSettlementChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        loanTypeData: {
          selectAllLoanType: parentLoanTypeChecked,
          childCheckboxes: childLoanTypeChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        repaymentsData: {
          selectAllRepayments: parentRepaymentChecked,
          childCheckboxes: childRepaymentChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        transactionData: {
          selectAllTransaction: parentTransactionChecked,
          childCheckboxes: childTransactionChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        walletData: {
          selectAllWallet: parentWalletChecked,
          childCheckboxes: childWalletChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        },
        usersData: {
          selectAllUser: parentUserChecked,
          childCheckboxes: childUserChecked?.map((checked, index) => ({
            name: labelNames[index],
            value: checked
          }))
        }
      };
      editRolesData ? UpdateRolesData(newPayload) : AddRolesData(newPayload);

      handleClose();
      setMainSelectChecked(false);
      setParentBorrowersChecked(false);
      setChildBorrowerChecked(Array(childBorrowerChecked?.length).fill(false));
      setParentExpanseChecked(false);
      setChildExpanseChecked(Array(childExpanseChecked?.length).fill(false));
      setParentExpanseCategoryChecked(false);
      setChildExpanseCategoryChecked(Array(childExpanseCategoryChecked?.length).fill(false));
      setParentLoanChecked(false);
      setChildLoanChecked(Array(childLoanChecked?.length).fill(false));
      setParentAgreementChecked(false);
      setChildAgreementChecked(Array(childAgreementChecked?.length).fill(false));
      setParentSettlementChecked(false);
      setChildSettlementChecked(Array(childSettlementChecked?.length).fill(false));
      setParentLoanTypeChecked(false);
      setChildLoanTypeChecked(Array(childLoanTypeChecked?.length).fill(false));
      setParentRepaymentChecked(false);
      setChildRepaymentChecked(Array(childRepaymentChecked?.length).fill(false));
      setParentTransactionChecked(false);
      setChildTransactionChecked(Array(childTransactionChecked?.length).fill(false));
      setParentWalletChecked(false);
      setChildWalletChecked(Array(childWalletChecked?.length).fill(false));
      setParentUserChecked(false);
      setChildUserChecked(Array(childUserChecked?.length).fill(false));
      setEditRolesData('');
      editRolesData ? null : toast.success('Roles Add successfully');
      formik.resetForm();
    }
  });

  return (
    <div>
      <Dialog open={open} aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description" maxWidth>
        <DialogTitle
          id="scroll-dialog-title"
          style={{
            display: 'flex',
            justifyContent: 'space-between'
            // backgroundColor: "#2b4054",
            // color: "white",
          }}
        >
          <Typography variant="h6"> {editRolesData ? 'Edit Role' : 'Create Role'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormLabel>Name</FormLabel>
                  <TextField
                    id="roleName"
                    name="roleName"
                    size="small"
                    maxRows={10}
                    fullWidth
                    value={formik.values.roleName}
                    onChange={formik.handleChange}
                    error={formik.touched.roleName && Boolean(formik.errors.roleName)}
                    helperText={formik.touched.roleName && formik.errors.roleName}
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormLabel>Guard Name</FormLabel>
                  <TextField
                    id="guardName"
                    name="guardName"
                    size="small"
                    fullWidth
                    value={formik.values.guardName}
                    onChange={formik.handleChange}
                    error={formik.touched.guardName && Boolean(formik.errors.guardName)}
                    helperText={formik.touched.guardName && formik.errors.guardName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch name="selectAll" checked={mainSelectChecked} onChange={handleAllSelectedChange} />}
                        label="Select All"
                      />
                    </FormGroup>
                    <FormHelperText>Enable all Permissions currently Enabled for this role</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Borrowers</Typography>
                        <Typography variant="body1"> App/Models/Borrowers</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Borrowers"
                              control={
                                <Checkbox
                                  checked={mainSelectChecked ? true : parentBorrowersChecked}
                                  onChange={handleParentBorrowersChange}
                                />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childBorrowerChecked[index]}
                                            onChange={handleChildBorrowersChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Expanse</Typography>
                        <Typography variant="body1"> App/Models/Expanse</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Expanses"
                              control={
                                <Checkbox checked={mainSelectChecked ? true : parentExpanseChecked} onChange={handleParentExpanseChange} />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childExpanseChecked[index]}
                                            onChange={handleChildExpanseChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Expanse Category</Typography>
                        <Typography variant="body1"> App/Models/Expanse Category</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Expanses Category"
                              control={
                                <Checkbox
                                  checked={mainSelectChecked ? true : parentExpanseCategoryChecked}
                                  onChange={handleParentExpanseCategoryChange}
                                />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childExpanseCategoryChecked[index]}
                                            onChange={handleChildExpanseCategoryChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Loan</Typography>
                        <Typography variant="body1"> App/Models/Loan</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Loan"
                              control={
                                <Checkbox checked={mainSelectChecked ? true : parentLoanChecked} onChange={handleParentLoanChange} />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childLoanChecked[index]}
                                            onChange={handleChildLoanChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Loan Agreement Forms</Typography>
                        <Typography variant="body1"> App/Models/Loan Agreement Forms</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Loan Agreement Forms"
                              control={
                                <Checkbox
                                  checked={mainSelectChecked ? true : parentAgreementChecked}
                                  onChange={handleParentAgreementChange}
                                />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childAgreementChecked[index]}
                                            onChange={handleChildAgreementChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Loan Settlement Forms</Typography>
                        <Typography variant="body1"> App/Models/Loan Settlement Forms</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Loan Settlement Forms"
                              control={
                                <Checkbox
                                  checked={mainSelectChecked ? true : parentSettlementChecked}
                                  onChange={handleParentSettlementChange}
                                />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childSettlementChecked[index]}
                                            onChange={handleChildSettlementChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Loan Type</Typography>
                        <Typography variant="body1"> App/Models/Loan Type</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Loan Type"
                              control={
                                <Checkbox
                                  checked={mainSelectChecked ? true : parentLoanTypeChecked}
                                  onChange={handleParentLoanTypeChange}
                                />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childLoanTypeChecked[index]}
                                            onChange={handleChildLoanTypeChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Repayments</Typography>
                        <Typography variant="body1"> App/Models/Repayments</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Repayments"
                              control={
                                <Checkbox
                                  checked={mainSelectChecked ? true : parentRepaymentChecked}
                                  onChange={handleParentRepaymentChange}
                                />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childRepaymentChecked[index]}
                                            onChange={handleChildRepaymentChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Transaction</Typography>
                        <Typography variant="body1"> App/Models/Transaction</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Transaction"
                              control={
                                <Checkbox
                                  checked={mainSelectChecked ? true : parentTransactionChecked}
                                  onChange={handleParentTransactionChange}
                                />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childTransactionChecked[index]}
                                            onChange={handleChildTransactionChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">Wallet</Typography>
                        <Typography variant="body1"> App/Models/Wallet</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All Wallet"
                              control={
                                <Checkbox checked={mainSelectChecked ? true : parentWalletChecked} onChange={handleParentWalletChange} />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childWalletChecked[index]}
                                            onChange={handleChildWalletChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Accordion sx={{ border: '1px solid #ddd' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h4">User</Typography>
                        <Typography variant="body1"> App/Models/User</Typography>
                      </Box>
                    </AccordionSummary>
                    <Divider />
                    <AccordionDetails>
                      <Card>
                        <CardContent>
                          <div>
                            <FormControlLabel
                              label="Select All User"
                              control={
                                <Checkbox checked={mainSelectChecked ? true : parentUserChecked} onChange={handleParentUserChange} />
                              }
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                              {[...Array(4)]?.map((_, setIndex) => (
                                <Box key={setIndex} sx={{ display: 'flex', flexDirection: 'column' }}>
                                  {[...Array(3)]?.map((_, itemIndex) => {
                                    const index = setIndex * 3 + itemIndex;
                                    return (
                                      <FormControlLabel
                                        key={index}
                                        label={labelNames[index]}
                                        control={
                                          <Checkbox
                                            checked={mainSelectChecked ? true : childUserChecked[index]}
                                            onChange={handleChildUserChange(index)}
                                          />
                                        }
                                        sx={{ mb: 1 }}
                                      />
                                    );
                                  })}
                                </Box>
                              ))}
                            </Box>
                          </div>
                        </CardContent>
                      </Card>
                    </AccordionDetails>
                  </Accordion>
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
              setEditRolesData('');
              setMainSelectChecked(false);
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

export default AddRoles;
