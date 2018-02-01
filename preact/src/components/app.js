import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { connect } from 'preact-redux';

import Header from './header';
import Confirm from '../routes/confirm';
import Login from '../routes/login';
import Register from '../routes/register';

import Error from '../routes/error';

import Loading from './Loading';

const mapStateToProps = state => ({
	loading: state.loading
});

@connect(mapStateToProps)
export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		const { loading } = this.props;
		return (
			<div id="app">
				<Header />
				{loading && <Loading />}
				<div className="Content">
					<div className="container">
						<Router onChange={this.handleRoute}>
							<Login path="/login" />
							<Confirm path="/" />
							<Register path="/register" />
							<Error type="404" default />
						</Router>
					</div>
				</div>
				<footer class="footer">
					<div class="container">
						<div class="content has-text-centered">
							<p>
								Pozdrav iz <a href="https://www.youtube.com/watch?v=JhHmUXzmCwE&feature=youtu.be&t=29s">footrea</a>
							</p>
						</div>
					</div>
				</footer>
			</div>
		);
	}
}
