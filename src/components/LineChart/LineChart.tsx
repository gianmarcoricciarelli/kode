import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Spinner } from 'react-bootstrap'
import style from './LineChart.module.scss'

interface LineChartProps {
    data: ApexAxisChartSeries
    labels: ApexXAxis['categories']
    height?: string | number
    width?: string | number
    options?: ApexOptions
    annotations?: ApexAnnotations
    loading?: boolean
}

export default function LineChart({
    data,
    labels,
    height = 450,
    width = 750,
    options = {},
    annotations = {},
    loading,
}: LineChartProps) {
    const defaultOptions: ApexOptions = {
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5,
            },
        },
        dataLabels: {
            enabled: false,
        },
        title: {
            align: 'left',
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
        },
        stroke: {
            curve: 'smooth',
        },
        chart: {
            type: 'line',
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
    }

    const _options: ApexOptions = {
        ...defaultOptions,
        dataLabels: {
            ...defaultOptions.dataLabels,
            ...options.dataLabels,
        },
        xaxis: {
            ...options.xaxis,
            categories: labels,
        },
        yaxis: {
            ...options.yaxis,
        },
        annotations: {
            ...annotations,
        },
    }

    if (loading) {
        return (
            <div
                style={{ height, width }}
                className={style['loading-container']}
            >
                <Spinner
                    className={style['loading-container__spinner']}
                    animation='border'
                    variant='primary'
                />
                <span>Loading...</span>
            </div>
        )
    }

    return (
        <ReactApexChart
            type='line'
            series={data}
            options={_options}
            height={height}
            width={width}
        />
    )
}
