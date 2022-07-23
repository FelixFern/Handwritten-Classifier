import React, { useContext } from 'react'
import { dataModalContext } from '../App'
import { Bar } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

import './Data.css'

function Data({data}) {

    const { dataModal, setDataModal } = useContext(dataModalContext)
    return (
        <div className={dataModal ? 'show-d data-modal':'hide-d data-modal'}>
            <div className='close'>
                <div className='close-button' onClick={() => {setDataModal(false); console.log(dataModal)}}><h3>X</h3></div>
            </div>
            <div className='chart-container'>
                <h2>Data Distribution</h2>
                <Bar
                    data={{
                        labels: ['Digit 0', 'Digit 1', 'Digit 2', 'Digit 3', 'Digit 4', 'Digit 5', 'Digit 6', 'Digit 7', 'Digit 8', 'Digit 9'],
                        datasets: [
                            {
                                label: "Total",
                                id: 1,
                                data: data,
                                backgroundColor: ['#FF9315', '#FF3D3D', '#22ff52', '#24a0ed'],
                            },
                        ],
                    }}
                    options={{
                        scales: {
                            x: {
                                grid: {
                                    display: false
                                },
                                ticks: {
                                    color: "white"
                                }
                            },
                            y: {
                                grid: {
                                    color:"white"
                                },
                                ticks: {
                                    color: "white"
                                }
                            }
                        }
                    }}
                    
                ></Bar>
            </div>
        </div>
    )
}

export default Data