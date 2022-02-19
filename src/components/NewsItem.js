import React, { Component } from 'react';

export default class NewsItem extends Component {


  render() {
    let { title, description, imgUrl, newsUrl, author, date, source } = this.props;
    return (
      <>
      
        <div className="card">
        <div className="card-body">
            <div className="" style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: 0
            }}>


              <span className="  badge  bg-primary" >
                {source}
              </span>
            </div>
          <img src={imgUrl} className="card-img-top" alt="..." />
          
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} On {new Date(date).toGMTString()}</small></p>
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-outline-dark btn-sm">Read more</a>
          </div>
        </div>
      </>
    );
  }
}