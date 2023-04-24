import { Request } from "./request";
// import * as qs from "qs"
// console.log("import.meta.env", import.meta.env)

export const http = new Request({
  baseURL: import.meta.env.VITE_HOST_API,
  // baseURL: "/wisdom-community-admin",
  timeout: 100000,
  //   headers: {
  //     "Content-Type": "application/json;charset=UTF-8",
  //   },
  //   transformRequest: [
  //     function (data, headers) {
  //       // 对 data 进行任意转换处理
  //       return qs.stringify(data)
  //     },
  //   ],
});
