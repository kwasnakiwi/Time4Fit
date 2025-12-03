import './../../../styles/loadings.css';
import loading from './../../../assets/images/loading.png';

function ToTimeForBiz(){


	return(
		<>
			<main className="loading-container t4b">
				<div className="loading-circle-wrapper">
					<div className="loading-circle-box t4b">
						<div className="loading-circle t4b">
							<img src={loading} alt="" />
						</div>
					</div>
					<div className="loading-text-content t4b">
						<h3>Trwa rozgrzewka twojego biznesu</h3>
						<p>
							Statystyki mówią, że placówki aktywne w Time4Biz<br />
							zwiększają liczbę zapisów o 28%.
						</p>
					</div>
				</div>
			</main>
		</>
	)
}

export default ToTimeForBiz