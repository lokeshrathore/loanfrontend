/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ClearIcon from '@mui/icons-material/Clear';
import { useFormik } from 'formik';
import { FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { useState, useEffect } from 'react';

const AddSettlementForm = (props) => {
  const { open, handleClose, AddSettlementData, EditSettlementForm, editData, setEditData } = props;

  const userId = localStorage.getItem('user_id');

  // Define your default dummy content
  const defaultContent = {
    blocks: [
      {
        text: '{company_name}\n\nLusaka Zambia\n\nP.O BOX 1209,\n\nLusaka\n\n{current_date}\n\nDear {customer_name},\n\nREF: LOAN SETTLEMENT FORM\nWe are pleased to inform you that your loan with us has been fully settled. The details of the settlement are as follows:\n\nLoan Amount: {loan_amount}\nSettled Date: {settled_date}\nThe lender agrees to provide a loan of {loan_amount} to the borrower under the following terms and conditions:............................\n\nThe borrower agrees to repay the loan amount in installments within the loan tenure period. By signing this agreement, the borrower acknowledges and agrees to the terms and conditions set forth herein.\n\nSincerely,\n\n{company_name}\n{company_address}',
        type: 'unstyled',
        entityRanges: [],
        depth: 0,
        inlineStyleRanges: []
      }
    ],
    entityMap: {}
  };
  // Convert the default content to EditorState
  const initialEditorState = EditorState?.createWithContent(convertFromRaw(defaultContent));

  const [editorState, setEditorState] = useState(initialEditorState);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
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

  // -----------   initialValues
  const initialValues = {
    createdBy: userId
  };

  // formik
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const content = JSON.stringify(convertToRaw(editorState?.getCurrentContent()));
      const newPayload = {
        ...values,
        content
      };
      editData ? EditSettlementForm(newPayload) : AddSettlementData(newPayload);
      handleClose();
      setEditData('');
      setEditorState(initialEditorState);
      editData ? null : toast.success('loan Settlement Form Add successfully');
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
          <Typography variant="h6"> {editData ? 'Edit Settlement Form' : 'Add New Settlement Form'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <Typography style={{ marginBottom: '15px' }} variant="h6">
              Create Loan Settlement Form
            </Typography>

            <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
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

export default AddSettlementForm;
