import {defineStore} from 'pinia'
import type {IVariables} from "~/interfaces/IVariables";
import {useAPI} from "~/API/useAPI";
import type {IMetric} from "~/interfaces/IMetric";
export const useMetricStore = defineStore('metric', () => {
    const dateMax = ref<string>(new Date().toJSON().slice(0, 10));
    const dateStart = ref<string>(dateMax.value.slice(0,8) + '01');
    const dateEnd = ref<string>(dateMax.value);
    const useAPIStore = useAPI();
    const variables = ref<IVariables>({
        input: {
            dateStart: '',
            dateEnd: ''
        }
    })
    async function getMetrics(){
        variables.value.input.dateStart = dateStart.value
        variables.value.input.dateEnd = dateEnd.value
        const data = await useAPIStore.getMetrics(variables.value).then(data => data);
        return data.error.value ? 'неправильная дата': data.data.value.metrics
    }
    async function getDefaultMetric(){
        dateStart.value = dateMax.value.slice(0,8) + '01'
        dateEnd.value = dateMax.value
        return await getMetrics()
    }
    async function validateMetric(metricNewStore:[IMetric] | string){
        if (typeof metricNewStore === "string"){
            const metric = await getDefaultMetric()
          return {
              metric:metric,
              errorText:metricNewStore
          }
        }else{
          return {
              metric:metricNewStore,
              errorText:''
          }
        }
    }
    async function newDate(newDateStart:string,newDateEnd:string){
        dateStart.value = newDateStart
        dateEnd.value = newDateEnd
    }
    function getMetricDeviceByDate(data:[IMetric], device:string,date:string){
        return data.filter((item)=> item.device === device && item.visitTime.slice(0,10) === date).length
    }
    function getMetricAllDevice(data:[IMetric],device:string){
        return data.filter((item) => item.device === device).length
    }
    function getMetricDate(data:[IMetric]){
        const allDate = new Set();
        data.forEach((item)=>{ allDate.add(item.visitTime.slice(0,10))})
        return allDate
    }
    function getMetricUserByDate(data:[IMetric],date:string){
        return data.filter((item) => item.visitTime.slice(0,10) === date).length
    }
    function getMetricAllUser(data:[IMetric]){
        return data.length
    }
    function getMetricNewUserByDate(data:[IMetric],date:string){
        return data.filter((item) => item.visitTime.slice(0,10) === date && item.isNew).length
    }
    function getMetricAllNewUser(data:[IMetric]){
        return data.filter((item)=>item.isNew).length
    }
    return {
        dateMax,
        dateStart,
        dateEnd,
        variables,
        getMetrics,
        validateMetric,
        newDate,
        getMetricDeviceByDate,
        getMetricAllDevice,
        getMetricDate,
        getMetricUserByDate,
        getMetricAllUser,
        getMetricNewUserByDate,
        getMetricAllNewUser
    }
})
