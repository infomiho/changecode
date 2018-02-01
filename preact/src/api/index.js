import axios from 'axios';
import moment from 'moment';

const url = path => {
	const root =
		process.env.NODE_ENV === 'development' ? ' http://localhost:3000' : '';
	const prefix = '/change/api/hr';
	return `${root}${prefix}${path}`;
};

const get = (path, token = null) => {
	let headers = undefined;
	if (token !== null) {
		headers = {
			'X-Authorization': token
		}
	}
	return axios.get(url(path), {
		headers
	});
};
const post = (path, data) => axios.post(url(path), data);

export default {
	register(data) {
		return post('/account/register', data);
	},
	login(data) {
		return post('/account/login', data);
	},
	teamDetails(id, token) {
		return get(`/team/details/${id}`, token);
	},
	confirm(id, repository, token) {
		return get(`/team/confirm?id=${id}&repository=${repository}`, token)
	}
};
