import {defineStore} from 'pinia'
import type {IVariables} from "~/interfaces/IVariables";
import {useAPI} from "~/API/useAPI";
import type {IMetric} from "~/interfaces/IMetric";

export const useMetricStore = defineStore('metric', () => {
    const dateMax = ref<string>(new Date().toJSON().slice(0, 10));
    const dateStart = ref<string>(dateMax.value.slice(0,8) + '01');
    const dateEnd = ref<string>(dateMax.value);
    const table = ref<boolean>(true);
    const general = ref<boolean>(true);
    const search = ref<boolean>(false);
    const useAPIStore = useAPI();
    const variables = ref<IVariables>({
        input: {
            dateStart: dateStart.value,
            dateEnd: dateEnd.value
        }
    })
    async function getMetrics(){
        const data = await useAPIStore.getMetrics(variables.value).then(data => data)
        if (data.error.value){
            return false
        }else{
            return data.data.value.metrics
        }
    }
    async function getNewMetric(){
        variables.value.input.dateStart = dateStart.value
        variables.value.input.dateEnd = dateEnd.value
        return await getMetrics()
    }
    async function getDefaultMetric(){
        dateStart.value = dateMax.value.slice(0,8) + '01'
        dateEnd.value = dateMax.value
        variables.value.input.dateStart = dateStart.value
        variables.value.input.dateEnd = dateEnd.value
        return await getMetrics()
    }
    function getMetricDeviceByDate(data:Array<IMetric>, device:string,date:string){
        return data.filter((item)=> item.device === device && item.visitTime.slice(0,10) === date).length
    }
    function getMetricDate(data:Array<IMetric>){
        const allDate = new Set();
        data.forEach((item)=>{ allDate.add(item.visitTime.slice(0,10))})
        return allDate
    }
    function getMetricByDate(data:Array<IMetric>,date:string){
        return data.filter((item) => item.visitTime.slice(0,10) === date).length
    }
    function switchGraphics(){
        table.value = false
    }
    function switchTable(){
        table.value = true
    }
    function switchGeneral(){
        general.value = true
    }
    function switchDevice(){
        general.value = false
    }
    function switchToSearch(){
        search.value = true
    }
    function switchAfterSearch(){
        search.value = false
    }
    return {
        dateMax,
        dateStart,
        dateEnd,
        table,
        variables,
        general,
        search,
        getMetrics,
        getNewMetric,
        getDefaultMetric,
        getMetricDeviceByDate,
        switchGraphics,
        switchTable,
        getMetricDate,
        getMetricByDate,
        switchGeneral,
        switchDevice,
        switchToSearch,
        switchAfterSearch
    }
})
