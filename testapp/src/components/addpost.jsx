import React from 'react';
import axios from 'axios';

class AddPost extends React.Component {

  state = {
    description: '',
    scope: '',
    success: ''
  }

  updateValue = (event) => {

    this.setState(

      {
        ...this.state,
        [event.target.name]: event.target.value
      }

    )



  }




  post = (event) => {
    event.preventDefault();

    axios({
      method: 'post',
      url: 'https://workout-buddy-server.herokuapp.com/posts',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
        'Content-Type': 'application/json'
      },
      data: {
        description: `${this.state.description}`,
        scope: `${this.state.scope}`
      }
    })
      .then(response => response.data).then(data => {
        this.setState({
          success: 'post has been successfully added'
        });
        alert("post has been successfully added");
      })
      .catch(err => {
        console.log(err);
      });

    //alert("state description"+this.state.description+" state scope"+this.state.scope);
  }



  render() {


    return (


      <div className="container">
        <h2 >Post your workout!</h2>
        <hr />
        <form onSubmit={this.post}>
          <div>
            <textarea type="text" class="form-control" rows="5" name="description" placeholder="Post here" value={this.state.description} onChange={this.updateValue} />

          </div><br></br>
          <div>


            <select name="scope" value={this.state.scope} onChange={this.updateValue} >
              <option>select visibility</option>
              <option>PUBLIC</option>
              <option>PRIVATE</option>
            </select>
          </div>
          <br></br>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form><hr></hr> <br></br>
      </div>


    );
  }

}

export default AddPost;



/*
  updateName=(event)=>{

this.setState({
  name :event.target.value
});

console.log(this.state.name,this.state.value);

  }



  updateWorkout=(event)=>{

    this.setState({
      workout :event.target.value
    });



    console.log(this.state.workout);

      }

*/