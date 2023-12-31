import { defineStore } from "pinia";
import router from "@/router";
import type {
  Register,
  UpdatedHealthInfo,
  HealthInfo,
  Reaction,
  SelfReaction,
  ChangedSelfReaction,
} from "@/types";
import {
  changeReaction,
  getAllReaction,
  getHealthInfo,
  getHealthInfoByMonth,
  getHealthInfoByWeak,
  getReactions,
  register,
  updateHealthInfo,
} from "@/api";
import { useAlertStore, useAuthStore } from ".";

const localStorageHealthInfo: unknown = JSON.parse(
  localStorage.getItem("user_health_info")!
);

const handleTypeUsers: HealthInfo | null =
  localStorageHealthInfo as HealthInfo | null;

const localStorageDisplayHealthBy: unknown = JSON.parse(
  localStorage.getItem("display_health_by")!
);

const handleDisplayHealthBy: "month" | "weak" =
localStorageDisplayHealthBy as "month" | "weak";

export const useUserStore = defineStore("users", {
  state: () => ({
    userHealthInfo: <HealthInfo | null>null,

    timeUpdatedHealthInfo: <string | null>null,
    displayHealthBy: <"month" | "weak"> handleDisplayHealthBy || "weak",

    error: <any>null,
    returnUrl: <string | null>null,
    isLikes: <[] | SelfReaction[]>[],
  }),
  getters: {
    getReaction(state) {
      return (isPost: boolean, entityReactionId: number): null | boolean => {
        if (state.isLikes.length === 0) {
          return null;
        }
        const isLikes =  state.isLikes.find(
            (isLike) =>
              isLike.isPost === isPost &&
              isLike.entityReactionId === entityReactionId
          )
        if(typeof isLikes === 'undefined') {
          return null;
        }
        
        return isLikes.isLike
      };
    },
  },
  actions: {
    async register(user: Register) {
      const alertStore = useAlertStore();

      try {
        const record = await register(user);

        const status = record?.data.status;

        if (status === 200) {
          this.error = null;
          router.push("./login");
          alertStore.success(record?.data.response);
        } else if (status === 400) {
          alertStore.error(record?.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getById(id: string) {},

    async updated(id: number, params: any) {},

    async delete(id: number) {},

    //HEALTH PART
    async updateHealthInfo(data: UpdatedHealthInfo) {
      const alertStore = useAlertStore();
      const authStore = useAuthStore();
      try {
        if (authStore.user?.id === undefined) {
          alertStore.error("don't valid user");
          router.push("/");
          return;
        }

        const record = await updateHealthInfo(authStore.user?.id, data);

        const status = record.data.status;
        console.log(status);
        
        if(status === 200) {
          console.log('run@');
          
          this.getHealthInfo(authStore.user?.id);
        }
      } catch (error) {
        // alertStore.error(error?.data.message);
        console.error(error);
      }
    },

    async getHealthInfo(userId: number) {
      const alertStore = useAlertStore();

      try {
        const record = await getHealthInfo(userId);
        const status = record?.data.status;

        if (status === 200) {
          const data = record.data.data;
          this.userHealthInfo = {
            height: data[0].value,
            weight: data[1].value,
            BMI: data[2].value,
            sleepTime: data[3].value,
            trainingTime: data[4].value,
          };

          const updateDate = new Date(data[0].createTime);
          let yy = updateDate.getFullYear() - 2000;
          let mm = updateDate.getMonth() + 1; // Months start at 0!
          let dd = updateDate.getDate();
          let ddStr = dd < 10 ? "0" + dd.toString() : dd.toString();
          let mmStr = mm < 10 ? "0" + mm.toString() : mm.toString();

          const formattedToday = ddStr + "/" + mmStr + "/" + yy;
          this.timeUpdatedHealthInfo = formattedToday;
        } else if (status === 400) {
          alertStore.error(record?.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getHealthInfoByWeak(userId: number, type: number) {
      const alertStore = useAlertStore();

      try {
        const record = await getHealthInfoByWeak(userId, type);
        const status = record?.data.status;

        if (status === 200) {
          const dataChart = record.data.data;
          let labels:any[] = [];
          let data:any[] = [];
          dataChart.forEach((element:any) => {
            labels.unshift(element.time);
            data.unshift(element.value);
          });

          return {
            labels,
            data,
          };
        } else if (status === 400) {
          alertStore.error(record?.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getHealthInfoByMonth(userId: number, type: number) {
      const alertStore = useAlertStore();

      try {
        const record = await getHealthInfoByMonth(userId, type);
        const status = record?.data.status;

        if (status === 200) {
          const dataChart = record.data.data;
          let labels:any[] = [];
          let data:any[] = [];
          dataChart.forEach((element:any) => {
            labels.unshift(element.time);
            data.unshift(element.value);
          });

          return {
            labels,
            data,
          };
        } else if (status === 400) {
          alertStore.error(record?.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    changeDisplayHealthBy(time: 'month' | 'weak') {
        this.displayHealthBy = time;

        localStorage.setItem("display_health_by", JSON.stringify(this.displayHealthBy));
    },

    //REACTION PART
    async getReactions(userId: number) {
      const alertStore = useAlertStore();

      try {
        const record = await getReactions(userId);

        const status = record?.data.status;
        
        if (status === 200) {
          const isLike: [] | SelfReaction[] = record.data.data;
          

          this.isLikes = isLike;
          
        } else if (status === 400) {
          alertStore.error(record?.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    async getAllReaction(userId:number) {
      const alertStore = useAlertStore();

      try {
        const record = await getAllReaction(userId);

        const status = record?.data.status;
        
        if (status === 200) {
          console.log(record.data.data);
          return record.data.data.like - record.data.data.dislike;

          
        } else if (status === 400) {
          alertStore.error(record?.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async changeReaction(data: ChangedSelfReaction) {
      return await changeReaction(data);
    },

    createReaction(data: SelfReaction) {
      const reaction = data;
      this.isLikes = [...this.isLikes, reaction];
    },
  },
});
