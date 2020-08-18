/**
 * 首字母大写
 */
//顶部菜单对应路有名
export const MenuRouter = {
    1: 'background'
};

// 验证阶段
export const OrderStatus = {
    0:'待提交',
    2:'未验证',
    3:'验证中',
    4:'已完成',
    13:'授权中',
}

// 风险等级
export const RiskLevel = {
    1:'I级',
    2:'II级',
    3:'III级',
    9:'未评级'
}

//综合评价
export const Comprehensive = {
    1: 'I级',
    2: 'II级',
    3: 'III级',
    4: '待跟进',
    9: '未评级'
};

// 调查结果
const Result = {
    1: '正确',
    2: '错误',
    3: '详见说明'
};

//违规记录
export const Violations = {
    1: '有',
    2: '无',
    3: '其他'

};

// vip等级
export const CustomerGrade = {
    0:'未知',
    1:'普通',
    2:'vip1',
    3:'vip2',
    4:'vip3',
    5:'vip4',
}

// 订单状态
export const Status = {
    0:'未提交',
    1:'已授权',
    2:'未验证',
    3:'验证中',
    4:'验证完成',
    9:'已驳回未提交',
    10:'变更未选择',
    11:'变更未提交',
    12:'审核中',
    13:'授权中',
    14:'待支付',
    15:'授权过期'
}

// 角色枚举
export const Role = {
    1:'admin', // 管理员
    2:'follow', // 调查员
    3:'apply', // 交付员
    4:'legal', // 法务
    5:'am',   // am
    6:'hd', // hd 顾问
    7:'customer',// 外部客户
    8:'service', // 客服
}

//核查结果是否
export const IsReal = {
    1: '是',
    2: '否',
    3: '其他',

};

// 性别
export const Gender = {
    0:'女',
    1:'男'
}

// 民事诉讼类型
export  const ProsecuteType = {
    1:'裁判文书',
    2:'执行公告',
    3:'失信公告'
}

// 商业利益冲突类型
export const BusinessType = {
    1:'担任高管信息',
    2:'担任股东信息',
    3:'担任法人信息'
}

// 驾驶证状态
export const DriverStatus = {
    1:'未过期',
    2:'已过期'
}


// 学历
export const Degree = {
    '+0': '不限',
    '+1': '大专以下',
    '+2': '大专',
    '+3': '本科',
    '+8': '学士',
    '+9': '硕士研究生',
    '+4': '硕士',
    '+10':'博士研究生',
    '+5': '博士',
    '+6': '博士后',
    '+7': 'MBA'
};

// 来源
export const AgentType = {
    1: '埃摩森',
    2: '沃锐',
    3: '猎你',
    4: '安励'
}

// 风险等级
export const Risk = {
    1:'I',
    2:'II',
    3:'III',
    9:'未评级'
}

export default {
    MenuRouter,
    OrderStatus,
    RiskLevel,
    Comprehensive,
    Result,
    Violations,
    CustomerGrade,
    Status,
    Role,
    IsReal,
    Gender,
    ProsecuteType,
    BusinessType,
    DriverStatus,
    Degree,
    AgentType,
    Risk
}
