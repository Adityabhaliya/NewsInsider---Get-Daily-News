import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const News = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }



    const updateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95db5e5587624cfab1652d0a9dbc3771&page=${page}&pageSize=${props.pageSize}`

        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsInsider `
        updateNews();
        /* eslint-disable */
    },[])
    //above useEffect function in [] is need otherwise your api key will be requeste will be applied high ratio

    // const handlePrevClick = async () => {
    //     setPage(page - 1)
    //     updateNews();
    // }
    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews();

    // }
    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=95db5e5587624cfab1652d0a9dbc3771&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)


    }


    return (

        <>
            <h1 className='text-center ' style={{ margin: '30px 0px', marginTop: '90px' }}>NewsInsider - Top  {capitalizeFirstLetter(props.category)} Headlines</h1><hr />
            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="div container">


                    <div className="row">

                        {articles.map((element) => {

                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>

            {/* i can comment this next and previous button beacuse of we can impliment infinite scrool */}
            {/* <div className="container d-flex justify-content-between">
                    <button disabled={ state.page <= 1} type='button' className='btn btn-sm btn-dark' onClick={ handlePrevClick}>&larr; Previous</button>
                    <button disabled={ state.page + 1 > Math.ceil( state.totalResults / props.pageSize)} type='button' className='btn btn-sm btn-dark' onClick={ handleNextClick}>Next &rarr;</button>
                </div> */}
        </>
    )
}


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News
// slice(0,45) can be used to fix the title and description 