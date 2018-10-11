import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary';

import { setSearchField, requestRobots } from './actions';

const mapStateToProps = (state) => { //This function specifies what piece of state the app needs to listen to and send off as props
	return {
		searchField: state.searchRobots.searchField, //searchRobots is a reducer which owns the state of searchField, so you access it with state.searchRobots.searchField
		robots:state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispactToProps = (dispatch) => { //This function specifies what props the app should listen to that are actions that need to be dispatched to the reducer
	 return {
	 	onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
	 	onRequestRobots: () => dispatch(requestRobots())
	}
}


class App extends Component {

	componentDidMount() {
		this.props.onRequestRobots();
		}

	render () {
		const { searchField, onSearchChange, robots, isPending } = this.props; //searchField and onSearchChange get passed down as props through redux so we access them with this.props here
		const filteredRobots =  robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		if (isPending) {
			return <h1>Loading</h1>
		}
		else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots={filteredRobots}/>
						</ErrorBoundary>
					</Scroll>
				</div>
			);
		}
	}
}

export default connect(mapStateToProps, mapDispactToProps)(App);