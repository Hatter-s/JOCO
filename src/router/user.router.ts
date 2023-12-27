
export default {
    path: "/user/:id",
    component: () => import("@/views/UserView.vue"),
    children: [
        //   { path: "", name: "invalid-acc", redirect: { name: 'login'}
        //   },
        {
            path: "",
            name: "user",

            component: () => import("@/components/UserContainer/UserContainer.vue")
        },
        {
            path: "chart/:info",
            name: "user-info",
            component: () => import("@/components/ChartContainer/ChartContainer.vue"),
        },
        {
            path: "p",
            name: "user-posts",
            component:() => import ("@/components/MainContent/MainContent.vue")            
        }
    ],
};
