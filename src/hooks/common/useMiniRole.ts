import { ref, onMounted } from "vue";
import { userInfoRoleList } from "@/api/user";
import { useUserStore } from "@/pinia/modules/user";
export default () => {
  const userStore = useUserStore();
  const result = ref("");
  const getList = () => {
    userInfoRoleList({})?.then((item: any) => {
      if (item.code === 0) {
        result.value = item.body.map((item: any) => {
          return {
            ...item,
            name: item.roleName,
            value: item.roleName,
          };
        });
        userStore.miniRole = result.value;
      }
    });
  };
  onMounted(() => {
    getList();
  });
  return {
    getList,
    result,
  };
};
