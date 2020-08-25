import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/components/Home";
import Signup from "@/components/Signup";
import Login from "@/components/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;