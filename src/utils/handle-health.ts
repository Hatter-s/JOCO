// in be don't communicate directly by name of health attr we use type
const equivalentName = ['height', 'weight', 'BMI', 'sleepTime', 'trainingTime'];

export const changeNameToType = (name: string) => {

    return equivalentName.findIndex(ele => ele === name) + 1;
}

export const changeTypeToName = (type: number) => {
    return equivalentName[type - 1];
}