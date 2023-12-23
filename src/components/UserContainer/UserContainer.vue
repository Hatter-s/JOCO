<template>
    <div class="navbar-spacing py-4 flex items-start gap-6">
        <div class="flex-1">
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
                <h2 class="text-2xl mt-6 mb-2 font-bold">Thông tin cá nhân</h2>
                <div class="flex justify-between">
                    <PersonalInfoBox v-for="data in dataFake" :title="data.title" :content="data.content">
                    <template v-slot:icon>
                        <Scale class="icon"/>
                    </template>
                    </PersonalInfoBox>
                </div>
            </div>
            <div class="chart">
                <h2 class="text-2xl mt-6 mb-2 font-bold">Biểu đồ</h2>
                <div class="flex justify-between gap-6 mb-6">
                    <div class="flex-1 rounded-md shadow-md p-8">
                        <div class="flex items-center gap-4">
                            <div class=" p-2 bg-primary text-white rounded-lg">
                                <Scale class="h-8 w-8" />
                            </div>
                            <p class="text-2xl font-medium">Cân nặng</p>
                        </div>
                        <LineChart/>
                    </div>
                    <div class="flex-1 rounded-md shadow-md p-8">
                        <div class="flex items-center gap-4">
                            <div class=" p-2 bg-primary text-white rounded-lg">
                                <BMI class="h-8 w-8" />
                            </div>
                            <p class="text-2xl font-medium">BMI</p>
                        </div>
                        <LineChart/>
                    </div>
                </div>
                <div class="flex justify-between gap-6">
                    <div class="flex-1 rounded-md shadow-md p-8">
                        <div class="flex items-center gap-4">
                            <div class=" p-2 bg-primary text-white rounded-lg">
                                <Sleep class="h-8 w-8" />
                            </div>
                            <p class="text-2xl font-medium">Thời gian ngủ</p>
                        </div>
                        <BarChart />
                    </div>
                    <div class="flex-1 rounded-md shadow-md p-8">
                        <div class="flex items-center gap-4">
                            <div class=" p-2 bg-primary text-white rounded-lg">
                                <Flash class="h-8 w-8" />
                            </div>
                            <p class="text-2xl font-medium">Luyện tập</p>
                        </div>
                        <BarChart />
                    </div>
                </div>
            </div>
        </div>
        <UserInfo/>
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

<style scoped>
.icon {
    @apply h-6 w-6;
}

</style>