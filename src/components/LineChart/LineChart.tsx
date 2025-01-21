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
    onClick?: () => void
}

export default function LineChart({
    data,
    labels,
    height = 450,
    width = 750,
    options = {},
    annotations = {},
    loading,
    onClick,
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
            animations: { speed: 500 },
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
        chart: {
            ...defaultOptions.chart,
            events: {
                ...defaultOptions.chart?.events,
                click: onClick ? onClick : defaultOptions.chart?.events?.click,
            },
        },
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
                data-testid='spinner-container'
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
            data-testid='line-chart'
            type='line'
            series={data}
            options={_options}
            height={height}
            width={width}
        />
    )
}
