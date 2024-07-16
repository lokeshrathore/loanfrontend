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
import AddExpanses from './AddExpanses';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';

// ----------------------------------------------------------------------

const ExpansesList = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [expansesData, setExpansesData] = useState([]);
  const [deleteExpanseData, setDeleteExpanseData] = useState([]);
  const [editExpansesData, setEditExpansesData] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const getExpansesList = async () => {
    const response = await getApi(`expanses/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setExpansesData(response.data.getAllResult);
    }
  };

  const AddExpansesData = async (values) => {
    const formData = new FormData();

    if (values.file) {
      formData.append('fileName', values.file.name);
      formData.append('file', values.file);
    }
    formData.append('expanseName', values?.expanseName);
    formData.append('expanseVendor', values?.expanseVendor);
    formData.append('expanseAmount', values?.expanseAmount);
    formData.append('expanseFromAccount', values?.expanseFromAccount);
    formData.append('expanseCategory', values?.expanseCategory);
    formData.append('expanseDate', values?.expanseDate);
    formData.append('createdBy', values?.createdBy);
    const response = await postApi('expanses/add', formData);
    if (response && response.status === 200) {
      getExpansesList();
    }
  };

  const UpdateExpanses = async (values) => {
    const data = values;
    const result = await EditApi(`expanses/edit/${editExpansesData._id}`, data);
    if (result && result.status === 200) {
      getExpansesList();
    }
  };

  const DeleteExpanses = async (id) => {
    const result = await deleteApi(`expanses/delete/${id}`, id);
    if (result && result.status === 200) {
      getExpansesList();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getExpansesList();
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
      field: 'expanseName',
      headerName: 'Expanse Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'expanseVendor',
      headerName: 'Expanses Vendor',
      flex: 1
    },
    {
      field: 'expanseAmount',
      headerName: 'Expanses Amount',
      flex: 1
    },
    {
      field: 'expanseCategory',
      headerName: 'Expanses Category',
      flex: 1
    },
    {
      field: 'expanseDate',
      headerName: 'Expanses Date',
      flex: 1
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleClickDelete = (rowData) => {
          setDeleteExpanseData(rowData._id);
          handleOpenDelete();
        };
        const handleClickEdit = (rowData) => {
          setEditExpansesData(rowData);
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
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteId={deleteExpanseData} deleteData={DeleteExpanses} />
      <AddExpanses
        open={openAdd}
        handleClose={handleCloseAdd}
        AddExpansesData={AddExpansesData}
        editExpansesData={editExpansesData}
        UpdateExpanses={UpdateExpanses}
        setEditExpansesData={setEditExpansesData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Expanses Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Expanse
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={expansesData ?? []}
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

export default ExpansesList;
