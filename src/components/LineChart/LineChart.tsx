import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'

interface LineChartProps {
    data: ApexAxisChartSeries
    options?: ApexOptions
}

export default function LineChart({ data, options = {} }: LineChartProps) {
    const defaultOptions: ApexOptions = {
        chart: {
            type: 'line',
        },
    }

    return (
        <ReactApexChart
            type='line'
            series={data}
            options={{ ...defaultOptions, ...options }}
        />
    )
}
