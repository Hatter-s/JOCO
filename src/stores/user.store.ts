import { defineStore } from 'pinia';
import type { FakeUser } from '@/types/types';
import { fakeUsers } from '@/data/data';
import router from '@/router';
import PocketBase from 'pocketbase';
import type { Register } from '@/types';
import { register } from '@/api';
import { useAlertStore } from '.';

interface RegisterUser {
    username: string;
    passwordConfirm: string;
    password: string;
    email: string;
    emailVisibility: boolean,
    name: string,
    tag_name: string
}

const pb = new PocketBase('http://127.0.0.1:8090');
const localStorageUsers: unknown =
    JSON.parse(localStorage.getItem("users")!);

const handleTypeUsers: FakeUser[] | [] = localStorageUsers as FakeUser[] | [];

export const useUsersStore = defineStore('users', {
    state: () => ({
        users: <FakeUser[]>handleTypeUsers || fakeUsers,
        error: <any>null,
        returnUrl: <string | null>null
    }),
    actions: {
        async saveUsers() {
            localStorage.setItem("users", JSON.stringify(this.users))
        },

        async register(user: Register) {
            const alertStore = useAlertStore();

            try {
                const record = await register(user)

                const status  = record?.data.status;
    
                if (status === 200) {
                    this.error = null;
                    router.push('./login');
                    alertStore.success(record?.data.response);

                } else if (status === 400) {
                    alertStore.error(record?.data.message);

                }
                
            } catch (error) {
                console.error(error);
                
            }

        },

        async getAll() {

        },

        async getById(id: string) {
            const record = await pb.collection('users').getOne(id, {
                expand: 'relField1,relField2.subRelField',
            });


            // get only the first filename from "documents"
            //
            // note:
            // "documents" is an array of filenames because
            // the "documents" field was created with "Max Files" option > 1;
            // if "Max Files" was 1, then the result property would be just a string
            const firstFilename = record.avatar;

            // returns something like:
            // http://127.0.0.1:8090/api/files/example/kfzjt5oy8r34hvn/test_52iWbGinWd.png?thumb=100x250
            const url = pb.files.getUrl(record, firstFilename, { 'thumb': '40x40' });

            return {
                user_id: record.id,
                ava_img: url,
                tag_name: record.tag_name
            };
        },

        async updated(id: number, params: any) {

        },

        async delete(id: number) {

        }
    }
});