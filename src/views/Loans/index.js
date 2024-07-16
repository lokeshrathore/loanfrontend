/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, IconButton } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddLoans from './AddLoans';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../ui-component/iconify';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';

// ----------------------------------------------------------------------

const Loans = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [loanData, setLoanData] = useState([]);
  const [loanTypeData, setLoanTypeData] = useState([]);
  const [borrowerData, setBorrowerData] = useState([]);
  const [walletData, setWalletData] = useState([]);
  const [deleteLoanData, setDeleteLoanData] = useState([]);
  const [editLoanData, setEditLoanData] = useState('');

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

  const getAllBorrowersData = async () => {
    const response = await getApi(`borrower/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setBorrowerData(response.data.borrowerAllData);
    }
  };

  const getWalletList = async () => {
    const response = await getApi(`Wallet/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setWalletData(response.data.getAllResult);
    }
  };

  const getLoanList = async () => {
    const response = await getApi(`loan/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setLoanData(response.data.getAllResult);
    }
  };

  const AddLoanData = async (values) => {
    const data = values;
    const response = await postApi('loan/add', data);
    if (response && response.status === 201) {
      getLoanList();
    }
  };

  const UpDateLoanData = async (values) => {
    const data = values;
    const result = await EditApi(`loan/edit/${editLoanData._id}`, data);
    if (result && result.status === 200) {
      getLoanList();
    }
  };

  const DeleteLoanData = async (id) => {
    const result = await deleteApi(`loan/delete/${id}`, id);
    if (result && result.status === 200) {
      getLoanList();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getLoanList();
    getAllLoanTypeData();
    getAllBorrowersData();
    getWalletList();
  }, []);

  const calculateDueDate = (releaseDate, loanDuration, durationPeriod) => {
    const releaseDateTime = new Date(releaseDate);

    // Calculate the due date based on loan duration and duration period
    let dueDate = new Date(releaseDateTime);

    switch (durationPeriod) {
      case 'daily':
        dueDate.setDate(dueDate.getDate() + loanDuration);
        break;
      case 'weekly':
        dueDate.setDate(dueDate.getDate() + loanDuration * 7);
        break;
      case 'monthly':
        dueDate.setMonth(dueDate.getMonth() + loanDuration);
        break;
      case 'yearly':
        dueDate.setFullYear(dueDate.getFullYear() + loanDuration);
        break;
      default:
        return null;
    }

    return dueDate;
  };

  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    {
      field: 'borrowers',
      headerName: 'Borrowers',
      flex: 1,
      cellClassName: 'name-column--cell name-column--cell--capitalize'
    },

    {
      field: 'loanType',
      headerName: ' loan Type',
      flex: 1
    },

    {
      field: 'principleAmount',
      headerName: 'Principle Amount',
      flex: 1
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      renderCell: (params) => {
        return (
          <Typography>
            {params?.row?.releaseDate
              ? calculateDueDate(params?.row?.releaseDate, params?.row?.loanDuration, params?.row?.durationPeriod)?.toDateString()
              : '-'}
          </Typography>
        );
      }
    },
    // {
    //   field: 'loanAgreement',
    //   headerName: 'loan Agreement Form',
    //   flex: 1.5
    // },
    // {
    //   field: 'loanSettlement',
    //   headerName: 'loan Settlement Form',
    //   flex: 1.5
    // },
    {
      field: 'loanStatus',
      headerName: 'loan Status',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleClickDelete = (rowData) => {
          setDeleteLoanData(rowData._id);
          handleOpenDelete();
        };
        const handleClickEdit = (rowData) => {
          setEditLoanData(rowData);
          handleOpenAdd();
        };
        return (
          <Box>
            <IconButton
              fontSize="40px"
              color="primary"
              onClick={() => {
                handleClickEdit(params?.row);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                handleClickDelete(params?.row);
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
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteId={deleteLoanData} deleteData={DeleteLoanData} />
      <AddLoans
        open={openAdd}
        handleClose={handleCloseAdd}
        AddLoanData={AddLoanData}
        loanTypeData={loanTypeData}
        borrowerData={borrowerData}
        walletData={walletData}
        editLoanData={editLoanData}
        setEditLoanData={setEditLoanData}
        UpDateLoanData={UpDateLoanData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Loans Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New loan
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={loanData ?? []}
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

export default Loans;
