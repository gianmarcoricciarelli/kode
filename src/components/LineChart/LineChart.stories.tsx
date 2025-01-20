import { Meta, StoryObj } from '@storybook/react'
import { singleLineSeries } from '../../data'
import LineChart from './LineChart'

const meta = {
    title: 'LineChart',
    component: LineChart,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof LineChart>

export default meta
type Story = StoryObj<typeof LineChart>

export const SimpleLineChart: Story = {
    args: {
        data: singleLineSeries,
    },
}
