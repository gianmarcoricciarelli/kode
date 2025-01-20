import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { singleLineSeries } from '../../../data'
import LineChart from '../LineChart'

describe('LineChart Component', () => {
    it('Should be rendered correctly', () => {
        render(<LineChart data={singleLineSeries} />)

        expect(document.querySelector('.apexcharts-canvas')).toBeInTheDocument()
    })
})
