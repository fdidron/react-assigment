import React from 'react';

const PostTitle = ({ title }) => <p>{title}</p>;

export default class Main extends React.Component {
  state = {
    error: null,
    postStore: [],
    postDisplayed: []
  };

  async componentDidMount() {
    //Fetches posts from the API, stores the results on the component's state
    //and triggers the display of psost every 5 seconds
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await res.json();
      this.setState({ postStore: posts }, () => {
        const posts = this.state.postStore;
        const interval = setInterval(() => {
          const postToAdd = posts.shift();
          const postDisplayed = this.state.postDisplayed;
          postDisplayed.push(postToAdd);
          this.setState({ postDisplayed });
          //Stop the interval once all stored posts were displayed
          if (posts.length === 0) clearInterval(interval);
        }, 5000);
      });
    } catch (e) {
      this.setState({ error: e.message });
    }
  }

  renderPosts = () => {
    return this.state.postDisplayed.map(({ id, title }) => (
      <PostTitle title={title} key={id} />
    ));
  };

  render() {
    const render = this.state.error ? <pre>{error}</pre> : this.renderPosts();
    return (
      <div>
        <h1>Posts</h1>
        {render}
      </div>
    );
  }
}
