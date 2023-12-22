<template>
    <div class="navbar-spacing py-4">
        <div>
            <div class="flex justify-between gap-12">
                <ButtonVue class="flex items-center btn-primary text-white flex-1 rounded-md">
                    <PlusCircle />
                    Bài đăng của tôi
                </ButtonVue>
                <ButtonVue class="flex items-center btn-primary text-white flex-1 rounded-md">
                    <PlusCircle />
                    Cập nhật thông tin
                </ButtonVue>
            </div>
            <div class="personal_info">
                <h2>Thông tin cá nhân</h2>
                <PersonalInfoBox v-for="data in dataFake" :title="data.title" :content="data.content">
                    <template v-slot:icon>
                        <Scale/>
                    </template>
                </PersonalInfoBox>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">

const dataFake = [
    {
        title: 'Cân nặng',
        content: '45 kg',
    },
    {
        title: 'Chiều cao',
        content: '165 cm',
    },
    {
        title: 'BMI',
        content: '20,1 kg/m2',
    },
    {
        title: 'Tập luyện',
        content: '15 phút - 22/10/23',
    },
]
</script>

<style scoped></style>