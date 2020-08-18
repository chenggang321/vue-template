/**
 * 气泡方法
 * this.$toast({
 *      tips: '显示文案',
 *      time: 显示时间 默认2500,
 *      icon: 图标是否显示 默认显示（true）,
 *      iconClass: 图标样式 默认是成功（el-icon-success）,
 * })
 */
import Vue from 'vue';
let showToast = false, // 存储toast显示状态
    toastVM = null; // 存储toast vm

export const toast = function(opts){
    let opt = {
        time: 2500,
        icon: true,
        iconClass: 'el-icon-success'
    };
    for (let property in opts) {
        opt[property] = opts[property];
    }
    let icon = !opt.icon ? '' : '<i :class="iconClass"></i>';

    var tmp = '<div class="ll-toast-mark" v-show="show"><div v-show="show" class="ll-toast">' + icon + '<p>{{tip}}</p></div></div>';

    if (showToast) {
        return;
    }
    if (!toastVM) {
        let toastTpl = Vue.extend({
            data: function () {
                return {
                    show: showToast,
                    tip: opts.tips,
                    iconClass: opt.iconClass
                }
            },
            template: tmp
        });
        toastVM = new toastTpl()
        let tpl = toastVM.$mount().$el;
        document.body.appendChild(tpl);
    }
    toastVM.tip = opts.tips;
    toastVM.iconClass = opt.iconClass;
    toastVM.show = showToast = true;

    setTimeout(function () {
        toastVM.show = showToast = false;
    }, opt.time)
}

export default {
    install: function(vm) {
        vm.prototype.$toast = toast
    }
}
