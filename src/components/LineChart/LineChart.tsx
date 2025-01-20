import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface LineChartProps {
    data: ApexAxisChartSeries
    options?: ApexOptions
}

export default function LineChart({ data, options = {} }: LineChartProps) {
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

    const width = options.chart?.width || defaultChartWidth
    delete options.chart?.width

    return (
        <ReactApexChart
            type='line'
            series={data}
            options={{ ...defaultOptions, ...options }}
            width={width}
        />
    )
}
