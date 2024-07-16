/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModel from '../../ui-component/Deletemodle';
import Iconify from '../../ui-component/iconify';
import AddLoansTypes from './AddLoansTypes';
import { postApi, getApi, deleteApi, EditApi } from 'services/api';

// ----------------------------------------------------------------------

const LoanTypes = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loanTypeData, setLoanTypeData] = useState([]);
  const [deleteData, setDeleteData] = useState('');
  const [editData, setEditData] = useState('');
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const getAllLoanTypeData = async () => {
    const response = await getApi(`loanType/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setLoanTypeData(response.data.getAllResult);
    }
  };

  const AddLoanType = async (values) => {
    const data = values;
    const response = await postApi('loanType/add', data);
    if (response && response.status === 201) {
      getAllLoanTypeData();
    }
  };

  const EditLoanType = async (values) => {
    const data = values;
    const result = await EditApi(`loanType/edit/${editData._id}`, data);
    if (result && result.status === 200) {
      getAllLoanTypeData();
    }
  };

  const DeleteLoanType = async (id) => {
    const result = await deleteApi(`loanType/delete/${id}`, id);
    if (result && result.status === 200) {
      getAllLoanTypeData();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getAllLoanTypeData();
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
      field: 'loanName',
      headerName: 'Loan Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'interestRate',
      headerName: 'Interest Rate (%)',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        return <Typography>{`${params?.row?.interestRate} %`}</Typography>;
      }
    },
    {
      field: 'interestCycle',
      headerName: 'Interest Cycle',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = (row) => {
          setDeleteData(row._id);
          handleOpenDelete();
        };

        const handleEditClick = (row) => {
          setEditData(row);
          handleOpenAdd();
        };
        return (
          <Box>
            <IconButton
              fontSize="40px"
              color="primary"
              onClick={() => {
                handleEditClick(params?.row);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleDeleteClick(params?.row);
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
      <AddLoansTypes
        open={openAdd}
        handleClose={handleCloseAdd}
        AddLoanType={AddLoanType}
        editData={editData}
        EditLoanType={EditLoanType}
        setEditData={setEditData}
      />
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteData={DeleteLoanType} deleteId={deleteData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Loan-Types</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Loan Type
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={loanTypeData ?? []}
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

export default LoanTypes;
