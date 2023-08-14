import React from 'react';
import axios from 'axios';
import AddPost from './addpost';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyProfile extends React.Component {
    state = {
        status: 'LOADING',
        posts: []
    }


    render() {
        let el;
        let nel;
        switch (this.state.status) {
            case 'NOTLOGGED':
                el = (
                    <div className="alert alert-info">
                        You need to be logged in
                </div>
                );
                break;
            case 'LOADING':
                el = (
                    <div className="alert alert-info">
                        Posts are being fetched
                </div>
                );
                break;
            case 'LOADED':
                el = (


                    this.state.posts.map(item => {

                        return (

                            <ul class="list-group" >
                                <li class="list-group-item active">{item.id}</li>
                                <li class="list-group-item">{item.description}</li>

                                <li class="list-group-item disabled">{item.scope}</li>
                            </ul>



                        )


                    }
                    )




                );
                break;
            case 'ERROR':
                el = (
                    <div className="alert alert-info">
                        {this.state.error.message}
                    </div>
                );
                break;
            default:
                el = (
                    <div className="alert alert-info">
                        something unexpected has happened
                </div>

                );

        };
        if (this.state.status) {
            nel = (
                <div>


                    {el}

                </div>
            )
        }
        if (this.state.status != 'NOTLOGGED') {
            nel = (
                <div>

                    <AddPost />
                    <h3>Your Posts</h3>
                    <hr />
                    {el}

                </div>
            )


        }
        return (
            <div className="container">

                {nel}
            </div>
        )
    }
    componentDidMount() {
        if (!localStorage.getItem('user_token')) {
            this.setState({
                status: 'NOTLOGGED'
            })
        }
        if (localStorage.getItem('user_token')) {
            axios({
                url: 'https://workout-buddy-server.herokuapp.com/posts/own',
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`
                    //'Content-Type': 'application/json'
                }
            })
                .then(response => response.data).then(data => {
                    this.setState({
                        status: 'LOADED',
                        posts: data
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }



}
export default MyProfile;