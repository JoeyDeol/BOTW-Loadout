import React from 'react';
import ReactDOM from 'react-dom';

// First thing I want to render to the page is the component that is the landing/start page, which the user will start out on.
// Then when the user interacts with each of the buttons, I want each of the corresponding buttons to populate the page with certain items from the Firebase database I have set up.
// Each of those buttons once pressed with have an image, item name and an item description. All of which will be rendered from the firebase database that I create.
// Also as the user cycles through the items, there should be displays on the far right that update along with the item changes.
// Finally if I can, in a stretch goal, have the user be able to save each of the loadouts and have that associated with their personal account.

class App extends React.Component {
    render() {
      return (
        <div>
          <h1>Hello</h1>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
