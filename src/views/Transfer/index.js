/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Button, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Iconify from '../../ui-component/iconify';
import AddTransfer from './AddTransfer';
import { getApi, postApi } from 'services/api';

// ----------------------------------------------------------------------

const Transfer = () => {
  const userId = localStorage.getItem('user_id');

  const [openAdd, setOpenAdd] = useState(false);
  const [walletData, setWalletData] = useState([]);
  const [transferData, setTransferData] = useState([]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const getWalletList = async () => {
    const response = await getApi(`Wallet/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setWalletData(response.data.getAllResult);
    }
  };

  const getTransferList = async () => {
    const response = await getApi(`transfer/list?createdBy=${userId}&type=${`deposit`}`);
    if (response && response.status === 200) {
      setTransferData(response.data.getAllResult);
    }
  };

  const AddTransferData = async (values) => {
    const data = values;
    const response = await postApi('transfer/add', data);
    if (response && response.status === 201) {
      getTransferList();
    }
  };

  useEffect(() => {
    getWalletList();
    getTransferList();
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
      field: 'fromAccount',
      headerName: 'From',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'toAccount',
      headerName: 'To',
      flex: 1
    },
    {
      field: 'amount',
      headerName: 'Deposit',
      flex: 1
    }
  ];

  return (
    <>
      <AddTransfer open={openAdd} handleClose={handleCloseAdd} walletData={walletData} AddTransferData={AddTransferData} />
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Funds Transfer</Typography>
          <Stack direction="row" alignItems="center" justifyContent={'flex-end'} spacing={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpenAdd}>
              New Transfer
            </Button>
          </Stack>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={transferData ?? []}
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

export default Transfer;
