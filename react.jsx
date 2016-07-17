$(() => {

	let p1 = new Promise((resolve, reject) => {
		$.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/recent', data => {
			resolve(data);
		});
	});
	let p2 = new Promise((resolve, reject) => {
		$.getJSON('https://fcctop100.herokuapp.com/api/fccusers/top/alltime', data => {
			resolve(data);
		});
	});


	Promise.all([p1, p2]).then(values => {
		const Tables = React.createClass({
			getInitialState: () => {
				return ({
					recent: values[0],
					allTime: values[1],
					usedSet: values[0],
				});
			},
			sortRecent: function() {
				this.setState({
					usedSet: this.state.recent,
				});
			},
			sortAll: function () {
				this.setState({
					usedSet: this.state.allTime,
				});
			},
			render: function () {
				let table1 = "";
				let table2 = "";
				for (let i = 0; i < 50; i++) {
					table1 += '<tr><td>'+(i+1)+'</td><td><img src="'+ this.state.usedSet[i].img +'"><a href="https://www.freecodecamp.com/' + this.state.usedSet[i].username + '">' + this.state.usedSet[i].username + '</a></td><td>' + this.state.usedSet[i].recent +
					'</td><td>' + this.state.usedSet[i].alltime + '</td></tr>';
					table2 += '<tr><td>'+(51+i)+'</td><td><img src="'+ this.state.usedSet[50 + i].img +'"><a href="https://www.freecodecamp.com/' + this.state.usedSet[50+i].username + '">' + this.state.usedSet[50 + i].username + '</a></td><td>' + this.state.usedSet[50 + i].recent +
					'</td><td>' + this.state.usedSet[50 + i].alltime + '</td></tr>';
				}
				let header1 = (this.state.usedSet === this.state.recent) ? '<i class="fa fa-caret-down" aria-hidden="true"></i> Monthly Points' : "Monthly Points";
				let header2 = (this.state.usedSet !== this.state.recent) ? '<i class="fa fa-caret-down" aria-hidden="true"></i> Total Points' : "Total Points";

				return (
					<div className='row'>
					<table className="six columns">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th onClick={this.sortRecent} dangerouslySetInnerHTML={{__html: header1}}></th>
								<th onClick={this.sortAll} dangerouslySetInnerHTML={{__html: header2}}></th>
							</tr>
						</thead>
						<tbody dangerouslySetInnerHTML={{__html: table1}}>
						</tbody>
					</table>
					<table className="six columns">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th onClick={this.sortRecent} dangerouslySetInnerHTML={{__html: header1}}></th>
								<th onClick={this.sortAll} dangerouslySetInnerHTML={{__html: header2}}></th>
							</tr>
						</thead>
						<tbody dangerouslySetInnerHTML={{__html: table2}}>
						</tbody>
					</table>
				</div>
				);
			}
		});

		ReactDOM.render(<Tables/>, document.querySelector('.wrapper'));

	});

});
