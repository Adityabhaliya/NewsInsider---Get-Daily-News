import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

    
    constructor() {
        super()
         
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }

   async componentDidMount(){
         
        let url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=02b0f812bd0d4aec92965bbb5b45ff16&page=1&pageSize=20"
        let data = await fetch(url);
        let parsedData = await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles})
        
    }

    handlePrevClick =async ()=>{
        console.log('previews')
        
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=02b0f812bd0d4aec92965bbb5b45ff16&page=${this.state.page - 1}&pageSize=20 `
       let data = await fetch(url);
       let parsedData = await data.json()
       console.log(parsedData);
       this.setState({
               page:this.state.page - 1,    
           articles: parsedData.articles
       })
    }
    handleNextClick =async ()=>{
        console.log('Next') 
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=02b0f812bd0d4aec92965bbb5b45ff16&page=${this.state.page + 1}&pageSize=20`
       let data = await fetch(url);
       let parsedData = await data.json()
       console.log(parsedData);
       this.setState({
               page:this.state.page + 1,    
           articles: parsedData.articles
       })

    }

    render() {
        console.log('render');
        return (
           
            <div className='container my-3'>
                <h2>NewsInsider - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => { 
                         return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                 <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1 } type='button'  className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previews</button>
                    <button type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                 </div>
            </div>
        )
    }
}

export default News
// slice(0,45) can be used to fix the title and description 