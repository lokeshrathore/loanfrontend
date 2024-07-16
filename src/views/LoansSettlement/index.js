/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../ui-component/iconify';
import AddAgreementForm from './AddSettlementForm.js';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';

// ----------------------------------------------------------------------

const LoanSettlementForm = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [settlementFormData, setSettlementFormData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [editData, setEditData] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const AddSettlementData = async (values) => {
    const data = values;
    const response = await postApi('loanSettlement/add', data);
    if (response && response.status === 201) {
      getLoanSettlementList();
    }
  };

  const getLoanSettlementList = async () => {
    const response = await getApi(`loanSettlement/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setSettlementFormData(response.data.getAllResult);
    }
  };

  const DeleteSettlementForm = async (id) => {
    const response = await deleteApi(`loanSettlement/delete/${id}`);
    if (response && response.status === 200) {
      getLoanSettlementList();
    }
    handleCloseDelete();
  };

  const EditSettlementForm = async (data) => {
    const response = await EditApi(`loanSettlement/edit/${editData._id}`, data);
    if (response && response.status === 200) {
      getLoanSettlementList();
    }
  };

  useEffect(() => {
    getLoanSettlementList();
  }, []);
  const columns = [
    {
      field: '_id',
      headerName: 'Templates',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },

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
            <IconButton fontSize="40px" color="primary" onClick={() => handleEditClick(params)}>
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => handleDeleteClick(params)}>
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
        AddSettlementData={AddSettlementData}
        EditSettlementForm={EditSettlementForm}
        editData={editData}
        setEditData={setEditData}
      />
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteId={deleteId} deleteData={DeleteSettlementForm} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Loan-settlement-Form</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Settlement Form
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={settlementFormData ?? []}
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

export default LoanSettlementForm;
