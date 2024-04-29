# 通用声明

## global(全局)
```typescript
declare global {
    interface Window {
        $loadingBar: {
            start: Function;
            finish: Function;
            error: Function;
        }
    }
    const $loadingBar: Window.$loadingBar
}
```

## Vue
```typescript
export {}
import 'vue'
declare module 'vue' {
    interface ComponentCustomProperties {
        $msg: (key: string) => string
    }
}

declare module '*.vue' {
    import { ComponentOptions } from "vue"
    const componentOptions: ComponentOptions;
    export default componentOptions
}

import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title: string;
  }
}
```

## Axios
```typescript
import 'axios'
declare module "axios" {
    interface InternalAxiosRequestConfig {
        /** 不需要错误提示 */
        noNeedTip: boolean;
        /** 不需要 token 请求 */
        noNeedToken: boolean;
    }
}
```

## Api参数
```typescript
declare namespace HomePageApi {
    interface ToDo {
        ...
    }
}
```

## Pinia
```typescript
暂无
```