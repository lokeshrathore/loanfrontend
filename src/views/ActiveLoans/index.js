/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
// @mui
import { Stack, Container, Typography, Card, Box } from '@mui/material';
import TableStyle from '../../ui-component/TableStyle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { getApi } from 'services/api';

// ----------------------------------------------------------------------

const ActiveLoans = () => {
  const userId = localStorage.getItem('user_id');

  const [activeLoanData, setActiveLoanData] = useState([]);

  const getActiveLoanList = async () => {
    const response = await getApi(`loan/list/approved?createdBy=${userId}`);
    if (response && response.status === 200) {
      setActiveLoanData(response.data.loans);
    }
  };

  useEffect(() => {
    getActiveLoanList();
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
      cellClassName: 'name-column--cell--capitalize'
    },
    {
      field: 'loanType',
      headerName: 'Loan Type',
      flex: 1
    },
    {
      field: 'loanStatus',
      headerName: 'Loan Status',
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
      renderCell: (params) => {
        return (
          <Typography>
            {params?.row?.releaseDate
              ? calculateDueDate(params?.row?.releaseDate, params?.row?.loanDuration, params?.row?.durationPeriod)?.toDateString()
              : '-'}
          </Typography>
        );
      }
    }
  ];

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" mb={5} justifyContent={'space-between'}>
          <Typography variant="h4">Active-Loans-Lists</Typography>
        </Stack>
        <TableStyle>
          <Box width="100%">
            <Card style={{ height: '600px', paddingTop: '15px' }}>
              <DataGrid
                rows={activeLoanData ?? []}
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

export default ActiveLoans;
