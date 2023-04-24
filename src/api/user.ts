import { http } from "./http";

export function getInfo(data: any) {
  // 资源列表查询
  return http.request({
    url: "/api/login",
    method: "post",
    data,
  });
}
// /wisdom-community-admin/auth/code
// 获取登录验证码
export function getLoginCode(params: any) {
  // 轮播图详情
  return http.request({
    url: "/wisdom-community-admin/auth/code",
    method: "post",
    data: { ...params },
  });
}
// 登录
export function login(params: any) {
  return http.request({
    url: "/wisdom-community-admin/auth/login",
    method: "post",
    data: { ...params },
  });
}
// mock user
const user = {
  resultCode: 200,
  message: "SUCCESS",
  data: {
    totalCount: 7830,
    pageSize: 10,
    totalPage: 783,
    currPage: 1,
    list: [
      {
        userId: 7837,
        nickName: "15203205545",
        loginName: "15203205545",
        passwordMd5: "e10adc3949ba59abbe56e057f20f883e",
        introduceSign: "随新所欲，蜂富多彩",
        roleValue: "管理员",
        isDeleted: 0,
        lockedFlag: 1,
        createTime: "2022-05-31 15:52:54",
      },
      {
        userId: 7836,
        nickName: "15203204450",
        loginName: "15203204450",
        roleValue: "社区管理员",
        passwordMd5: "e10adc3949ba59abbe56e057f20f883e",
        introduceSign: "随新所欲，蜂富多彩",
        isDeleted: 0,
        lockedFlag: 1,
        createTime: "2022-05-31 15:49:00",
      },
      {
        userId: 7835,
        nickName: "13700001234",
        loginName: "13700001234",
        passwordMd5: "e10adc3949ba59abbe56e057f20f883e",
        introduceSign: "随新所欲，蜂富多彩",
        isDeleted: 0,
        roleValue: "乡管理员",
        lockedFlag: 1,
        createTime: "2022-05-13 16:25:50",
      },
    ],
  },
};
export function getSystemUserList(params: any) {
  // /wisdom-community-admin/sysUser/list
  // return Promise.resolve({ data: user.data });
  return http.request({
    url: "/wisdom-community-admin/sysUser/list",
    method: "post",
    data: { ...params },
  });
}
export function patchUserStatus(data: any, value: string) {
  user.data.list = user.data.list.map((item, i) => {
    return {
      ...item,
      roleValue: item.userId === data.userId ? value : item.roleValue,
    };
  });
}
//
// export function setUserStatus(data: any) {
//   return http.request({
//     url: "/api/login",
//     method: "post",
//     data,
//   });
// }

export function getUserList(params: any) {
  // 获取系统用户
  return http.request({
    url: "/wisdom-community-admin/sysUser/page",
    method: "post",
    data: { ...params },
  });
}

// 乡镇府select
export function getTownGovernment(params: any) {
  return http.request({
    url: "/wisdom-community-admin/townGovernment/list",
    method: "post",
    data: { ...params },
  });
}
// 社区信息列表
export function getCommunityInfoList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/list",
    method: "post",
    data: { ...params },
  });
}

export function getCommunityInfoSelectList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/communityInfo/selectList",
    method: "post",
    data: { ...params },
  });
}

// 保存系统用户信息
export function sysUserAdd(params: any) {
  return http.request({
    url: "/wisdom-community-admin/sysUser/add",
    method: "post",
    data: { ...params },
  });
}

// 修改系统用户信息
export function sysUserUpdate(params: any) {
  return http.request({
    url: "/wisdom-community-admin/sysUser/update",
    method: "post",
    data: { ...params },
  });
}
// 删除系统用户信息
export function sysUserDel(params: any) {
  return http.request({
    url: "/wisdom-community-admin/sysUser/del",
    method: "post",
    data: { ...params },
  });
}

// 系统用户详情
export function sysUserDetail(params: any) {
  return http.request({
    url: "/wisdom-community-admin/sysUser/detail",
    method: "post",
    data: { ...params },
  });
}

// 系统角色列表
export function sysRoleSelectList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/sysRole/selectList",
    method: "post",
    data: { ...params },
  });
}

// 系统用户分页
export function sysUserPage(params: any) {
  return http.request({
    url: "/wisdom-community-admin/sysUser/page",
    method: "post",
    data: { ...params },
  });
}

// 小程序 用户列表
export function userInfoList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/userInfo/list",
    method: "post",
    data: { ...params },
  });
}

// 小程序 角色列表
export function userInfoRoleList(params: any) {
  return http.request({
    url: "/wisdom-community-admin/userInfo/role/list",
    method: "post",
    data: { ...params },
  });
}

// 小程序用户编辑更新
export function userInfoUpdate(params: any) {
  return http.request({
    url: "/wisdom-community-admin/userInfo/update",
    method: "post",
    data: { ...params },
  });
}
// 小程序用户详情
export function userInfoDetail(params: any) {
  return http.request({
    url: "/wisdom-community-admin/userInfo/detail",
    method: "post",
    data: { ...params },
  });
}

// 登录用户信息
export function authInfo(params: any) {
  return http.request({
    url: "/wisdom-community-admin/auth/info",
    method: "post",
    data: { ...params },
  });
}
