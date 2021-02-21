import history from '../../history';

export default function Dashboard() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    <div className="card">
                        <img src="https://picsum.photos/200/300/?blur" className="card-img-top" alt="..." height="200px" />
                        <div className="card-body">
                            <h5 className="card-title">Explore</h5>
                            <p className="card-text">Explore this amazing website.</p>
                            <button className="btn btn-primary" onClick={ () => history.push('all-questions') }>Start</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm">
                    <div className="card">
                        <img src="https://picsum.photos/200/300/?blur" className="card-img-top" alt="..." height="200px" />
                        <div className="card-body">
                            <h5 className="card-title">Ask Doubts</h5>
                            <p className="card-text">Post your questions here.</p>
                            <button className="btn btn-primary" onClick={ () => history.push('post-question') }>Start</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}