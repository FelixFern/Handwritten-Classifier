import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Popup from './components/Popup'

export const popupContext = createContext()

function App() {
	useEffect(() => {
		document.title = "Handwritten Classifier"
	}, [])
	const createGrid = (m, n) => {
		let grid = []
		for(let i = 0; i < m; i++) {
			grid.push([])
			for(let j = 0; j < n; j++) {
				grid[i].push(0)
			}
		}
		return grid
	}

	const [ gridInfo, setGrid ] = useState(createGrid(28, 28)) 
	const [ value, setValue ] = useState()
	const [ prediction, setPrediction ] = useState(-1)
	const [ popup, setPopup ] = useState(false)
	const [ loading, setLoading ] = useState(false)

	const predict = () => {
		setLoading(true)
		axios.post('/predict', {
			grid: gridInfo,
			label: '',
			prediction: false,
		}).then((res) => {
			setLoading(false)
			setPrediction(res.data.result)
			setPopup({"state": true, "type": "predicted"})
			setTimeout(() => {
				setPopup({"state": false, "type": "predicted"})
			}, 5000);
		}).catch((err) => {
			console.log(err)
		})
	}
	const addGrid = () => {
		axios.post('/add', {
			grid: gridInfo.toString(),
			label: value,
			prediction: true,
		}).then((res) => {
			setPopup({"state": true, "type": "success"})
			setTimeout(() => {
				setPopup({"state": false, "type": "success"})
			}, 5000);
			console.log(res)
		}).catch((err) => {
			setPopup({"state": true, "type": "failed"})
			setTimeout(() => {
				setPopup({"state": false, "type": "failed"})
			}, 5000);
			console.log(err)
		})
		clearGrid()
	}
	const clearGrid = () => {
		setGrid(grid => [...createGrid(28, 28)])
	}
	const setColor = (x, y) => {
		let tempGrid = gridInfo
		const around = [[0,1], [1,0], [0, -1], [-1, 0]]
		tempGrid[y][x] = 255
		for(let i = 0; i < 4; i++) {
			if((y + around[i][0] >= 0 && y + around[i][0] < 28) && (x + around[i][1] >= 0 && x + around[i][1] < 28)) {
				if(tempGrid[y + around[i][0]][x + around[i][1]] + 50 <= 255) {tempGrid[y + around[i][0]][x + around[i][1]] += 50}
			} 
		}
		setGrid(grid => [...tempGrid])
	}
	const getData = () => {

	}
	return (
		<popupContext.Provider value={{ popup, setPopup }}>
		<Popup></Popup>
		<div className='main-container'>
			<div className='detail'>
				<h1 className='title'>Handwritten Digits Classifier</h1>
				<p>a Handwritten Digits Classifier Neural Network Project, built with React and Flask</p>
				<h3>How to Use:</h3>
				<ol>
					<li>1. Draw a digit on the canvas (digit between 0 - 9)</li>
					<li>2. Click predict button on the right side of the page</li>
					<li>3. Then, the number predicted will be shown under the button</li>
					<li>4. Incase of inaccuracy you can add the data with the right label to the dataset, by filling the label input with the right label, then click add</li>
				</ol>
				<p>note : please don't spam the predict button</p>
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
											onClick={() => {
												setColor(x,y)
											}}
											onDragOver={() => {
												setColor(x,y)
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
			<div className="action">
				<div className="loading">
					<h3>{!loading ? "Handwritten Classifier" : "Working..."}</h3>
					<div className={loading ? "show-l loading-bar": "hide-l loading-bar"}></div>
				</div>
				<h3>Action Button</h3>
				<div className='button'>
					<button className='predict' onClick={() => predict()}><h2>Predict</h2></button>
					<button className='clear' onClick={() => clearGrid()}><h2>Clear</h2></button>
				</div>
				<h4>Your Prediction is : <span>{prediction}</span> </h4>
				<h3>Adding Data to Dataset</h3>
				<div className='add-data'>
					<p>Label : </p>
					<div className='input-field'>
						<input type="number" max={9} min={0} value={value} onChange={(e) => {setValue(e.target.value)}}></input>
						<button className='add' onClick={() => addGrid()}><h2>Add</h2></button>
					</div>
					<a href="https://docs.google.com/spreadsheets/d/1hhD5zAzPiJ-vHnAZDEcYkluxA1S0AmLQCQDoIMMBhk0/edit?usp=sharing">Dataset</a>
				</div>
			</div>
		</div>
		</popupContext.Provider>
	)	
}

export default App