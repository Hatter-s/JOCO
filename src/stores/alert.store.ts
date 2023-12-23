import { defineStore } from 'pinia';

interface Alert {
    message: string,
    type: string
}

export const useAlertStore = defineStore('alert',{
    state: () => ({
        alert: <Alert | null> null
    }),
    actions: {
        success(message:string) {
            this.alert = { message, type: 'alert-success' };
        },
        error(message :string) {
            this.alert = { message, type: 'alert-error' };
        },
        clear() {
            this.alert = null;
        }
    }
});