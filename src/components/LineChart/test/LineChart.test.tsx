import { render, screen } from '@testing-library/react'
import { describe, it } from 'vitest'
import { singleLineSeries } from '../../../data'
import LineChart from '../LineChart'

describe('LineChart Component', () => {
    it('Should be rendered correctly', () => {
        render(<LineChart data={singleLineSeries} />)

        screen.debug()
    })
})
