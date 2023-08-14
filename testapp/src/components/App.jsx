import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Buddy from './buddy';
import Login from './Login';
import { Link,Route } from 'react-router-dom';
import MyProfile from './MyProfile';
import WallPosts from './Wallposts';


function App(props) {
    localStorage.setItem('user_token','');
  return (

        <div >
      <nav className="navbar navbar-expand-sm bg-light ">
                <Link className="navbar-brand" to="/">Home</Link>
                <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ">
                        <li className="nav-item ">
                            <Link className="nav-link" to="/buddy">Buddies<span className="sr-only">(current)</span></Link>
                        </li>
                         <li className="nav-item ">
                            <Link className="nav-link" to="/MyProfile">My Profile<span className="sr-only">(current)</span></Link>
                        </li> 
                        <li className="nav-item ">
                            <Link className="nav-link" to="/WallPosts">My Timeline<span className="sr-only">(current)</span></Link>
                        </li> 
                    </ul>
                </div>
            </nav>

            <Route path="/" component={Login} exact={true} />
            <Route path="/buddy" component={Buddy} exact={true} />
             <Route path="/MyProfile" component={MyProfile} exact={true} /> 
             <Route path="/WallPosts" component={WallPosts} exact={true} />

    </div>
  );
}

export default App;
