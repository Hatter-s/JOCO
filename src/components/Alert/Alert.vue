<script setup>
import { storeToRefs } from 'pinia';

import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
    <div v-if="alert" class="alert absolute bottom-4 right-4 w-auto text-xl rounded-lg" :class="alert.type" role="alert">
        {{ alert.message }}
        <button @click="alertStore.clear()" class="close ml-4">×</button>
    </div>
</template>