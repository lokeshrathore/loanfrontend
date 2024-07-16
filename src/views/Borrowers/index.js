/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Box, Card, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../ui-component/iconify';
import TableStyle from '../../ui-component/TableStyle';
import AddBorrowers from './AddBorrowers.js';
import { postApi, getApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';
// ----------------------------------------------------------------------

const Borrowers = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [borrowerData, setBorrowerData] = useState([]);
  const [deleteBorrowerData, setDeleteBorrowerData] = useState();
  const [editBorrowerData, setEditBorrowerData] = useState('');
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const columns = [
    {
      field: '_id',
      headerName: 'S.No.',
      flex: 0.5,
      width: 40,
      cellClassName: 'name-column--cell name-column--cell--capitalize',
      renderCell: (params) => params.api.getAllRowIds().indexOf(params.id) + 1
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150,
      flex: 1,
      cellClassName: 'name-column--cell--capitalize ',
      renderCell: (params) => <Typography>{`${params?.row?.firstName} ${params?.row?.lastName}`}</Typography>
    },
    {
      field: 'emailAddress',
      headerName: 'Email Address',
      flex: 1
    },
    {
      field: 'phoneNumber',
      headerName: 'Contact No.',
      flex: 1
    },
    {
      field: 'occupation',
      headerName: 'Occupation',
      flex: 1
    },
    {
      field: 'identificationId',
      headerName: 'Identification Id',
      flex: 1
    },

    {
      field: 'Profile',
      headerName: 'Profile',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <img
              src={`http://localhost:4000/uploads/borrowersDocuments/${params?.row?.imageName}`}
              alt="No-img"
              style={{ width: '100px', height: '100px' }}
            />
          </Box>
        );
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = async (row) => {
          setDeleteBorrowerData(row._id);
          handleOpenDelete();
        };
        const handleEditClick = async (row) => {
          setEditBorrowerData(row);
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

  const getAllBorrowersData = async () => {
    const response = await getApi(`borrower/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setBorrowerData(response.data.borrowerAllData);
    }
  };

  const AddBorrower = async (values) => {
    const formData = new FormData();

    if (values.image) {
      formData.append('imageName', values.image.name);
      formData.append('image', values.image);
      formData.append('imageType', values.imageType);
    }
    if (values.document) {
      formData.append('documentName', values.documentName);
      formData.append('document', values.document);
    }
    formData.append('title', values.title);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('gender', values.gender);
    formData.append('emailAddress', values.emailAddress);
    formData.append('dateOfBirth', values.dateOfBirth);
    formData.append('address', values.address);
    formData.append('kinFirstName', values.kinFirstName);
    formData.append('kinLastName', values.kinLastName);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('relationShip', values.relationShip);
    formData.append('occupation', values.occupation);
    formData.append('identificationId', values.identificationId);
    formData.append('mobileMoneyNumber', values.mobileMoneyNumber);
    formData.append('city', values.city);
    formData.append('branchName', values.branchName);
    formData.append('bankShortCode', values.bankShortCode);
    formData.append('bankName', values.bankName);
    formData.append('accountNumber', values.accountNumber);
    formData.append('accountName', values.accountName);
    formData.append('KinPhoneNumber', values.KinPhoneNumber);
    formData.append('kinAddress', values.kinAddress);
    formData.append('zipCode', values.zipCode);
    formData.append('createdBy', values.createdBy);

    const response = await postApi('borrower/add', formData);
    if (response && response.status === 200) {
      getAllBorrowersData();
    }
  };

  const EditBorrower = async (values) => {
    const formData = new FormData();
    if (values.image) {
      formData.append('imageName', values.image.name);
      formData.append('image', values.image);
      formData.append('imageType', values.imageType);
    }
    if (values.document) {
      formData.append('documentName', values.documentName);
      formData.append('document', values.document);
    }
    formData.append('title', values.title);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('gender', values.gender);
    formData.append('emailAddress', values.emailAddress);
    formData.append('dateOfBirth', values.dateOfBirth);
    formData.append('address', values.address);
    formData.append('kinFirstName', values.kinFirstName);
    formData.append('kinLastName', values.kinLastName);
    formData.append('phoneNumber', values.phoneNumber);
    formData.append('relationShip', values.relationShip);
    formData.append('occupation', values.occupation);
    formData.append('identificationId', values.identificationId);
    formData.append('mobileMoneyNumber', values.mobileMoneyNumber);
    formData.append('city', values.city);
    formData.append('branchName', values.branchName);
    formData.append('bankShortCode', values.bankShortCode);
    formData.append('bankName', values.bankName);
    formData.append('accountNumber', values.accountNumber);
    formData.append('accountName', values.accountName);
    formData.append('KinPhoneNumber', values.KinPhoneNumber);
    formData.append('kinAddress', values.kinAddress);
    formData.append('zipCode', values.zipCode);
    formData.append('createdBy', values.createdBy);

    const result = await EditApi(`borrower/edit/${editBorrowerData._id}`, formData);
    if (result && result.status === 200) {
      getAllBorrowersData();
    }
  };

  const DeleteBorrower = async (id) => {
    const result = await deleteApi(`borrower/delete/${id}`, id);
    if (result && result.status === 200) {
      getAllBorrowersData();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getAllBorrowersData();
  }, []);

  return (
    <>
      <AddBorrowers
        open={openAdd}
        handleClose={handleCloseAdd}
        AddBorrower={AddBorrower}
        editBorrowerData={editBorrowerData}
        setEditBorrowerData={setEditBorrowerData}
        EditBorrower={EditBorrower}
      />
      <DeleteModel
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
        deleteData={DeleteBorrower}
        deleteId={deleteBorrowerData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h3">Borrowers</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              Add Borrowers
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={borrowerData ?? []}
                rowHeight={100}
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

export default Borrowers;
