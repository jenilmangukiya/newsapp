import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
  }
  static defaultProps = {
    pageSize: "5",
    country: "in",
    category: "general"
  }

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 2,
      totalPage: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async updateNews() {
    
  }

  async componentDidMount() {
    this.props.setProgress(10);
    this.setState({ loading: true })

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedData = await data.json()
    let totalPagex = Math.ceil(parsedData.totalResults / this.props.pageSize);
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalPage: totalPagex,
      loading: false
    })
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    this.setState({ loading: true })

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      loading: false,
      page: this.state.page + 1
    })
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    return (<>
      <div className="container my-3">
        <h3 className="text-center my-4">News Monkey - Top Headlines From {this.capitalizeFirstLetter(this.props.category)} </h3>

        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalPage}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row g-4">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imgUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>

              })}
            </div>
          </div>
        </InfiniteScroll>

      </div>
    </>);
  }
}
