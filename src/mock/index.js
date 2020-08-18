import Mock from 'mockjs'

import reportList from './report/list'
import work from './report/work'
import incomeList from './financial/income'
import customer from './console'
import cscBackgroundV1StatusStatistics from './report/list/cscBackgroundV1StatusStatistics'
import cscCustomerv1AccountLogStatistics from './financial/income/cscCustomerv1AccountLogStatistics'

/*Mock.mock('/api/report/list','get',reportList);
Mock.mock('/api/financial/income/list','get',incomeList);
/!*Mock.mock('/api/csc/customer/v1/get','get',customer);*!/
Mock.mock('/api/csc/product/v1/get','get',customer);
Mock.mock('/api/csc/background/v1/work/list','get',work);*/
/*Mock.mock('api/csc/background/v1/status/statistics','get',cscBackgroundV1StatusStatistics);
Mock.mock('api/csc/customerv1/account/log/statistics','get',cscCustomerv1AccountLogStatistics);*/

import pay from './batch/pay'
import cscBackgroundBatchV1Detail from './batch/cscBackgroundBatchV1Detail'
import cscBackgroundBatchV1DetailList from './batch/cscBackgroundBatchV1DetailList'
Mock.mock('api/csc/pay/v1/alipayBatchMessage','get',pay);
Mock.mock('api/csc/background/batch/v1/detail','get',cscBackgroundBatchV1Detail);
Mock.mock('api/csc/background/batch/v1/detail/list','get',cscBackgroundBatchV1DetailList);
