/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Container, Typography, Card, Box, IconButton, Button } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../ui-component/iconify';
import AddExpansesCategory from './AddExpansesCategory';
import { getApi, postApi, deleteApi, EditApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';

// ----------------------------------------------------------------------

const ExpansesCategories = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [deleteExpanseData, setDeleteExpanseData] = useState([]);
  const [editExpanseData, setEditExpanseData] = useState('');

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const getAllExpanseCategoriesData = async () => {
    const response = await getApi(`expansesCategories/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setCategoriesData(response.data.getAllResult);
    }
  };

  const AddExpanseCategories = async (values) => {
    const data = values;
    const response = await postApi('expansesCategories/add', data);
    if (response && response.status === 201) {
      getAllExpanseCategoriesData();
    }
  };

  const UpdateExpanseCategories = async (values) => {
    const data = values;
    const result = await EditApi(`expansesCategories/edit/${editExpanseData._id}`, data);
    if (result && result.status === 200) {
      getAllExpanseCategoriesData();
    }
  };

  const DeleteExpanseCategories = async (id) => {
    const result = await deleteApi(`expansesCategories/delete/${id}`, id);
    if (result && result.status === 200) {
      getAllExpanseCategoriesData();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getAllExpanseCategoriesData();
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
      field: 'categoryName',
      headerName: 'Category Name',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'categoryCode',
      headerName: 'Category Code',
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
          setEditExpanseData(rowData);
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
        handleCloseDelete={handleCloseDelete}
        deleteId={deleteExpanseData}
        deleteData={DeleteExpanseCategories}
      />
      <AddExpansesCategory
        open={openAdd}
        handleClose={handleCloseAdd}
        AddExpanseCategories={AddExpanseCategories}
        editExpanseData={editExpanseData}
        UpdateExpanseCategories={UpdateExpanseCategories}
        setEditExpanseData={setEditExpanseData}
      />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Expanses-Categories-Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Expanse Category
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={categoriesData ?? []}
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

export default ExpansesCategories;
