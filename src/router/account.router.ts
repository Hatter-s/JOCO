export default {
  path: "/account",
  name: "account",
  component: () => import("@/views/AccountView.vue"),
  children: [
    { path: "", name: "invalid-acc", redirect: { name: 'login'}
    },
    {
      path: "login",
      name:"login",
      component: () => import("@/components/Login/Login.vue"),
    },
    {
      path: "register",
      name: "register",
      component: () => import("@/components/Registration/Registration.vue"),
    },
  ],
};
