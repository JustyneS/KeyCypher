import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const router = createRouter({
    history: createWebHistory(),
    routes: [
       
        { path: "/register", component: () => import("../views/Register.vue") },
        { path: "/sign-in", component: () => import("../views/Signin.vue") },
        { path: "/vault", component: () => import("../views/Vault.vue") },
        { path: "/generator", component: () => import("../views/Generator.vue"),
            meta: {
                requiresAuth:true,
            },
        },
    ], 
});

const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },

            reject
        )
    })
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("you dont have access!");
            next("/");
        }
    } else {
        next();
    }

});

export default router;