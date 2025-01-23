import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Spinner } from 'react-bootstrap'
import style from './LineChart.module.scss'
import { markerClickEventOptions } from './LineChart.types'

interface LineChartProps {
    data: ApexAxisChartSeries
    labels: ApexXAxis['categories']
    width?: number
    height?: number
    options?: ApexOptions
    annotations?: ApexAnnotations
    loading?: boolean
    onClick?: (options: markerClickEventOptions) => void
}

const DEFAULT_WIDTH = 750
const DEFAULT_HEIGHT = 450

export default function LineChart({
    data,
    labels,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
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
        title: {
            ...defaultOptions.title,
            ...options.title,
        },
        chart: {
            ...defaultOptions.chart,
            events: {
                ...defaultOptions.chart?.events,
                markerClick: onClick
                    ? (_, __, options: markerClickEventOptions) => {
                          onClick(options)
                      }
                    : defaultOptions.chart?.events?.click,
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
                style={{ width: `${width}px`, height: `${height + 15}px` }}
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
