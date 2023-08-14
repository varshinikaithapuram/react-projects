import React from 'react';
import axios from 'axios'


class AddBuddy extends React.Component {
    constructor(props) {
        super(props);
    }







    state = {
        buddies: [],
        exbl:[]
    }
    addBuddy = (pid) => {


        //alert(pid);
        axios({
            method: 'post',
            url: `https://workout-buddy-server.herokuapp.com/users/buddies/add/${pid}`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
                //'Content-Type': 'application/json'
            }
        })
            .then(response => response.data).then(data => {
                // this.setState({
                //  success:'post has been successfully added'
                //});
                alert("Buddy has been successfully added");
            })
            .catch(err => {
                console.log(err);
            });
















    }

    render() {
        return (
            <React.Fragment>
                <div  style={{ fontWeight: 'bold' }}>Add your buddies</div>
                <div className="container " style={{ fontWeight: 'bold' }}>

                    <hr />

                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>

                                <th>Add buddy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.buddies.map(person => {
                                    return (
                                        <tr key={person.id}>
                                            <td>{person.name}</td>

                                            <td>
                                                <button className="btn btn-primary" onClick={() => { this.addBuddy(person.id) }} >Add</button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </React.Fragment>
        )
    }
    componentDidMount() {
        console.log(" in add buddy", this.props);
        if (localStorage.getItem('user_token')) {
            axios({
                url: 'https://workout-buddy-server.herokuapp.com/users',
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('user_token')}`
                    //'Content-Type': 'application/json'
                }
            })
                .then(response => response.data).then(data => {

                    this.setState({


                        buddies: data
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        }

        







    }
}

export default AddBuddy