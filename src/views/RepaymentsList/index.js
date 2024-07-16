/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../ui-component/iconify';
import AddRepayments from './AddRepayments';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';
// ----------------------------------------------------------------------

const Repayments = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loanData, setLoanData] = useState([]);
  const [repaymentData, setRepaymentData] = useState([]);
  const [repaymentDeleteData, setRepaymentDeleteData] = useState('');
  const [editRepaymentData, setEditRepaymentData] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const getBorrowersList = async () => {
    const response = await getApi(`loan/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setLoanData(response.data.getAllResult);
    }
  };

  const AddRepaymentData = async (values) => {
    const data = values;
    const response = await postApi('repayment/add', data);
    if (response && response.status === 201) {
      getRepaymentsList();
    }
  };

  const DeleteRepayments = async (id) => {
    const response = await deleteApi(`repayment/delete/${id}`);
    if (response && response.status === 200) {
      getRepaymentsList();
    }
    handleCloseDelete();
  };

  const EditRepayments = async (data) => {
    const response = await EditApi(`repayment/edit/${editRepaymentData._id}`, data);
    if (response && response.status === 200) {
      getRepaymentsList();
    }
  };

  const getRepaymentsList = async () => {
    const response = await getApi(`repayment/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setRepaymentData(response.data.getAllResult);
    }
  };

  useEffect(() => {
    getBorrowersList();
    getRepaymentsList();
  }, []);
  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    {
      field: 'borrowersName',
      headerName: 'Borrowers Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'loanStatus',
      headerName: 'Loan Status',
      flex: 1
    },
    {
      field: 'repaymentAmount',
      headerName: 'Payments',
      flex: 1
    },
    {
      field: 'totalRepayment',
      headerName: 'Total Repayments',
      flex: 1
    },
    {
      field: 'currentBalance',
      headerName: 'Balance',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = (deleteData) => {
          setRepaymentDeleteData(deleteData?.row?._id);
          handleOpenDelete();
        };
        const handleEditClick = (editData) => {
          setEditRepaymentData(editData?.row);
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
      <DeleteModel
        openDelete={openDelete}
        handleOpenDelete={handleOpenDelete}
        deleteData={DeleteRepayments}
        deleteId={repaymentDeleteData}
      />
      <AddRepayments
        open={openAdd}
        handleClose={handleCloseAdd}
        loanData={loanData}
        AddRepaymentData={AddRepaymentData}
        editRepaymentData={editRepaymentData}
        EditRepayments={EditRepayments}
        setEditRepaymentData={setEditRepaymentData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Repayments Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Repayment
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={repaymentData ?? []}
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

export default Repayments;
