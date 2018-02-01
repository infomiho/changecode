import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';
import { setLoading, setAuthToken, setTeamId } from '../../store/actions';
import style from './style';

import api from '../../api';

const mapStateToProps = state => ({});
@connect(mapStateToProps, { setLoading, setAuthToken, setTeamId })
export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				Teamname: '',
				Password: ''
			}
		}
	}
	componentDidMount() {
	}
	onChange = (name, value) => {
		this.setState({
			form: { ...this.state.form, [name]: value }
		})
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.props.setLoading(true);
		api.login(this.state.form).then(response => {
			const data = JSON.parse(response.data.Result);
			console.log(data);
			this.props.setAuthToken(data.AuthorizationToken);
			this.props.setTeamId(data.TeamId);
			route('/');
			this.props.setLoading(false);
		}).catch(error => {
			console.error(error);
			this.props.setLoading(false);
		});
	}
	render() {
		return (
			<div class={style.Login}>
				<h1 class={`title is-2 ${style.MainTitle}`}>Login</h1>
				<form onSubmit={this.onSubmit}>
					<div class="field">
						<label class="label">Ime tima</label>
						<div class="control">
							<input class="input" type="text" placeholder="Ime tima" onChange={e => this.onChange('Teamname', e.target.value)} required/>
						</div>
					</div>
					<div class="field">
						<label class="label">Lozinka</label>
						<div class="control">
							<input class="input" type="password" placeholder="Lozinka" onChange={e => this.onChange('Password', e.target.value)} required/>
						</div>
					</div>
					<div class="control">
						<button class="button is-primary">Prijavi se</button>
					</div>
				</form>
			</div>
		);
	}
}
