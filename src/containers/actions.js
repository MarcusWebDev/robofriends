import { 
	CHANGE_SEARCH_FIELD, 
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants'; //The reason CHANGE_SEARCH_FIELD has been imported and made a constant in another file is so that if
					 // it is misspelled it will give us an error because its a const variable and not just a string in the object below


export const setSearchField = (text) => ({ //action.type in reducers.js somehow refers to this function. It is an action and it's accessing type, but I'm not sure how "action" is directing here
	type: CHANGE_SEARCH_FIELD,
	payload: text
})

export const requestRobots = () => (dispatch) => { //dispatch sends the action to the reducer. thunkMiddleware looks for actions that return functions. So we make this a higher order function (function returning a function) so that thunkMiddleware will detect it
	dispatch({ type: REQUEST_ROBOTS_PENDING });
	fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => response.json())
		.then(data => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data }))
		.catch(error => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error }))
		}
