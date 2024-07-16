import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getApi } from 'services/api';
// project imports
import DisbusedGraphCard from './DisbusedGraphCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import AppCurrentVisits from './AppCurrentVisitCard';
import TotalActiveLoansCard from './TotalActiveLoansCard';
import TotalFullyPaidLoanCard from './TotalFullyPaidLoanCard';
import TotalDefaultLoansCard from './TotalDefaultLoansCard';
import TotalPendingLoansCard from './TotalPendingLoansCard';
import BusinessExpanseChart from './BussinessExpanseChart';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const userId = localStorage.getItem('user_id');

  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [fullyPaidLoanData, setFullyPaidLoanData] = useState([]);
  const [defaultLoanData, setDefaultLoanData] = useState([]);
  const [activeLoanData, setActiveLoanData] = useState([]);
  const [pendingLoanData, setPendingLoanData] = useState([]);
  const [businessExpansesData, setBusinessExpansesData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const [fundData, setFundData] = useState([]);

  const getFullyPaidLoanList = async () => {
    const response = await getApi(`loan/list/fullyPaid?createdBy=${userId}`);
    if (response && response.status === 200) {
      setFullyPaidLoanData(response.data.loans);
    }
  };

  const getDefaultLoanList = async () => {
    const response = await getApi(`loan/list/defaulted?createdBy=${userId}`);
    if (response && response.status === 200) {
      setDefaultLoanData(response.data.loans);
    }
  };

  const getActiveLoanList = async () => {
    const response = await getApi(`loan/list/approved?createdBy=${userId}`);
    if (response && response.status === 200) {
      setActiveLoanData(response.data.loans);
    }
  };

  const getPendingLoanList = async () => {
    const response = await getApi(`loan/list/pending?createdBy=${userId}`);
    if (response && response.status === 200) {
      setPendingLoanData(response.data.loans);
    }
  };

  const getBusinessExpanses = async () => {
    const response = await getApi(`expanses/businessExpanses?createdBy=${userId}`);
    if (response && response.status === 200) {
      setBusinessExpansesData(response.data);
    }
  };

  const getAllTotalCollection = async () => {
    const response = await getApi(`loan/totalLoanCollection?createdBy=${userId}`);
    if (response && response.status === 200) {
      setCollectionData(response.data);
    }
  };

  const getTotalFundDisbursed = async () => {
    const response = await getApi(`loan/totalFundDisbursed?createdBy=${userId}`);
    if (response && response.status === 200) {
      setFundData(response.data);
    }
  };
  useEffect(() => {
    getFullyPaidLoanList();
    getDefaultLoanList();
    getActiveLoanList();
    getPendingLoanList();
    getBusinessExpanses();
    getAllTotalCollection();
    getTotalFundDisbursed();
    // eslint-disable-next-line
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalActiveLoansCard isLoading={isLoading} activeLoanData={activeLoanData} />
          </Grid>
          <Grid item lg={3} md={6} sm={6} xs={12}>
            <TotalPendingLoansCard isLoading={isLoading} pendingLoanData={pendingLoanData} />
          </Grid>
          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalDefaultLoansCard isLoading={isLoading} defaultLoanData={defaultLoanData} />
          </Grid>

          <Grid item sm={6} xs={12} md={6} lg={3}>
            <TotalFullyPaidLoanCard isLoading={isLoading} fullyPaidLoanData={fullyPaidLoanData} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={7} md={12}>
            <TotalGrowthBarChart isLoading={isLoading} md={12} collectionData={collectionData} />
          </Grid>
          <Grid item xs={12} lg={5}>
            <DisbusedGraphCard isLoading={isLoading} fundData={fundData} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} lg={7} md={12}>
            <BusinessExpanseChart isLoading={isLoading} businessExpansesData={businessExpansesData} />
          </Grid>
          <Grid item xs={12} lg={5} md={12}>
            <AppCurrentVisits
              title="Current Loan Status"
              chartData={[
                { label: 'Active Loans', value: activeLoanData.length },
                { label: 'Pending Loans', value: pendingLoanData.length },
                { label: 'Defaulted Loans', value: defaultLoanData.length },
                { label: 'fullyPaid Loans', value: fullyPaidLoanData.length }
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.warning.main, theme.palette.error.main, theme.palette.success.main]}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
