import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface LineChartProps {
    data: ApexAxisChartSeries
    height?: number
    width?: number
    options?: ApexOptions
}

export default function LineChart({
    data,
    height,
    width,
    options = {},
}: LineChartProps) {
    const defaultChartHeight = 450
    const defaultChartWidth = 750
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

    const _width = width || defaultChartWidth
    const _height = height || defaultChartHeight

    return (
        <ReactApexChart
            type='line'
            series={data}
            options={{ ...defaultOptions, ...options }}
            height={_height}
            width={_width}
        />
    )
}
