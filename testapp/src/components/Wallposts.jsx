import React from 'react'
import axios from 'axios'
class WallPosts extends React.Component{
    state= {
        status: 'LOADING',
        posts:[],
        votes: 0,
       
    }

 numvotes=0;
 itemID=0;
    like=(item_id)=>{
    
        this.itemID=item_id;
        //alert(pid);
        axios({
            method: 'post',
            url: `https://workout-buddy-server.herokuapp.com/posts/${item_id}/upvote`,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
              //'Content-Type': 'application/json'
          }
          })
         .then(response =>response.data).then(data=> {
             this.numvotes=data.votes;
             this.setState({
                votes:data.votes
             });
           // this.setState({
            //  success:'post has been successfully added'
            //});
            alert ("you liked the post");
         }) 
         .catch(err => {
            console.log(err);
         });

       
    }

    dislike=(item_id)=>{
    
        this.itemID=item_id;
        //alert(pid);
        axios({
            method: 'post',
            url: `https://workout-buddy-server.herokuapp.com/posts/${item_id}/downvote`,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('user_token')}`,
              //'Content-Type': 'application/json'
          }
          })
         .then(response =>response.data).then(data=> {
            this.numvotes=data.votes;
            this.setState({
               votes:data.votes
            });
           // this.setState({
            //  success:'post has been successfully added'
            //});
            alert ("you disliked the post");
         }) 
         .catch(err => {
            console.log(err);
         });
    }

    render()
    {
        let el;
        let nel;
    
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
                Posts are being fetched
                </div>
        );
        break;
        case 'LOADED':
            el=(

                  
                    this.state.posts.map(item=>{
                        
                        return (
                    <ul class="list-group" >
                    <li class="list-group-item active">{item.user_id}</li>
                    <li class="list-group-item ">{item.description}</li>
                   
                    <li class="list-group-item disabled">{item.scope}</li>
                    <li class="list-group-item disabled">{(item.id==this.itemID)?this.numvotes:0}</li>
                    <li> 
                        <button type="submit" class="btn btn-primary" onClick={()=>{this.like(item.id)}} >Like</button>
                        <button type="submit" class="btn btn-danger"  onClick={()=>{this.dislike(item.id)}}> Dislike</button>
                         </li>
                   
                           </ul>
                           

                         
                        )
                        
                        
                         }
               )

            
              
             
            );
            break;
        case 'ERROR':
            el=(
                <div className="alert alert-info">
                {this.state.error.message}
                </div>
            );
            break;
        default:
            el=(
                <div className="alert alert-info">
                something unexpected has happened
                </div>
                
            );

    };
    if(this.state.status){
        nel=(
            <div>
                {el}
                
            </div>
        )
    }
    
        return(
            <div className="container">
                <h3>TimeLine Posts</h3>
                <hr />
               {nel}
              
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
            url: 'https://workout-buddy-server.herokuapp.com/posts/wall',
            method: 'get',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('user_token')}`
                //'Content-Type': 'application/json'
            }
         })
         .then(response =>response.data).then(data=> {
            this.setState({
                posts:data,
                status: 'LOADED'
            })
         }) 
         .catch(err => {
            console.log(err);
         });
        }
    }
}

export default WallPosts