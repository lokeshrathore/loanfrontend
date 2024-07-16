/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

// @mui
import { Stack, Container, Typography, Card, Box, Chip } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getApi } from 'services/api';

// ----------------------------------------------------------------------

const Transactions = () => {
  const userId = localStorage.getItem('user_id');

  const [transactionData, setTransactionData] = useState([]);

  const getTransferList = async () => {
    const response = await getApi(`transfer/list?createdBy=${userId}`);
    if (response && response.status === 200) {
      setTransactionData(response.data.getAllResult);
    }
  };

  useEffect(() => {
    getTransferList();
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
      field: 'createdOn',
      headerName: 'Transaction Date',
      flex: 1,
      cellClassName: 'name-column--cell--capitalize',
      valueFormatter: (params) => new Date(params.value).toLocaleString('en-US')
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip
            label={params?.value ? params?.value : 'N/A'}
            color={params?.value === 'deposit' ? 'success' : params?.value === 'withdrawal' ? 'error' : 'default'}
            variant="outlined"
          />
        );
      }
    },
    {
      field: 'toAccount',
      headerName: 'Wallet Name',
      flex: 1
    },
    {
      field: 'receiver',
      headerName: 'Payee',
      flex: 1,
      renderCell: (params) => <Typography>{`${params?.row?.createdBy?.firstName} ${params?.row?.createdBy?.lastName}`}</Typography>
    }
  ];

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Transactions-Lists</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={transactionData ?? []}
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

export default Transactions;
