import Axios from './http';
import MtaH5 from './mta';
import TimeReport from './timeReport';
import Raven from 'raven-js';

declare module 'vue/types/vue' {
    interface Vue {
        $axios: any;
        $mtaH5: any;
        $timeReport: any;
    }
}

const MyPlugin = {
    install: async (Vue: any, options: any) => {
        // 1. 添加全局方法或属性
        // Vue.myGlobalMethod = function () {
        //   // 逻辑...
        // }

        // 2. 添加全局资源
        // Vue.directive('my-directive', {
        //   bind (el, binding, vnode, oldVnode) {
        //     // 逻辑...
        //   }
        //   ...
        // })

        // 3. 注入组件选项
        // Vue.mixin({
        //   created: function () {
        //     // 逻辑...
        //   }
        //   ...
        // })

        // 4. 添加实例方法
        Vue.prototype.$axios = Axios;

        const res = await Axios.get({ url: '/static/config.json' });

        Vue.prototype.$mtaH5 = MtaH5(res);
        Vue.prototype.$timeReport = TimeReport(res);

        // 5. 错误处理
        // sentry
        Raven.config('https://b61abe8131f74cb09330266225caba4f@report.url.cn/sentry/203').install();
        Vue.config.errorHandler = (err: any /*, vm, info*/) => {
            Raven.captureException(err);
        };
    }
};

export default MyPlugin;
