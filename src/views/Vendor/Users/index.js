/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, IconButton } from '@mui/material';
import TableStyle from '../../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddUser from './AddUser';
import Iconify from '../../../ui-component/iconify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../../ui-component/Deletemodle';
// ----------------------------------------------------------------------

const Users = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rolesData, setRolesData] = useState([]);
  const [deleteManageUserData, setDeleteManageUserData] = useState([]);
  const [mangeUserData, setMangeUserData] = useState([]);
  const [editManageUserData, setEditManageUserData] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const getRolesList = async () => {
    const response = await getApi(`role/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setRolesData(response.data.getAllResult);
    }
  };

  const getMangeUserList = async () => {
    //const response = await getApi(`manageUser/list?createdBy=${userId}`);
    const response = await getApi(`user/getAllUser?createdBy=${userId}`);
    console.log(response);
    if (response && response.status === 200) {
      //console.log("Total values = ",response.data.result.length);
      //setMangeUserData(response.data.getAllResult);
      setMangeUserData(response.data.result);
    }
  };

  const UpdateManageUserData = async (values) => {
    const newPayload = {
      ...values,
      firstName: values.fname,
      lastName: values.lname,
      emailAddress: values.email
    };
    const result = await EditApi(`user/edit/${editManageUserData._id}`, newPayload);
    //const result = await EditApi(`manageUser/edit/${editManageUserData._id}`, data);
    if (result && result.status === 200) {
      getMangeUserList();
    }
  };

  const AddMangeUserData = async (values) => {
    console.log('AddMangeUserData calling');
    const data = values;
    //  const response = await postApi('manageUser/add', data);
    const response = await postApi('user/register', data);
    if (response && response.status === 201) {
      getMangeUserList();
    }
  };

  const DeleteManageUserData = async (id) => {
    //const result = await deleteApi(`manageUser/delete/${id}`, id);
    const result = await deleteApi(`user/delete/${id}`, id);
    if (result && result.status === 200) {
      getMangeUserList();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getRolesList();
    getMangeUserList();
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
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },

    {
      field: 'emailAddress',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'role',
      headerName: 'Roles',
      flex: 1
    },

    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleClickDelete = (rowData) => {
          setDeleteManageUserData(rowData._id);
          handleOpenDelete();
        };
        const handleClickEdit = (rowData) => {
          // console.log('handleClickEdit',rowData);
          setEditManageUserData(rowData);
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
      <DeleteModel
        openDelete={openDelete}
        deleteData={DeleteManageUserData}
        handleOpenDelete={handleOpenDelete}
        deleteId={deleteManageUserData}
      />
      <AddUser
        open={openAdd}
        handleClose={handleCloseAdd}
        rolesData={rolesData}
        AddMangeUserData={AddMangeUserData}
        editManageUserData={editManageUserData}
        setEditManageUserData={setEditManageUserData}
        UpdateManageUserData={UpdateManageUserData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Users Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New user
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={mangeUserData ?? []}
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

export default Users;
