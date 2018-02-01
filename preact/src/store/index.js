import { createStore } from 'redux';

let ACTIONS = {
	SET_LOADING: (state, { loading }) => ({
		...state,
		loading
	}),
	SET_AUTH_TOKEN: (state, { authToken }) => ({
		...state,
		authToken
	}),
	SET_TEAM_ID: (state, { teamId }) => ({
		...state,
		teamId
	})
};

const INITIAL = {
	loading: false,
	authToken: null,
	teamId: null
};

export default createStore(
	(state, action) =>
		action && ACTIONS[action.type]
			? ACTIONS[action.type](state, action)
			: state,
	INITIAL,
	typeof devToolsExtension === 'function' ? devToolsExtension() : undefined
);
