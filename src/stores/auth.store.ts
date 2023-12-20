import { defineStore } from "pinia";
import type { FakeUser } from "../types/types";
import router from '@/router';
import { useUsersStore } from "@/stores";
import { storeToRefs } from "pinia";

const localStorageUser: unknown = JSON.parse(localStorage.getItem("user")!);

const handleTypeUser: FakeUser | null = localStorageUser as
  | FakeUser
  | null;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: <FakeUser | null>handleTypeUser,
    error: <{ where: string; message: string } | null>null,
    returnUrl: <string | null> null
  }),
  actions: {
    login(username: string, password: string) {
      const { users } = storeToRefs(useUsersStore());

      const loggedUser = users.value.find((user) => {
        if (user.username === username) {
          if (user.password === password) {

            return true;
          }
          this.error = {
            where: "password",
            message: "wrong password",
          };
          return true;
        }
        return false;
      });

      if (typeof loggedUser !== "undefined" && this.error === null) {
        this.user = loggedUser;
        
        localStorage.setItem('user', JSON.stringify(loggedUser));
        router.push(this.returnUrl || '/');
      }else {
        this.error = {
          where: "user_name",
          message: "username is not found",
        };
      }

    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/account/login');
    }
  },
});
