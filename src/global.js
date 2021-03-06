import Vue from 'vue'
import './antdv'
import '@assets/style/common.less'
import utils from '@/utils'
import http from '@/utils/http'
import Toast from '@/components/toast'
import filters from '@/utils/filters'

// 开发环境启用mock
// if(process.env.NODE_ENV === 'development') require('@/mock' );

// 遍历注册全局过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
Vue.use(utils);
Vue.use(http);
Vue.use(Toast);