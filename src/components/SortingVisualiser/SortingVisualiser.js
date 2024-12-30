import React, { Component } from 'react';
import Bar from './Bar';
import { useState } from 'react';



// Algorithms
import BubbleSort from './algorithms/BubbleSort';
import MergeSort from './algorithms/MergeSort';
import QuickSort from './algorithms/QuickSort';
import InsertionSort from './algorithms/InsertionSort';
import SelectionSort from './algorithms/SelectionSort';

// Icons
import { FaRegPlayCircle } from "react-icons/fa";
import { FaStepForward } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

import './SortingVisualiser.css';

class SortingVisualiser extends Component {
	
	state = {
		array: [],
		arraySteps: [],
		colorKey: [],
		colorSteps: [],
		timeouts: [],
		currentStep: 0,
		barCount: 10,
		delay: 300,
		algorithm: 'Bubble Sort',
	};

	ALGORITHMS = {
		'Bubble Sort': BubbleSort,
		'Merge Sort': MergeSort,
		'Quick Sort': QuickSort,
		'Insertion Sort': InsertionSort,
		'Selection Sort': SelectionSort,
	};
	

	componentDidMount() {
		//window.addEventListener('load', riseText);
		this.generateBars();
	}

	setTimeouts = () => {
		let steps = this.state.arraySteps;
		let colorSteps = this.state.colorSteps;

		this.clearTimeouts();
		let timeouts = [];

		let i = 0;

		while (i < steps.length - this.state.currentStep) {
			let timeout = setTimeout(() => {
				let currentStep = this.state.currentStep;
				this.setState({
					array: steps[currentStep],
					colorKey: colorSteps[currentStep],
					currentStep: currentStep + 1,
				});
				timeouts.push(timeout);
			}, this.state.delay * i);
			i++;
		}

		this.setState({
			timeouts: timeouts,
		});
	};

	changeAlgorithm = (e) => {
		this.clearTimeouts();
		this.clearColorKey();
		this.setState(
			{
				algorithm: e.target.value,
				currentStep: 0,
				arraySteps: [
					this.state.arraySteps[
						this.state.currentStep === 0 ? 0 : this.state.currentStep - 1
					],
				],
			},
			() => this.generateSteps()
		);
	};

	clearTimeouts = () => {
		this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
		this.setState({ timeouts: [] });
	};

	clearColorKey = () => {
		let blankKey = new Array(this.state.barCount).fill(0);
		this.setState({ colorKey: blankKey, colorSteps: [blankKey] });
	};

	stepBack = () => {
		let currentStep = this.state.currentStep;

		if (currentStep === 0) return;
		this.clearTimeouts();
		currentStep -= 1;
		this.setState({
			array: this.state.arraySteps[currentStep],
			colorKey: this.state.colorSteps[currentStep],
			currentStep: currentStep,
		})
	};

	stepForward = () => {
		let currentStep = this.state.currentStep;

		if (currentStep >= this.state.arraySteps.length - 1) return;
		this.clearTimeouts();
		currentStep += 1;
		this.setState({
			array: this.state.arraySteps[currentStep],
			colorKey: this.state.colorSteps[currentStep],
			currentStep: currentStep,
		})
	};

	generateSteps = () => {
		let array = this.state.array.slice();
		let steps = this.state.arraySteps.slice();
		let colorSteps = this.state.colorSteps.slice();

		this.ALGORITHMS[this.state.algorithm](array, 0, steps, colorSteps);

		this.setState({
			arraySteps: steps,
			colorSteps: colorSteps,
		});
	};

	generateRandomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	generateBars = () => {
		this.clearTimeouts();
		this.clearColorKey();

		let barCount = this.state.barCount;
		let arr = [];

		for (let i = 0; i < barCount; i++) {
			arr.push(this.generateRandomNumber(50, 200));
		}

		this.setState(
			{
				array: arr,
				arraySteps: [arr],
				barCount: barCount,
				currentStep: 0,
			},
			() => this.generateSteps()
		);
	};

	changeArray = (index, value) => {
		let array = this.state.array;
		array[index] = value;
		console.log(array);
		this.setState(
			{
				array: array,
				arraySteps: [array],
				currentStep: 0,
			},
			() => this.generateSteps()
		);
	};

	changeBarCount = (e) => {
		this.clearTimeouts();
		this.clearColorKey();
		this.setState(
			{
				barCount: parseInt(e.target.value),
			},
			() => this.generateBars()
		);
	};

	changeSpeed = (e) => {
		this.clearTimeouts();
		this.setState({
			delay: parseInt(e.target.value),
		});
	};

	render() {
		let barsDiv = this.state.array.map((value, index) => (
			<Bar
				key={index}
				index={index}
				length={value}
				color={this.state.colorKey[index]}
				changeArray={this.changeArray}
			/>
		));
		let playButton;

		if (this.state.arraySteps.length === this.state.currentStep) {
			playButton = (
				<button className='controller' onClick={this.generateBars}>
				    <FaArrowRotateLeft />
				</button>
			);
		} else {
			playButton = (
				<button className='controller' onClick={this.setTimeouts}>
					<FaRegPlayCircle />
				</button>
			);
		}

		return (
			<div className='app'>
			      <div >
				    {/*<button className='text-white border border-yellow-500 mt-5 ml-5 font-semibold p-2 hover:bg-yellow-500 rounded-md '>
						<a href='PathfindingVisualizer'>Path Finder</a>
					</button>*/}
				  </div>
			    
				  {/*<div className="flex justify-center items-center ">
				    
                    <h1 className='text-3xl font-bold text-center mb-5 text-white'>Sorting Visualiser</h1>
				</div>*/}	
				
				<div className='pannel w-full flex justify-center items-center mt-20 gap-11'>
					<form >
        <label htmlFor="algorithm" className='text-white text-3xl'>Choose Algorithm: </label>
        <select
          id="algorithm"
          name="algorithm"
		  className= ' text-white text-2xl bg-zinc-400 '
          
		  currentValue={this.state.algorithm}
		  onChange={this.changeAlgorithm}
        >
          <option value="Bubble Sort" className=''>Bubble Sort</option>
          <option value="Selection Sort">Selection Sort</option>
          <option value="Insertion Sort">Insertion Sort</option>
          <option value="Merge Sort">Merge Sort</option>
          <option value="Quick Sort">Quick Sort</option>
        </select>

        
      </form>

        {/*<form >
        
        <select
          id="Speed"
          name="Speed"
          
		  //currentValue={this.state.delay}
		   onChange={this.changeSpeed}
        >
          <option value="1x">1x</option>
          <option value="2x">2x</option>
          <option value="3x">3x</option>
          <option value="4x">4x</option>
          <option value="5x">5x</option>
        </select>

        
      </form>*/}

		</div>
				
				<div className='frame'>
					<div className='barsDiv container card bg-zinc-700'>{barsDiv}</div>
				</div>
				<div>
				<div className='control-pannel '>
					<div className='control-buttons'>
						<button className='controller' onClick={this.stepBack}>
						<FaStepBackward />
						</button>
						{playButton}
						<button className='controller' onClick={this.stepForward}>
						   <FaStepForward />
						</button>
					</div>
				</div>
				</div>
				
			
			</div>
		);
	}
}

export default SortingVisualiser;