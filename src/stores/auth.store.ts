import { defineStore } from "pinia";
import type { FakeUser } from "../types/types";
import router from '@/router';
import {login} from '@/api';
import PocketBase from 'pocketbase';
import { data } from "@/data/data";

const pb = new PocketBase('http://127.0.0.1:8090');

const localStorageUser: unknown = JSON.parse(localStorage.getItem("user")!);

const handleTypeUser: FakeUser | null = localStorageUser as
  | FakeUser
  | null;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: <FakeUser | null> handleTypeUser,
    error: <{ where: string | undefined; message: string | undefined; code:string | undefined } | null>null,
    returnUrl: <string | null>null
  }),
  actions: {
    async login(username: string, password: string) {
      try {
        const authData = await pb.collection('users').authWithPassword(
          username,
          password,
      );;

        const user = pb.authStore.model!;

        // update pinia state
        
        this.user = {
          user_id: user.id,
          username: user.username,
          ava_img: user.avatar,
          tag_name: user.tag_name,
        }



        // this.user = user;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify({
          user_id: user.id,
          username: user.username,
          ava_img: user.avatar,
          tag_name: user.tag_name,
        }));

        // redirect to previous url or default to home page
        router.push('/');
      } catch (error) {
        
        const handleTypeError:Error  = error as Error
        this.error = {
          where: 'true',
          code: '',
          message: 'Invalid username or password'
        }
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
