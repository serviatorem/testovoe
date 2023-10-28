import {defineStore} from "pinia";
import {useMetricStore} from "~/store/store";
import type {IMetric} from "~/interfaces/IMetric";

export const useMetricGraphStore = defineStore('metricGraph', () => {
    const store = useMetricStore()
    const metricsStoreGraph = ref()
    const dateStoreGraph = ref<string[]>(['']);
    const chartData = ref()
    const chartOptions = ref({
        responsive: true,
        maintainAspectRatio: false
    })

    async function createChartGlobal() {
        metricsStoreGraph.value = await store.getMetrics()
        dateStoreGraph.value = Array.from(store.getMetricDate(metricsStoreGraph.value))
        chartData.value = {
            labels: dateStoreGraph.value.map((item) => item.slice(5)),
            datasets: [
                {
                    label: 'Всего пользователей',
                    data: getGraphDataAllUser(dateStoreGraph.value, metricsStoreGraph.value),
                    backgroundColor: '#465779',
                    borderColor: '#465779',
                    fill: false
                },
                {
                    label: 'Новых пользователей',
                    data: getGraphDataNewUser(dateStoreGraph.value, metricsStoreGraph.value),
                    backgroundColor: '#99b3c6',
                    borderColor: '#99b3c6',
                    fill: false
                }
            ]
        }
    }

    async function updateChartGlobal() {
        const metricNewStore = await store.getMetrics()
        const {errorText, metric} = await store.validateMetric(metricNewStore)
        metricsStoreGraph.value = metric
        dateStoreGraph.value = Array.from(store.getMetricDate(metricsStoreGraph.value))
        chartData.value.labels = dateStoreGraph.value.map((item) => item.slice(5))
        chartData.value.datasets[0].data = getGraphDataAllUser(dateStoreGraph.value, metricsStoreGraph.value)
        chartData.value.datasets[1].data = getGraphDataNewUser(dateStoreGraph.value, metricsStoreGraph.value)
        return errorText
    }

    async function createChartDevice() {
        metricsStoreGraph.value = await store.getMetrics()
        dateStoreGraph.value = Array.from(store.getMetricDate(metricsStoreGraph.value))
        chartData.value = {
            labels: dateStoreGraph.value.map((item) => item.slice(5)),
            datasets: [
                {
                    label: 'Всего пользователей',
                    data: getGraphDataAllUser(dateStoreGraph.value, metricsStoreGraph.value),
                    backgroundColor: '#465779',
                    borderColor: '#465779',
                    fill: false
                },
                {
                    label: 'С ПК',
                    data: getGraphDataDevice(dateStoreGraph.value, metricsStoreGraph.value, 'PC'),
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    fill: false
                },
                {
                    label: 'С планшета',
                    data: getGraphDataDevice(dateStoreGraph.value, metricsStoreGraph.value, 'TABLET'),
                    backgroundColor: 'red',
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'С телефона',
                    data: getGraphDataDevice(dateStoreGraph.value, metricsStoreGraph.value, 'MOBILE'),
                    backgroundColor: 'green',
                    borderColor: 'green',
                    fill: false
                }
            ]
        }
    }

    async function updateChartDevice() {
        const metricNewStore = await store.getMetrics()
        const {errorText, metric} = await store.validateMetric(metricNewStore)
        metricsStoreGraph.value = metric
        dateStoreGraph.value = Array.from(store.getMetricDate(metricsStoreGraph.value))
        chartData.value.labels = dateStoreGraph.value.map((item) => item.slice(5))
        chartData.value.datasets[0].data = getGraphDataAllUser(dateStoreGraph.value, metricsStoreGraph.value)
        chartData.value.datasets[1].data = getGraphDataDevice(dateStoreGraph.value, metricsStoreGraph.value, 'PC')
        chartData.value.datasets[2].data = getGraphDataDevice(dateStoreGraph.value, metricsStoreGraph.value, 'TABLET')
        chartData.value.datasets[3].data = getGraphDataDevice(dateStoreGraph.value, metricsStoreGraph.value, 'MOBILE')
        return errorText
    }

    function getGraphDataAllUser(dateStore: string[], metricsStore: [IMetric]) {
        return dateStore.map((item: string) => {
                return store.getMetricUserByDate(metricsStore, item)
            }
        );
    }

    function getGraphDataNewUser(dateStore: string[], metricsStore: [IMetric]) {
        return dateStore.map((item: string) => {
            return store.getMetricNewUserByDate(metricsStore, item)
        })
    }

    function getGraphDataDevice(dateStore: string[], metricsStore: [IMetric], device: string) {
        return dateStore.map((item: string) => {
            return store.getMetricDeviceByDate(metricsStore, device, item)
        })
    }

    return {
        metricsStoreGraph,
        dateStoreGraph,
        chartData,
        chartOptions,
        createChartGlobal,
        updateChartGlobal,
        createChartDevice,
        updateChartDevice
    }
})
