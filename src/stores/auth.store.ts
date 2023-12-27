import { defineStore } from "pinia";
import type { FakeUser } from "../types/types";
import router from '@/router';
import {getFileURL, login, updateAvatar} from '@/api';
import PocketBase from 'pocketbase';
import { data } from "@/data/data";
import type { UserLoginData, User } from "@/types";
import { useAlertStore } from ".";

const pb = new PocketBase('http://127.0.0.1:8090');

const localStorageUser: unknown = JSON.parse(localStorage.getItem("user")!);

const handleTypeUser: User | null = localStorageUser as
  | User
  | null;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: <User | null> handleTypeUser,
    error:<boolean> false,
    returnUrl: <string | null>null
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const alertStore = useAlertStore();
        const authData = await login(username, password);
        const status = authData?.data.status;

        if(status === 200) {
          const user:UserLoginData = authData?.data.data;
          
          // update pinia state
          this.user = {
            id: user.id,
            username: user.username,
            avatarAddress: user.avatarAddress,
            tagName: user.tagName,
          }
  
          // store user details and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify({
            id: user.id,
            username: user.username,
            avatarAddress: user.avatarAddress,
            tagName: user.tagName,
          }));
  
          // redirect to previous url or default to home page
          router.push('/');
        } else if ( status === 400) {
          this.error = true
          alertStore.error(authData?.data.message);
        }

      } catch (error) {
        
        const handleTypeError:Error  = error as Error
        
      }
    },

    async updateAvatar(userId: number, formData:FormData) {
      const alertStore = useAlertStore();
      try {
        const record = await updateAvatar(userId, formData);
        const status = record?.data.status;
        if (status === 200) {
          const data = record.data.data;
          const avatarAddress  = data.avatarAddress;
          // @ts-ignore
          this.user = { ...this.user, avatarAddress: avatarAddress }
          localStorage.setItem('user', JSON.stringify({
            ...this.user
          }));
        } else if (status === 400) {
          alertStore.error(record?.data.message);

        }
      } catch (err) {
        console.error(err);

      }
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      pb.authStore.clear();
      router.push('/account/login');
    }
  },
});
