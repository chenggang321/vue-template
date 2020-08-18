import { $http } from '@/utils/http'
import { utils } from '@/utils'

const httpGet = utils.httpGet;
const httpPost = utils.httpPost;


// 基础数据版本
export const getBaseData = () => {
    return $http.get('api/basedata/v1/version');
}
// 学历
export const getDegrees = () => {
    return $http.get('api/basedata/v1/degrees');
}
// 套餐数据
export const cscCustomerV2JsonProduct = params => {
    return httpGet('api/csc/customer/v2/json/product', params)
}
// 获取背调状态统计
export const cscBackgroundV1StatusStatistics = params => {
    return httpGet('api/csc/background/v1/status/statistics', params)
}
// 获取余额统计
export const cscCustomerV1AccountLogStatistics = params => {
    return httpGet('api/csc/customer/v1/account/log/statistics', params)
}
// 申请背调
export const cscBackgroundV3Apply = params => {
    return httpPost('api/csc/background/v3/apply', params)
}
// 申请背调判断需要提供的材料
export const cscBackgroundV1ApplyRequire = params => {
    return httpGet('api/csc/background/v1/apply/require',params)
}
// 客户报告列表
export const cscBackgroundV1List = params => {
    return httpGet('api/csc/background/v1/list',params)
}
// 支付详情
export const cscPayV1AlipayMessage = params => {
    return httpGet('api/csc/pay/v1/alipayMessage',params)
}
// 支付
export const cscPayV1Alipay = params => {
    return httpPost('api/csc/pay/v1/alipay',params)
}
// 获取短网址
export const cscPayV1ReshUrl = params => {
    return httpPost('api/csc/pay/v1/reshUrl',params,false,{
        isCloseLoading:true
    })
}
// 发送授权短信
export const cscPayV1SendUrl = params => {
    return httpPost('api/csc/pay/v1/sendUrl',params)
}
// 客户跳转
export const authV1LoginBCustomer = params => {
    return httpPost('api/auth/v1/login/b/customer',params)
}

// mobile
// 是否授权
export const cscBackgroundV1AuthorizeGetStatus = params => {
    return httpGet('api/csc/background/v1/authorize/getStatus',params)
}
// 生成身份验证url
export const cscBackgroundV1AuthorizeUrl = params => {
    return httpPost('api/csc/background/v1/authorize/url',params)
}
// 发送短信验证码
export const cscBackgroundV1AuthorizeSmsSend = params => {
    return httpPost('api/csc/background/v1/authorize/smsSend',params)
}
// 验证验证码
export const cscBackgroundV1AuthorizeSmsSave = params => {
    return httpPost('api/csc/background/v1/authorize/smsSave',params)
}
// 获取回调状态
export const cscBackgroundV1AuthorizeGetAuthorizeStatus = params => {
    return httpGet('api/csc/background/v1/authorize/getAuthorizeStatus',params)
}

// 获取订单数据
export const cscBackgroundV1AuthorizeSurvey = params => {
    return httpGet('api/csc/background/v1/authorize/survey',params)
}

// 普通支付
export const cscPayV1Pay = params => {
    return httpPost('api/csc/pay/v1/pay',params)
}

// 支付宝回调
export const cscPayV1AlipaySave = params => {
    return httpPost('api/csc/pay/v1/alipaySave',params)
}

// 验证授权短信是否过期
export const cscBackgroundV1AuthorizeSmsTimeout = params => {
    return httpGet('api/csc/background/v1/authorize/smsTimeout',params)
}

// h5授权
export const cscBackgroundV1AuthorizeGetApiStatus = params => {
    return httpPost('api/csc/background/v1/authorize/getApiStatus',params)
}

// 批量背调申请
export const cscBackgroundBatchV1Apply = params => {
    return httpPost('api/csc/background/batch/v1/apply',params)
}

// 批量订单列表
export const cscBackgroundBatchV1List = params => {
    return httpGet('api/csc/background/batch/v1/list',params)
}

// 批量订单详情
export const cscBackgroundBatchV1Detail = params => {
    return httpGet('api/csc/background/batch/v1/detail', params)
}

// 批量订单详情列表
export const cscBackgroundBatchV1DetailList = params => {
    return httpGet('api/csc/background/batch/v1/detail/list',params)
}

// 批量订单详情列表导出报告
export const cscBackgroundBatchV1DetailExport = params => {
    return httpGet('api/csc/background/batch/v1/detail/export',params)
}

// 候选人导入Excel
export const cscBackgroundBatchV1CandidateExcel = params => {
    return httpPost('api/csc/background/batch/v1/candidateExcel',params)
}

// 支付宝批量支付
export const cscPayV1AlipayBatch = params => {
    return httpPost('api/csc/pay/v1/alipayBatch',params)
}

// 批量支付详情
export const cscPayV1AlipayBatchMessage = params => {
    return httpGet('api/csc/pay/v1/alipayBatchMessage',params)
}

// 批量普通支付
export const cscPayV1PayBatch = params => {
    return httpPost('api/csc/pay/v1/payBatch',params)
}
