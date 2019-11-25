import React from 'react'
import axios from 'axios'

class Search extends React.Component{
    constructor(){
        super();
        this.state = {
            term: "",
            products: []
        }
    }

    getTerm(event) {
      console.log(event.target.value);
      let term = event.target.value;
      this.setState({term});
    }

    getProducts(){

        const url = '/products.json';
        const whenDone = (response) => {
          const data = response.data
          this.setState({ products: data })
          console.log( "Products retrieved",data );
        }

        const whenError = (error)=>{
          console.log(error);
        };

        axios.get(url)
            .then(whenDone)
            .catch(whenError)

    }

    render(){
        console.log( "rendering", this.state.products);

        // console log the posts, this should be an array of objects
        const products = this.state.products.map((product, index)=>{
          return (<div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>);
        });

        return(
            <div>
                <p>Search
                  <input onChange = {(event) => {
                      this.getTerm(event)
                  }}
                  term = {this.state.term}
                  />
                </p>

                <button onClick={() => { this.getProducts() }}>
                  Click to See All Products
                </button>
                {products}

            </div>
        );
    }

}

export default Search;