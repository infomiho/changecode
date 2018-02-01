import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

import { connect } from 'preact-redux';
import { route } from 'preact-router';

const mapStateToProps = state => ({
	authToken: state.authToken
});
@connect(mapStateToProps)
export default class Header extends Component {
	render() {
		const loggedIn = this.props.authToken !== null;
		return (
			<header>
				<nav className="navbar is-primary">
					<div className="container">
						<div className="navbar-brand">
							<Link className="navbar-item" href="/">
								Dilseksicari
							</Link>
							<div
								class="navbar-burger burger"
								data-target="navbarExampleTransparentExample"
							>
								<span />
								<span />
								<span />
							</div>
						</div>

						<div id="navbarExampleTransparentExample" className="navbar-menu">
							<div className="navbar-start">
								{!loggedIn && [<Link
									activeClassName="is-active"
									href="/login"
									className="navbar-item"
								>
									Prijava
								</Link>,
									<Link
										activeClassName="is-active"
										href="/register"
										className="navbar-item"
									>
										Registracija
								</Link>]}
								{loggedIn && <Link
									activeClassName="is-active"
									href="/"
									className="navbar-item"
								>
									Potvrdi
								</Link>}
							</div>
						</div>
					</div>
				</nav>
			</header>
		);
	}
}
