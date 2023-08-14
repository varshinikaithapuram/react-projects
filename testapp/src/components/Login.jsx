import React from 'react';
import axios from 'axios';
class Login extends React.Component{
    state = {
        username: '' ,
        password : '',
        login: 'NOTLOGGED'
      }

      updateValue=(event)=>{
        this.setState(
        
        {
          ...this.state,
          [event.target.name]: event.target.value
        }
        
        )}

        loginCheck=(event)=>{
            event.preventDefault();
        axios.post('https://workout-buddy-server.herokuapp.com/login',this.state).
        then(response=>response.data).then(data=>{
            localStorage.setItem('user_token',data.token);
            this.setState({
              login: 'LOGGEDIN'
            })
        })    
        .catch(error=>{
            console.log(error)
        })
        
            alert("You have successfully logged in");
          }

    render(){

      let el;

      switch(this.state.login){
        case 'NOTLOGGED':
        el= (
            <div className="container ">
              <div>
                <h1 class='jumbotron'> WORKOUT BUDDY!</h1>
              <h2 className="mt-5 mb-1 "  >Login Here!</h2>
              <hr />
              <form class="form " onSubmit={this.loginCheck}>
          <div>
            Enter User Name:<br/>
            <input type="text" className="form-control" name="username" placeholder="User Name...." value={this.state.username} onChange={this.updateValue} />

          </div><br></br>
          <div>
            Enter Password:<br></br>
            <input type="password" className="form-control" name="password"  placeholder="Password..." value={this.state.password} onChange={this.updateValue} />

          </div><br></br>

     <button type="submit" className="btn btn-primary">Submit</button>
              </form>
             </div>
         </div>

        );
       break;
       case 'LOGGEDIN':
         el= (<div className=" container jumbotron">
        <h1 className="display-3">Welcome {this.state.username}</h1>
        <hr className="my-2"/>
        <p className="lead">Upload your workout routine and let your friends know.</p>
             </div>)
       
       break;
          default:
            el=(
              <div>
                WELCOME TO THE SITE
              </div>
            )
      
      }
      return(
 
        <div>
             {el}
        </div>
        )    
   }
}


export default Login;