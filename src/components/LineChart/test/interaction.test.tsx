import { categories, singleLineSeries } from '@data/index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApexOptions } from 'apexcharts'
import { afterEach, describe, expect, it, vi } from 'vitest'
import LineChart from '../LineChart'

vi.mock('react-apexcharts', () => ({
    default: ({ options }: { options: ApexOptions }) => (
        <div
            data-testid='mocked-chart'
            onClick={options.chart?.events?.markerClick}
        >
            MockedChart
        </div>
    ),
}))

describe('Interactions', () => {
    describe('onClick', () => {
        afterEach(() => {
            vi.clearAllMocks()
        })

        it('Should call the onClick function once', async () => {
            const mockOnClick = vi.fn().mockImplementation(() => {})
            render(
                <LineChart
                    data={singleLineSeries}
                    labels={categories}
                    onClick={mockOnClick}
                />
            )

            await userEvent.click(screen.getByText('MockedChart'))

            expect(mockOnClick).toHaveBeenCalledOnce()
        })
    })
})
