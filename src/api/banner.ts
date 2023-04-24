import { http } from "./http";
import axios from "axios";

export function getBannerList(params: any) {
  // 轮播图列表
  return http.request({
    url: "/wisdom-community-admin/bannerInfo/list",
    method: "post",
    data: { ...params },
  });
}

export function patchBanner(params: any) {
  // 修改轮播图
  return http.request({
    url: "/wisdom-community-admin/bannerInfo/update",
    method: "post",
    data: { ...params },
  });
}

export function bannerDetail(params: any) {
  // 轮播图详情
  return http.request({
    url: "/wisdom-community-admin/bannerInfo/detail",
    method: "post",
    data: { ...params },
  });
}

export function addBanner(params: any) {
  // 轮播图详情
  return http.request({
    url: "/wisdom-community-admin/bannerInfo/add",
    method: "post",
    data: { ...params },
  });
}

// 获取上传回调函数
export function getOssSign(params: any) {
  // 轮播图详情
  return http.request({
    url: "/wisdom-community-admin/upload/getAliYunOssCallBackSignature",
    method: "post",
    data: { ...params },
  });
}

export function uploadFiles(params: any) {
  // return axios.post(params.url, params.data);
  return new Promise((resolve, reject) => {
    axios
      .post(params.url, params.data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
