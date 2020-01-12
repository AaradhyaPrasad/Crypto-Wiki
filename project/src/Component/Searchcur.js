import React,{Component} from 'react';
import './Searchcur.css';
import Load from './Load';
import Serched from './Serched';
 class Searchcur extends Component{
    state={
        f: false,
        currencys: [],
        rs:'',
        api_get: false,
        find_coin:[],
    }
    searchEvent =(e) =>
    {
        this.setState({
           [e.target.name]: ((e.target.value).charAt(0).toUpperCase() + (e.target.value).slice(1))
        });
        console.log(this.state.rs);
        
    }
    handleSubmit =(e) =>
    {
        e.preventDefault();
        let coin_id = this.state.currencys.filter(coin =>{
            return coin.name===this.state.rs;
        }
            );
            console.log(coin_id);
            var xhr= new XMLHttpRequest();
            xhr.open("GET","https://api.coingecko.com/api/v3/coins/"+coin_id[0].id+"");
            xhr.send();
            var data;
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                 data=JSON.parse(xhr.responseText);//changing the data into json format
                 console.log(data);
                 this.setState({find_coin:data,api_get: true});            
                }
              };
            //  this.setState({find_coin:data,api_found: true});
              //console.log(find_coin);
              
    }
     render()
     {
         return(
             <div>
             {this.state.f ?
             (
             <div className="header">

                <h1>Crypto Wiki</h1>
                <form>
                    <div><input className="search-input mb-2" type="text" placeholder="Enter the Crypto Currency Name" name="rs" value={this.state.value} onKeyUp={this.searchEvent}  />
                    <button className="btn btn-success" type="button"  onClick={this.handleSubmit}>Get Info About Coin</button>
                    </div>
                </form>

                {this.state.api_get ? (<Serched api_data={this.state.find_coin}  />) : (<p><b>Search For a Coin</b></p>)}

             </div>)
             :
             (
                  <Load />
             )}
             
             </div>
         );
         //in this we used a f (initialised as false)such data when api is fetched only then html code should be rendered 
         //another variable is used to found variable (same working as of f) which will call
     }
     async componentDidMount()
    {
        const url= "https://api.coingecko.com/api/v3/coins/list";
        const res= await fetch(url);
        const data =await res.json();
        console.log(data);
        this.setState({currencys:data,f: true});
    }
 }
 export default Searchcur;