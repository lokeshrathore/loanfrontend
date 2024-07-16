/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box, IconButton, Chip, Tooltip } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../ui-component/iconify';
import AddWallets from './AddWallets';
import { postApi, getApi, EditApi, deleteApi } from 'services/api';
import DeleteModel from '../../ui-component/Deletemodle';

// ----------------------------------------------------------------------

const WalletsList = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [walletData, setWalletData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteWalletData, setWalletDeleteData] = useState('');
  const [editWalletData, setEditWalletData] = useState('');
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const getWalletList = async () => {
    const response = await getApi(`Wallet/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setWalletData(response.data.getAllResult);
    }
  };
  const AddWallet = async (values) => {
    const data = values;
    const response = await postApi('Wallet/add', data);
    if (response && response.status === 201) {
      getWalletList();
    }
  };

  const EditWallet = async (data) => {
    const response = await EditApi(`Wallet/edit/${editWalletData._id}`, data);
    if (response && response.status === 200) {
      getWalletList();
    }
  };

  const DeleteWallet = async (id) => {
    const response = await deleteApi(`Wallet/delete/${id}`);
    if (response && response.status === 200) {
      getWalletList();
    }
    handleCloseDelete();
  };

  useEffect(() => {
    getWalletList();
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
      field: 'walletName',
      headerName: 'Name',
      flex: 1
    },

    {
      field: 'slug',
      headerName: 'Slug',
      flex: 1,
      renderCell: (params) => {
        return <Chip label={params?.row?.walletName} color="primary" variant="outlined" />;
      }
    },
    {
      field: 'addFunds',
      headerName: 'Balance',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip title={params.value} placement="bottom">
              <Typography>{params.value ? params.value : '-'}</Typography>
            </Tooltip>
          </Box>
        );
      }
    },
    {
      field: 'createdOn',
      headerName: 'Created At',
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const handleDeleteClick = (deleteData) => {
          setWalletDeleteData(deleteData?.row?._id);
          handleOpenDelete();
        };
        const handleEditClick = (editData) => {
          setEditWalletData(editData?.row);
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
      <AddWallets
        open={openAdd}
        handleClose={handleCloseAdd}
        AddWallet={AddWallet}
        EditWallet={EditWallet}
        editWalletData={editWalletData}
        setEditWalletData={setEditWalletData}
      />
      <DeleteModel openDelete={openDelete} handleCloseDelete={handleCloseDelete} deleteData={DeleteWallet} deleteId={deleteWalletData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Wallets Lists</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Wallet
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={walletData ?? []}
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

export default WalletsList;
