import React from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash';

class ScrollLoader extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('wheel', this.scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('wheel', this.scrollListener);
  }

  scrollListener = _.debounce(() => {
    if (window.innerHeight + window.pageYOffset >= document.documentElement.offsetHeight) {
      // Scrolled to the bottom
      if (this.props.loader) this.props.loader();
    }
  }, 100);

  render() {
    const { children, page, pageCount, loader } = this.props;

    return (
      <React.Fragment>
        {children}
        {page < pageCount && (
          <div className="text-center mb-5">
            <Button color="primary" onClick={loader}>
              More
            </Button>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default ScrollLoader;
