import { defineStore } from 'pinia';
import type { FakeUser } from '@/types/types';
import { fakeUsers } from '@/data/data';
import router from '@/router';
import { useAuthStore } from '.';

const localStorageUsers: unknown =
  JSON.parse(localStorage.getItem("users")!);

const handleTypeUsers: FakeUser[] | [] = localStorageUsers as FakeUser[] | [];

export const useUsersStore = defineStore('users',{
    state: () => ({
        users: <FakeUser[]>  handleTypeUsers || fakeUsers,
        error:  <{ where: string; message: string } | null> null,
        returnUrl: <string | null> null
    }),
    actions: {
        async saveUsers() {
            localStorage.setItem("users",JSON.stringify(this.users))
        },
        async register(user:FakeUser) {
            const existUser = this.users.find(currUser => {
                if(currUser.username === user.username) {
                    this.error = {
                        where: 'username',
                        message: 'username is exist'
                    }
                    return true;
                }

                if(currUser.email === user.email) {
                    this.error = {
                        where: 'email',
                        message: 'email is exist'
                    }
                    return true;
                }

                return false;
                 
            });

            if(typeof existUser === 'undefined')
            {
                const authStore = useAuthStore();
                authStore.user = user;
                this.users = [...this.users , user];
                this.saveUsers()
                router.push(this.returnUrl || '/');
            }

        },
        async getAll() {

        },
        async getById(id:number) {

        },
        async updated(id:number, params:any) {

        },

        async delete(id:number) {

        }
    }
});