/**
 * 过滤器
 * 所有方法名 都大写
 */

import {local, utils} from './index'
import config from '@/enums'

// 缓存学历数据
let degreesObj = {};
// 学历过滤 id => 名称
export const DEGREES = (id) => {
    if (!Object.keys(degreesObj).length) {
        degreesObj = local.getObject('degreesObj');
    }
    return degreesObj[id] ? degreesObj[id].name : '';
}

//最高学历
export const HIGHESTDEGREE = (num) => {
    return config.Degree['+' + num] ? config.Degree['+' + num] : "";
}

// 文本转html
export const NEWLINE = (str) => {
    return str ? str.replace(/\n/g, '<br>') : '';
}

// 时间
export const DATE = (date, fmt) => {
    if (!date) {
        return ''
    }
    if(!/^\-?\d{0,13}$/.test(date)){
        return date
    }
    date = new Date(date * 1);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
        }
    }
    return fmt;
}

// 时间戳转年月
export const TOYEARMONTHSLOT = (startYear, startMonth, endYear, endMonth) => {
    let result = '';
    var date = new Date();
    if (!endYear || endYear == 9999) {
        // endYear = (Vue.filter('date')( new Date(), 'yyyy-MM').split('-'))[0];
        // endMonth = (Vue.filter('date')( new Date(), 'yyyy-MM').split('-'))[1];
        endYear = date.getFullYear();
        endMonth = date.getMonth() + 1;
    }
    if (parseInt(endMonth) < parseInt(startMonth)) {
        endMonth = parseInt(endMonth) + 12;
        endYear = parseInt(endYear) - 1;
    }

    result += (endYear - parseInt(startYear)) ? (endYear - parseInt(startYear)) + '年' : '';
    result += (endMonth - parseInt(startMonth)) ? (endMonth - parseInt(startMonth)) + '个月' : '';

    return result ? result : '不足一个月';
}

//截字符串
export const SUBSTR = (str, num) => {
    var str = str || '';
    return (str.length > num ? str.substring(0, num) + '...' : str);
}

//保留几位小数、不四舍五入
// amount 保留位数
export const SAVEPOINT = (number, amount = 0) => {
    var str = '',
        result;

    if (typeof +number !== 'number') {
        return '';
    }

    str = number + '';

    if (str.lastIndexOf('.') == -1) {

        return number;
    } else {

        result = +str.substring(0, str.lastIndexOf('.') + amount + 1);
        return result;
    }
}

// 性别
export const GRENDER = (num) => {
    let grender = ['女', '男']
    return grender[num] ? grender[num] : '未知';
}

// 网址加前缀
export const SETURL = (str) => {
    if (!str) {
        return '';
    }
    ;
    if (str.indexOf("://") < 0) {
        return '//' + str;
    } else {
        return str;
    }
}

// 风险等级
export const RISKLEVEL = num =>{
    return config.RiskLevel[num] ? config.RiskLevel[num] : '';
}

// 订单状态
export const ORDERSTATUS = num => {
    return config.OrderStatus[num] ? config.OrderStatus[num] : '';
}

// 综合评价
export const COMPREHENSIVE = (num) => {
    return config.Comprehensive[num] ? config.Comprehensive[num] : '';
}

// 调查结果
export const RESULT = (num) => {
    return config.Result[num] ? config.Result[num] : '';
}

// 违规记录
export const VIOLATIONS = (num) => {
    return config.Violations[num] ? config.Violations[num] : '见说明';
}

// 客户等级
export const CUSTOMERGRADE = num => {
    return config.CustomerGrade[num] ? config.CustomerGrade[num] : ''
}

// 订单状态
export const STATUS = num => {
    return config.Status[num] ? config.Status[num]:''
}

export const ISREAL = num => {
    return config.IsReal[num] ? config.IsReal[num]:''
}

export const GENDER = num => {
    return config.Gender[num] ? config.Gender[num] : ''
}

export const PROSECUTETYPE = num => {
    return config.ProsecuteType[num] ? config.ProsecuteType[num] : ''
}

export const BUSINESSTYPE = num => {
    return config.BusinessType[num] ? config.BusinessType[num] : ''
}

export const DRIVERSTATUS = num => {
    return config.DriverStatus[num] ? config.DriverStatus[num] : ''
}

export const AGENTTYPE = num => {
    return config.AgentType[num] ? config.AgentType[num] : ''
}
export const RISK = num => {
    return config.Risk[num] ? config.Risk[num] : ""
}
export default {
    DEGREES,
    NEWLINE,
    DATE,
    TOYEARMONTHSLOT,
    SUBSTR,
    SAVEPOINT,
    GRENDER,
    SETURL,
    RISKLEVEL,
    ORDERSTATUS,
    COMPREHENSIVE,
    RESULT,
    VIOLATIONS,
    CUSTOMERGRADE,
    STATUS,
    ISREAL,
    GENDER,
    PROSECUTETYPE,
    BUSINESSTYPE,
    DRIVERSTATUS,
    HIGHESTDEGREE,
    AGENTTYPE,
    RISK
}
