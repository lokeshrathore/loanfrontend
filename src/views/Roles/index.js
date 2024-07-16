/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, IconButton, Chip } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AddRoles from './AddRoles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../ui-component/iconify';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';
// ----------------------------------------------------------------------

const Roles = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [rolesData, setRolesData] = useState([]);
  const [deleteRolesData, setDeleteRolesData] = useState([]);
  const [editRolesData, setEditRolesData] = useState('');

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

  const AddRolesData = async (values) => {
    const data = values;
    const response = await postApi('role/add', data);
    if (response && response.status === 201) {
      getRolesList();
    }
  };

  const UpdateRolesData = async (values) => {
    const data = values;
    const result = await EditApi(`role/edit/${editRolesData._id}`, data);
    if (result && result.status === 200) {
      getRolesList();
    }
  };

  const DeleteRolesData = async (id) => {
    const result = await deleteApi(`role/delete/${id}`, id);
    if (result && result.status === 200) {
      getRolesList();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getRolesList();
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
      field: 'roleName',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },

    {
      field: 'guardName',
      headerName: 'Guard Name',
      flex: 1
    },
    {
      field: 'totalPermissionCount',
      headerName: 'Permissions',
      flex: 1,
      renderCell: (params) => {
        return params?.row?.totalPermissionCount ? <Chip label={params?.row?.totalPermissionCount} color="success" /> : '-';
      }
    },
    {
      field: 'modifiedOn',
      headerName: 'Updated At',
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleClickDelete = (rowData) => {
          setDeleteRolesData(rowData._id);
          handleOpenDelete();
        };
        const handleClickEdit = (rowData) => {
          setEditRolesData(rowData);
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
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteId={deleteRolesData} deleteData={DeleteRolesData} />
      <AddRoles
        open={openAdd}
        handleClose={handleCloseAdd}
        AddRolesData={AddRolesData}
        UpdateRolesData={UpdateRolesData}
        editRolesData={editRolesData}
        setEditRolesData={setEditRolesData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Roles Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Role
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={rolesData ?? []}
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

export default Roles;
