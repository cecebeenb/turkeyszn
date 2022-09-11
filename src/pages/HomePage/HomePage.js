import React, { Component } from "react";
import axios from "axios";
import TurkeyList from "../../components/TurkeyList/TurkeyList";
import SingleTurkey from "../../components/SingleTurkey/SingleTurkey";
import "./HomePage.scss";
import axiosRetry from "axios-retry"

const API_URL_TURKEY_LIST =
  "https://api.unsplash.com/search/photos?client_id=UZ0vKVwnEJngHGIlma5NcHw8t1M9VmZ5VfE-8MEBVDg&query=turkey+bird&page=1&per_page=30";

const API_URL_LYRICS =
  "https://a3odwonexi.execute-api.us-east-2.amazonaws.com/default/Bars_API";

  const API_URL_QUOTE = "https://api.quotable.io/random"

export default class HomePage extends Component {
  state = {
    turkeys: [],
    featuredTurkey: null,
    isLoading: true,
    academic: true,
    caption: 'Loading...'
  };



  getCaption = (isAcademic) => {
    this.setState({caption: 'Loading...'})

    if (isAcademic == false) {
      const reqBody = { method: "getQuote", category: ["sfw"] };
      // if (isAcademic) {
      //   reqBody.category = ["sfw", "james_baldwin"];
      // } else {
      //   reqBody.category = ["sfw"];
      // }
      axiosRetry(axios, {
        retries: 5,
        retryCondition: (error) => {
          return error.response.status === 502
        },
      })
      axios.post(API_URL_LYRICS, reqBody).then((lyrics) => {
        let formattedLyrics = lyrics.data.data.lyric.replaceAll("â", "'")
        formattedLyrics = formattedLyrics.split('\n')
        .map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {item}
              <br />
            </React.Fragment>
          )
        })
  
        this.setState({caption: formattedLyrics})
      }).catch((error) => {
        console.log(error)

        axios.get('https://icanhazdadjoke.com/', {headers: {'Accept': 'application/json'}}).then((response) => {
          let joke = response.data.joke;
          this.setState({caption: joke})
        })
      });
    } else {
      axios.get(API_URL_QUOTE).then((quote) => {
        let formattedQuote = quote.data.content
        this.setState({caption: formattedQuote})
      });
    }

  };

  componentDidMount() {
    axios
      .get(API_URL_TURKEY_LIST)
      .then((res) => {
        this.setState(
          {
            featuredTurkey: res.data.results[0],
          },
          () => {
            const filteredArray = res.data.results.filter((turkey) => {
              return turkey.id !== this.state.featuredTurkey.id;
            });
            this.setState({ turkeys: filteredArray });
          }
        );
      })
      .then(() => {
        this.getCaption(this.state.academic);
      })
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleUpdate = (turkeyObj) => {
    const newTurkey = this.state.turkeys.find((turkey) => {
      return turkey.id === turkeyObj.id;
    });
    this.setState({ featuredTurkey: newTurkey });
    // this.setState({ featuredTurkey: newTurkey });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.featuredTurkey !== prevState.featuredTurkey) {
      axios.get(API_URL_TURKEY_LIST).then((res) => {
        const filteredArray = res.data.results.filter((turkey) => {
          return turkey.id !== this.state.featuredTurkey.id;
        });
        this.setState({ turkeys: filteredArray});
      });
    }
  }

  showResults = () => {
    if (!this.state.isLoading) {
      return (
        <>
          <SingleTurkey
            featuredTurkey={this.state.featuredTurkey}
            academic={this.state.academic}
            caption={this.state.caption}
          />
          <h4>Change caption</h4>
          <div>
            <button
              onClick={() => {
                this.getCaption(true);
              }}
            >
              Academic
            </button>
            <button
              onClick={() => {
                this.getCaption(false);
              }}
            >
              Colloquial
            </button>
          </div>
          <h4>Change turkey</h4>
          <TurkeyList
            turkeys={this.state.turkeys}
            handleUpdate={this.handleUpdate}
          />
        </>
      );
    } else {
      return <p>Loading...</p>;
    }
  };

  render() {
    return (
      <div className="main">
        <h2>Being an influencer just got easier.</h2>
        <p>This Thanksgiving, allow TurkeySZN to take care of the thing you are most grateful for: your social media presence and following. Generate inspirational content from extraordinary fowl and gifted thinkers, minus the hassle.</p>
        <>
          <SingleTurkey
            featuredTurkey={this.state.featuredTurkey}
            academic={this.state.academic}
            caption={this.state.caption}
          />
          <h4>Change caption</h4>
          <div>
            <button
              onClick={() => {
                this.getCaption(true);
              }}
            >
              Academic
            </button>
            <button
              onClick={() => {
                this.getCaption(false);
              }}
            >
              Colloquial
            </button>
          </div>
          <h4>Change turkey</h4>
          <TurkeyList
            turkeys={this.state.turkeys}
            handleUpdate={this.handleUpdate}
          />
        </>
      </div>
    );
  }
}
