import React, { Component } from "react";
import axios from "axios";
import TurkeyList from "../../components/TurkeyList/TurkeyList";
import SingleTurkey from "../../components/SingleTurkey/SingleTurkey";
import "./HomePage.scss";

const API_URL_TURKEY_LIST =
  "https://api.unsplash.com/search/photos?client_id=UZ0vKVwnEJngHGIlma5NcHw8t1M9VmZ5VfE-8MEBVDg&query=turkey+bird&page=1&per_page=20";

const API_URL_LYRICS =
  "https://a3odwonexi.execute-api.us-east-2.amazonaws.com/default/Bars_API";

export default class HomePage extends Component {
  state = {
    turkeys: [],
    featuredTurkey: null,
    isLoading: true,
    academic: true,
  };

  getLyrics = (isAcademic) => {
    const reqBody = { method: "getQuote" };
    if (isAcademic) {
      reqBody.category = ["sfw", "james_baldwin"];
    } else {
      reqBody.category = ["sfw"];
    }
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
      this.setState({
        featuredTurkey: {
          ...this.state.featuredTurkey,
          lyrics: formattedLyrics,
        },
      });
    });
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
        this.getLyrics(this.state.academic);
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
    this.setState({ featuredTurkey: newTurkey }, () => {
      this.getLyrics(this.state.academic);
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.featuredTurkey !== prevState.featuredTurkey) {
      axios.get(API_URL_TURKEY_LIST).then((res) => {
        const filteredArray = res.data.results.filter((turkey) => {
          return turkey.id !== this.state.featuredTurkey.id;
        });
        this.setState({ turkeys: filteredArray });
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
          />
          <div>
            <button
              onClick={() => {
                this.getLyrics(true);
              }}
            >
              Academic
            </button>
            <button
              onClick={() => {
                this.getLyrics(false);
              }}
            >
              Colloquial
            </button>
          </div>
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
      <main className="main">
        <h2>
          Farm influencer content from extraordinary fowl and gifted thinkers.
          Motivate your birds to be their best selves!
        </h2>
        {this.showResults()}
      </main>
    );
  }
}
