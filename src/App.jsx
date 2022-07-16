import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

	useEffect(() => {
		document.title = "Handwritten Classifier"
	}, [])
	const createGrid = (m, n) => {
		let grid = []
		for(let i = 0; i < m; i++) {
			grid.push([])
			for(let j = 0; j < n; j++) {
				grid[i].push(255)
			}
		}
		return grid
	}

	const [ gridInfo, setGrid ] = useState(createGrid(28, 28)) 

	const predict = () => {
		axios.post('/predict', {
			grid: gridInfo,
			label: '',
			prediction: false,
		}).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}
	const clearGrid = () => {
		setGrid(grid => [...createGrid(28, 28)])
	}
	return (
		<div className='main-container'>
			<div className='detail'>
				<h1 className='title'>Handwritten Number Classifier</h1>
				<p>Incididunt reprehenderit officia aliquip est. Cillum voluptate consectetur tempor aliqua laborum eiusmod occaecat sunt dolor ea proident in. Velit incididunt cillum dolor labore labore. Sint consectetur commodo nulla deserunt ex et fugiat cupidatat aute sunt quis aliqua ad anim. In nostrud aliqua mollit quis id dolor. Consequat elit eiusmod elit proident culpa et enim excepteur fugiat id dolore nisi adipisicing elit. 
					Occaecat adipisicing proident sunt velit eiusmod id et cupidatat do et quis magna consectetur. Commodo in culpa esse elit adipisicing nostrud amet magna. Consectetur do elit aliqua esse aliqua laborum exercitation.</p>
			</div>
			<div className="grid-parent">
				{gridInfo.map((grids, y) => {
					return (
						<div className='grid-col' key={y}>
							{
								grids.map((grid, x) => {
									return (
										<div key={x} 
											draggable
											onDragOver={() => {
												let tempGrid = gridInfo
												const around = [[0,1], [1,0], [0, -1], [-1, 0]]
												tempGrid[y][x] = 0
												for(let i = 0; i < 4; i++) {
													if((y + around[i][0] >= 0 && y + around[i][0] < 28) && (x + around[i][1] >= 0 && x + around[i][1] < 28)) {
														tempGrid[y + around[i][0]][x + around[i][1]] -= 50
													} 
												}
												setGrid(grid => [...tempGrid])
											}} 
											className='grid' style={{backgroundColor: `rgb(${grid}, ${grid}, ${grid})`}}>
										</div>
									)
								})
							}
						</div>
					)
					})
				}
			</div>
			<div className="button">
				<h3>Action :</h3>
				<button className='predict' onClick={() => predict()}><h2>Predict</h2></button>
				<button className='clear' onClick={() => clearGrid()}><h2>Clear</h2></button>
			</div>
		</div>
	)	
}

export default App