import React from 'react';
import axios from 'axios';
import AddBuddy from './AddBuddy'
class Buddy extends React.Component{

    state={
        status:'LOADING',
        buddies:[],
        
    }
 




        

    

    render(){

        let el;
       
   
        switch(this.state.status){
            case 'NOTLOGGED':
                el=(
                    <div className="alert alert-info">
                        You need to be logged in
                    </div>
                );
                break;
            case 'LOADING':
                el=(
                    <div className="alert alert-info">
                        Buddy list is being fetched. Please wait...
                    </div>
                );
            break;

            case 'LOADED':
                el=(
                    <div className="row">
                        {
                            this.state.buddies.map( person => (
                                <div className="col-3 my-3">
                                
                                        <div class="card">
                                            <img class="card-img-top w-75 d-block mx-auto" src="" alt="" />
                                            <div class="card-body">
                                                <h4 class="card-title">{person.id}</h4>
                                                <p class="card-text">
                                                    {person.name}
                                                </p>
                                            </div>
                                        </div>
                                    
                                </div>
                            ))
                        }
                    </div>
                );

                break;
            
                default :

                el=(
                    <div className="alert alert-info">
                        Sorry there is some error!!!
                    </div>
                );
        }



return(
 
<div className="container">

<h3>Your Buddies</h3>
                <hr />
   
     {el}
<AddBuddy />
</div>



)


    }


componentDidMount() {

    if(!localStorage.getItem('user_token')){
        this.setState({
            status:'NOTLOGGED'
        })
    }

    if(localStorage.getItem('user_token'))
   { 
    axios({
        url: 'https://workout-buddy-server.herokuapp.com/users/buddies',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('user_token')}`
            //'Content-Type': 'application/json'
        }
     })
     .then(response =>response.data).then(data=> {
        
         this.setState({
           
              status: 'LOADED',
             buddies:data
         });
        
     }) 
     .catch(err => {
        console.log(err);
     });
}

}
}
export default Buddy;