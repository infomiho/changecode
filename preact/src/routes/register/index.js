import { h, Component } from 'preact';
import { route } from 'preact-router';
import { connect } from 'preact-redux';
import { setLoading } from '../../store/actions';
import style from './style';

import api from '../../api';

const mapStateToProps = state => ({});
@connect(mapStateToProps, { setLoading })
export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				Teamname: '',
				Password: '',
				Members: [
					{ "name": "", "surname": "", "mail": "" },
					{ "name": "", "surname": "", "mail": "" },
					{ "name": "", "surname": "", "mail": "" },
					{ "name": "", "surname": "", "mail": "" },
				]
			}
		}
	}
	onChange = (name, value) => {
		this.setState({
			form: { ...this.state.form, [name]: value }
		})
	}
	onMemberChange = (memberIndex, name, value) => {
		const members = this.state.form.Members;
		members[memberIndex] = { ...members[memberIndex], [name]: value }
		this.setState({
			form: { ...this.state.form, Members: members }
		})
	}
	onSubmit = (e) => {
		this.props.setLoading(true);
		api.register(this.state.form).then(() => {
			route('/login');
			this.props.setLoading(false);
		}).catch(error => {
			console.error(error);
			this.props.setLoading(false);
		});
	}
	render() {
		console.log(this.state.form.Members);
		return (
			<div class={style.Register}>
				<h1 class={`title is-2 ${style.MainTitle}`}>Registracija</h1>
				<form onSubmit={this.onSubmit}>
					<div class="field">
						<label class="label">Ime tima</label>
						<div class="control">
							<input class="input" type="text" placeholder="Ime tima" onChange={e => this.onChange('Teamname', e.target.value)} required />
						</div>
					</div>
					<div class="field">
						<label class="label">Lozinka</label>
						<div class="control">
							<input class="input" type="password" placeholder="Lozinka" onChange={e => this.onChange('Password', e.target.value)} required />
						</div>
					</div>
					<div class={style.Members}>
						{this.state.form.Members.map((member, index) =>
							<div class={style.Members__Member}>
								<h4 class={style.Members__Member.h4}>Član {index + 1}</h4>
								<div class="field">
									<label class="label">Ime</label>
									<div class="control">
										<input class="input" type="text" placeholder="Ime" onChange={e => this.onMemberChange(index, 'name', e.target.value)} required />
									</div>
								</div>
								<div class="field">
									<label class="label">Prezime</label>
									<div class="control">
										<input class="input" type="text" placeholder="Ime" onChange={e => this.onMemberChange(index, 'surname', e.target.value)} required />
									</div>
								</div>
								<div class="field">
									<label class="label">Mail</label>
									<div class="control">
										<input class="input" type="email" placeholder="Mail" onChange={e => this.onMemberChange(index, 'mail', e.target.value)} required />
									</div>
								</div>
							</div>
						)}
					</div>
					<div class="control">
						<button class="button is-primary">Registriraj se</button>
					</div>
				</form>
			</div>
		);
	}
}
