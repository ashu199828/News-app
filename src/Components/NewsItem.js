import React from "react";
// import PropTypes from 'prop-types'


const NewsItem = (props)=>{

    let { title, description, imageUrl, newsUrl, author, time, source} = props;
    return (
      <div>
        <div className="card">
          <span style={{zIndex:'1', left:'90%'}} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">
            {source}
          </span>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://images.moneycontrol.com/static-mcnews/2020/09/IPO2_-770x433.png"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(time).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default NewsItem;
