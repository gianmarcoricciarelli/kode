import LineChart from '@components/LineChart/LineChart'
import { useEffect, useState } from 'react'
import style from './App.module.scss'
import { categories, singleLineSeries } from './data'

export default function App() {
    const [loading, setLoading] = useState(true)
    const [dataPointInfo, setDataPointInfo] = useState<number>()

    const max = Math.max(...(singleLineSeries[0].data as number[]))
    const min = Math.min(...(singleLineSeries[0].data as number[]))

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)
    }, [])

    return (
        <div className={style.app}>
            <span>LineChart Component test on Dev environment</span>
            <span>Click on the Chart to see the DataPoint's value</span>
            <LineChart
                data={singleLineSeries}
                labels={categories}
                options={{
                    title: { text: 'Example of a Line Chart' },
                    xaxis: { title: { text: 'Letters' } },
                    yaxis: { title: { text: 'Numbers' } },
                }}
                annotations={{
                    points: [
                        {
                            x: categories[
                                singleLineSeries[0].data.findIndex(
                                    (value) => value === min
                                )
                            ],
                            y: min,
                            label: {
                                text: 'Min',
                                borderColor: '#EF4444',
                                style: {
                                    color: '#FFFFFF',
                                    background: '#EF4444',
                                },
                            },
                        },
                        {
                            x: categories[
                                singleLineSeries[0].data.findIndex(
                                    (value) => value === max
                                )
                            ],
                            y: max,
                            label: {
                                text: 'Max',
                                borderColor: '#22C55E',
                                style: {
                                    color: '#FFFFFF',
                                    background: '#22C55E',
                                },
                            },
                        },
                    ],
                }}
                loading={loading}
                onClick={(options) =>
                    setDataPointInfo(
                        singleLineSeries[options.seriesIndex].data[
                            options.dataPointIndex
                        ] as number
                    )
                }
            />
            <div style={{ height: '24px' }}>
                {dataPointInfo && (
                    <span>{`Clicked on DataPoint ${dataPointInfo}`}</span>
                )}
            </div>
        </div>
    )
}
