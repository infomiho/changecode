import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { setLoading } from '../../store/actions';
import style from './style';
import { route } from 'preact-router';

import api from '../../api';

const mapStateToProps = state => ({
	authToken: state.authToken,
	teamId: state.teamId
});
@connect(mapStateToProps, { setLoading })
export default class Confirm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			repository: '',
			teamDetails: {}
		}
	}
	componentWillMount() {
		if (this.props.authToken === null) {
			route('/login');
			return;
		}
		this.props.setLoading(true);
		api.teamDetails(this.props.teamId, this.props.authToken).then(response => {
			const data = JSON.parse(response.data.Result);
			this.setState({
				teamDetails: data
			});
			this.props.setLoading(false);
		}).catch(error => {
			console.error(error);
			this.props.setLoading(false);
		});
	}
	onChange = (name, value) => {
		this.setState({
			form: { ...this.state.form, [name]: value }
		})
	}
	onSubmit = (e) => {
		e.preventDefault();
		this.props.setLoading(true);
		api.confirm(this.props.teamId, this.state.repository, this.props.authToken).then(() => {
			this.props.setLoading(false);
		}).catch(error => {
			console.error(error);
			this.props.setLoading(false);
		})
	}
	render() {
		return (
			<div class={style.Confirm}>
				<h1 class={`title is-2 ${style.MainTitle}`}>Potvrdi</h1>
				<pre>
					{JSON.stringify(this.state.teamDetails, null, 4)}
				</pre>
				<form onSubmit={this.onSubmit}>
					<div class="field">
						<label class="label">Repozitorij</label>
						<div class="control">
							<input class="input" type="text" placeholder="Repozitorij" value={this.state.repository} onChange={e => this.onChange('repository', e.target.value)} required />
						</div>
					</div>
					<div class="control">
						<button class="button is-primary">Potvrdi</button>
					</div>
				</form>
			</div>
		);
	}
}
