import React, {useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=> {
 const [articles, setarticles] = useState([])
   const [loading, setloading] = useState(true)
   const [page, setpage] = useState(1)
   const [totalResults, settotalResults] = useState(0)
  //  document.title = `${props.category}- Top headlines`;
  

  const updateNews= async ()=>{
    
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d8d8029df3ef4b1fb15770a247fefd44&page=1&pageSize=${props.pageSize}`;
    setloading(false)
    let data = await fetch(url)
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setarticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setloading(true)
    props.setProgress(100);

  }
  useEffect(() => {
    updateNews()
    // eslint-disable-next-line 
   }, [])
   // eslint-disable-next-line 
 
  // const handleprevClick= async ()=>{
  //    setpage(page - 1)
  //    updateNews();
        
  //   }
  //   const handlenextClick= async ()=>{
  //      setpage(page + 1)
  //      updateNews()
  //     }
      const fetchMoreData= async ()=>{
          let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d8d8029df3ef4b1fb15770a247fefd44&page=${page + 1}&pageSize=${props.pageSize}`;
          setpage(page + 1)
          let data = await fetch(url)
          let parsedData = await data.json()
          setarticles(articles.concat(parsedData.articles))
          settotalResults(parsedData.totalResults)
    
      }
    return (
      <>
      <h1 className="text-center" style={{marginTop:'90px'}}>News-Top {props.category} headlines</h1>
          
          {!loading && <Spinner/>}
          <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
           <div className="container my-3">
          <div className="row">
          {articles.map((element)=>{
            //   console.log(element.title)
             return <div className="col-md-4" key={element.url}>
               
                  <NewsItem
                  
                  title={element.title?element.title.slice(0,45):('')}
                  description={element.description?element.description.slice(0,88):('')}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author?element.author:(+'Unknown')}
                  time ={element.publishedAt}
                  source={element.source.name}/>
                  
              </div>
              
            
          })}
          
          </div>
          </div>
          </InfiniteScroll>
          </>  
    );
  
}

export default News;

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'science',
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}