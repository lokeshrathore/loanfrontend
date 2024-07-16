/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import FormControl from '@mui/material/FormControl';
import ClearIcon from '@mui/icons-material/Clear';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FormHelperText, FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useState, useEffect } from 'react';

const AddAgreementForm = (props) => {
  const { open, handleClose, AddAgreementData, editData, setEditData, EditAgreementForm } = props;

  const userId = localStorage.getItem('user_id');

  // Define your default dummy content
  const defaultContent = {
    blocks: [
      {
        text: '[Company Name]\n\nLusaka Zambia\n\nP.O BOX 1209,\n\nLusaka\n\n10/09/09\n\nDear [Borrower Name],\n\nREF: LOAN AGREEMENT FORM\n\nDear [Borrower Name],\n\nThis agreement is made between [Company Name], referred to as the "Lender," and [Borrower Name], whose details are as follows:\n\nName: [Borrower Name]\nEmail: [Borrower Email]\nPhone: [Borrower Phone]\nLoan Number: [Loan Number]\nLoan Amount: [Loan Amount]\nLoan Tenure: [Loan Tenure]\nLoan Interest Percentage: [Loan Interest Percentage]\nLoan Interest Fee: [Loan Interest Fee]\n\nThe lender agrees to provide a loan of [Loan Amount] to the borrower under the following terms and conditions:............................\n\nThe borrower agrees to repay the loan amount in installments within the loan tenure period. By signing this agreement, the borrower acknowledges and agrees to the terms and conditions set forth herein.\n\nSincerely,\n\n[Company Name]',
        type: 'unstyled',
        entityRanges: [],
        depth: 0,
        inlineStyleRanges: []
      }
    ],
    entityMap: {}
  };
  const initialEditorState = EditorState.createWithContent(convertFromRaw(defaultContent));

  const [editorState, setEditorState] = useState(initialEditorState);

  // -----------  validationSchema
  const validationSchema = yup.object({
    loanType: yup.string().required('loan Type is required')
  });

  // -----------   initialValues
  const initialValues = {
    loanType: editData ? editData.loanType : '',
    createdBy: userId
  };

  useEffect(() => {
    if (editData) {
      try {
        setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(editData?.content))));
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [editData]);

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
      const newPayload = {
        ...values,
        content
      };
      console.log('AgreementValues', newPayload);
      editData ? EditAgreementForm(newPayload) : AddAgreementData(newPayload);
      handleClose();
      setEditData('');
      formik.resetForm();
      editData ? null : toast.success('loan Agreement Form Add successfully');
    }
  });

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

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
          <Typography variant="h6">{editData ? 'Edit Agreement Form' : 'Add New Agreement Form'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              Create Loan Agreement Forms
            </Typography>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Choose Loan Type</FormLabel>
                  <Select
                    id="loanType"
                    name="loanType"
                    size="small"
                    value={formik.values.loanType}
                    onChange={formik.handleChange}
                    error={formik.touched.loanType && Boolean(formik.errors.loanType)}
                  >
                    <MenuItem value="home">Home Insurance</MenuItem>
                    <MenuItem value="health">Health Insurance</MenuItem>
                    <MenuItem value="education">Education Insurance</MenuItem>
                    <MenuItem value="vehical">Vehical Insurance</MenuItem>
                  </Select>
                  <FormHelperText error={formik.touched.loanType && Boolean(formik.errors.loanType)}>
                    {formik.touched.loanType && formik.errors.loanType}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container rowSpacing={3} mt={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
              <Grid item xs={12}>
                <FormLabel>Create Form</FormLabel>
                <Editor
                  //editorStyle={{ border: '1px solid #C0C0C0' }}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                />
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
              setEditorState(initialEditorState);
              formik.resetForm();
              setEditData('');
              handleClose();
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddAgreementForm;
