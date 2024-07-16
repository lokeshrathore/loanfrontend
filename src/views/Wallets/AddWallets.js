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
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import { useState, useEffect } from 'react';

const AddWallets = (props) => {
  const UserId = localStorage.getItem('user_id');

  const { open, handleClose, AddWallet, EditWallet, editWalletData, setEditWalletData } = props;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    if (editWalletData) {
      try {
        setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(editWalletData?.description))));
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    }
  }, [editWalletData]);

  const onEditorHandleChange = (newEditorValue) => {
    setEditorState(newEditorValue);
    const contentValue = newEditorValue.getCurrentContent();
    const editorValue = convertToRaw(contentValue);
    setEditorValue(editorValue?.blocks[0]?.text);
  };

  // -----------  validationSchema
  const validationSchema = yup.object({
    walletName: yup.string().required('walletName is required'),
    currency: yup.string().required('currency is required'),
    addFunds: yup.string().required('Add Funds is required')
    //  currentBalance: yup.string().required('current Balance is required'),
    // content: yup.string().required('Description is required')
  });

  // -----------   initialValues
  const initialValues = {
    walletName: editWalletData ? editWalletData.walletName : '',
    currency: editWalletData ? editWalletData.currency : '',
    addFunds: editWalletData ? editWalletData.addFunds : '',
    description: editWalletData ? editWalletData.description : '',
    createdBy: UserId
  };

  // formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      const newPayload = {
        ...values,
        description: editorValue
      };
      editWalletData ? EditWallet(newPayload) : AddWallet(newPayload);
      handleClose();
      setEditorState(EditorState.createEmpty());
      setEditorValue('');
      setEditWalletData('');
      editWalletData ? null : toast.success('Wallet Add successfully');
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
          <Typography variant="h6">{editWalletData ? 'Edit Wallet' : 'Add Wallet'} </Typography>
          <Typography>
            <ClearIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <Grid container rowSpacing={3} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Wallet Name</FormLabel>
                  <TextField
                    id="walletName"
                    name="walletName"
                    size="small"
                    fullWidth
                    value={formik.values.walletName}
                    onChange={formik.handleChange}
                    error={formik.touched.walletName && Boolean(formik.errors.walletName)}
                    helperText={formik.touched.walletName && formik.errors.walletName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Currency</FormLabel>
                  <TextField
                    id="currency"
                    name="currency"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                    error={formik.touched.currency && Boolean(formik.errors.currency)}
                    helperText={formik.touched.currency && formik.errors.currency}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={6} md={6}>
                  <FormLabel>Current Balance</FormLabel>
                  <TextField
                    id="currentBalance"
                    name="currentBalance"
                    size="small"
                    type="number"
                    fullWidth
                    value={formik.values.currentBalance}
                    onChange={formik.handleChange}
                    error={formik.touched.currentBalance && Boolean(formik.errors.currentBalance)}
                    helperText={formik.touched.currentBalance && formik.errors.currentBalance}
                  />
                </Grid> */}

                <Grid item xs={12} sm={6} md={12}>
                  <FormLabel>Add Funds</FormLabel>
                  <TextField
                    id="addFunds"
                    name="addFunds"
                    type="number"
                    size="small"
                    fullWidth
                    value={formik.values.addFunds}
                    onChange={formik.handleChange}
                    error={formik.touched.addFunds && Boolean(formik.errors.addFunds)}
                    helperText={formik.touched.addFunds && formik.errors.addFunds}
                  />
                </Grid>
              </Grid>
              <Grid container rowSpacing={3} mt={2} columnSpacing={{ xs: 0, sm: 5, md: 4 }}>
                <Grid item xs={12}>
                  <FormLabel>Description</FormLabel>
                  <Editor
                    editorStyle={{ minHeight: '180px' }}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    editorState={editorState}
                    onEditorStateChange={onEditorHandleChange}
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
              setEditorState(EditorState.createEmpty());
              setEditorValue('');
              formik.resetForm();
              setEditWalletData('');
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

export default AddWallets;
