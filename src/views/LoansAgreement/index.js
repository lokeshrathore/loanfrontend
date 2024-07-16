/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Iconify from '../../ui-component/iconify';
import AddAgreementForm from './AddAgreementForm.js';
import { postApi, getApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';

// ----------------------------------------------------------------------

const LoanAgreementForm = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [agreementFormData, setAgreementFormData] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editData, setEditData] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const AddAgreementData = async (values) => {
    const data = values;
    const response = await postApi('loanAgreement/add', data);
    if (response && response.status === 201) {
      getLoanAgreementList();
    }
  };

  const getLoanAgreementList = async () => {
    const response = await getApi(`loanAgreement/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setAgreementFormData(response.data.getAllResult);
    }
  };

  const DeleteAgreementForm = async (id) => {
    const response = await deleteApi(`loanAgreement/delete/${id}`);
    if (response && response.status === 200) {
      getLoanAgreementList();
    }
    handleCloseDelete();
  };
  const EditAgreementForm = async (data) => {
    const response = await EditApi(`loanAgreement/edit/${editData._id}`, data);
    if (response && response.status === 200) {
      getLoanAgreementList();
    }
  };

  useEffect(() => {
    getLoanAgreementList();
  }, []);

  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    {
      field: 'loanType',
      headerName: 'Loan Type',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    // {
    //   field: 'preview',
    //   headerName: 'Preview',
    //   flex: 1,
    //   cellClassName: 'name-column--cell--capitalize',
    //   renderCell: () => (
    //     <Box>
    //       <IconButton fontSize="40px" color="secondary">
    //         <RemoveRedEyeIcon />
    //       </IconButton>
    //     </Box>
    //   )
    // },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = (rowData) => {
          setDeleteId(rowData.row._id);
          handleOpenDelete();
        };
        const handleEditClick = (rowData) => {
          setEditData(rowData.row);
          handleOpenAdd();
        };
        return (
          <Box>
            <IconButton
              fontSize="40px"
              color="primary"
              onClick={() => {
                handleEditClick(params);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleDeleteClick(params);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      }
      // eslint-disable-next-line arrow-body-style
    }
  ];

  return (
    <>
      <AddAgreementForm
        open={openAdd}
        handleClose={handleCloseAdd}
        AddAgreementData={AddAgreementData}
        editData={editData}
        setEditData={setEditData}
        EditAgreementForm={EditAgreementForm}
      />
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteData={DeleteAgreementForm} deleteId={deleteId} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Loan-Agreement-Form</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Agreement Form
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={agreementFormData ?? []}
                columns={columns}
                getRowId={(row) => row._id}
                slots={{ toolbar: GridToolbar }}
                slotProps={{ toolbar: { showQuickFilter: true } }}
              />
            </Card>
          </Box>
        </TableStyle>
      </Container>
    </>
  );
};

export default LoanAgreementForm;
