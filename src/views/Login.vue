<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="logo-info">
<!--        <img :src="getImage('LG', 'png')" />-->
        <p>{{ '智慧社区' }}</p>
        <span>欢迎使用{{ '智慧社区' }}管理系统</span>
      </div>
      <el-form
        ref="loginFormRef"
        @toLogin.prevent
        :model="loginForm"
        :rules="loginRules"
        hide-required-asterisk
      >
        <el-form-item prop="username">
          <el-input
            size="default"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            size="default"
            v-model="loginForm.code"
            placeholder="请输入验证码"
          >
            {{ loginForm.img }}
            <template #append>
              <el-image
                @click="refreshCode"
                style="width: 80px; height: 20px; cursor: pointer"
                :src="loginForm.img"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            size="default"
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
            @keyup.enter="toLogin(loginFormRef)"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="default"
            :loading="loading"
            style="width: 100%"
            type="primary"
            @click="toLogin(loginFormRef)"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="other-login" v-if="false">
        <el-button text disabled>其它登录方式</el-button>
        <el-button text disabled>忘记密码</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup name="AdminLogin">
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import type { FormInstance } from "element-plus";
import { useUserStore } from "@/pinia/modules/user";
import { siteName } from "@/router/middleware";
import { getImage } from "@/utils";
import { authInfo, getLoginCode, login } from "@/api/user";
import { ElMessage } from "element-plus";
const userStore = useUserStore();
const router = useRouter();
const { proxy } = <any>getCurrentInstance();
const loginFormRef = ref<FormInstance>();
const loading = ref<boolean>(false); //缓冲
const loginForm = reactive({
  username: "",
  password: "",
  img: "",
  code: "",
  uuid: "",
});

const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
});
onMounted(() => {
  refreshCode();
});
const refreshCode = () => {
  getLoginCode({}).then((item) => {
    loginForm.img = item.body.img;
    loginForm.uuid = item.body.uuid;
  });
};
const toLogin = async (formEl: FormInstance | undefined) => {
  //登陆
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      proxy._public.debounce(() => {
        loading.value = false;
        login(loginForm).then((item) => {
          if (item.code === 0) {
            ElMessage.success("登录成功");
            Cookies.set("token", item.body.token);
            authInfo({}).then((it) => {
              if (it.code === 0) {
                const roleName = it.body.roles.includes('ROLE_Resident_Management') ? '一网统管' : it.body.roles.includes('ROLE_Housing_Management') ? '以房管人' : it.body.roles.includes('ROLE_Fire_Control_Management') ? '社区防火安全' : '一网统管'
                userStore.$patch({
                  user: it.body.user,
                  info: it.body,
                  roleName,
                });
                if(roleName === '以房管人') {
                  document.body.setAttribute("style", "filter:hue-rotate(332deg);");
                } else if(roleName === '一网统管') {
                  document.body.setAttribute("style", "filter:hue-rotate(0);");
                }
              }
            });

            router.push({ path: "/dashboard/workbench" });
          } else {
            ElMessage.error(item.msg);
          }
        });
      }, 100);
    }
  });
};
</script>

<style lang="scss" scoped>
.login-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  .login-content {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    overflow: hidden;
    padding: 0 26px 24px 26px;
    box-sizing: border-box;
    margin-left: -198px;
    margin-top: -255px;
    .logo-info {
      margin-top: 30px;
      padding: 12px;
      text-align: center;
      img {
        height: 55px;
      }
      p {
        font-size: 24px;
        padding: 2px 0px;
      }
      span {
        font-size: 14px;
        color: #909399;
      }
    }
    .other-login {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
