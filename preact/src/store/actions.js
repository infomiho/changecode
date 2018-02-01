export function setLoading (loading) {
	return {
		type: 'SET_LOADING',
		loading
	}
}

export function setAuthToken (authToken) {
	return {
		type: 'SET_AUTH_TOKEN',
		authToken
	}
}

export function setTeamId (teamId) {
	return {
		type: 'SET_TEAM_ID',
		teamId
	}
}