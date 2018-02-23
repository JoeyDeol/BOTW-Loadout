import React from 'react';
import ReactDOM from 'react-dom';

// First thing I want to render to the page is the component that is the landing/start page, which the user will start out on.
// Then when the user interacts with each of the buttons, I want each of the corresponding buttons to populate the page with certain items from the Firebase database I have set up.
// Each of those buttons once pressed with have an image, item name and an item description. All of which will be rendered from the firebase database that I create.
// Also as the user cycles through the items, there should be displays on the far right that update along with the item changes.
// Finally if I can, in a stretch goal, have the user be able to save each of the loadouts and have that associated with their personal account.

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDW_b13sCnHwKn4hUMtCyqqFiccGASKQho",
  authDomain: "botw-loadouts.firebaseapp.com",
  databaseURL: "https://botw-loadouts.firebaseio.com",
  projectId: "botw-loadouts",
  storageBucket: "botw-loadouts.appspot.com",
  messagingSenderId: "775425643658"
};
firebase.initializeApp(config);

class Weapon extends React.Component {
  constructor() {
    super();
    this.state = {
      weapons: [],
    }
  };

  componentDidMount() {
    const dbref = firebase.database().ref('/Weapons');
    dbref.on('value', (snapshot) => {
      const weaponData = snapshot.val();
      console.log(weaponData);
      this.setState({
        weapons: weaponData
      })
    })
  };

  render() {
    return (
      <div>
          {this.state.weapons.map((item, i) => {
            return (
              <div className="weapons" key={item['Weapon Name'].replace(' ','-').toLowerCase()}>
                <h2>{item['Weapon Name']}</h2>
                <img src={item['Weapon Image']} />
                <p>{item.Attack}</p>
                <p>{item.Description}</p>
              </div>
            )
          })}  
      </div>
    )
  }
};

class Armor extends React.Component {
  constructor() {
    super();
    this.state = {
      headArmor: [],
      bodyArmor: [],
      legArmor: []
    }
  };
  componentDidMount() {
    const dbref = firebase.database().ref('/Armor/Body Armor');
    dbref.on('value', (snapshot) => {
      const bodyArmorData = snapshot.val();
      console.log(bodyArmorData);
      this.setState({
        // weapons: weaponData
      })
    })
  };

  render() {
    return (
      <div>
        {/* {this.state.weapons.map((item, i) => {
          return (
            <div className="weapons" key={item['Weapon Name'].replace(' ', '-').toLowerCase()}>
              <h2>{item['Weapon Name']}</h2>
              <img src={item['Weapon Image']} />
              <p>{item.Attack}</p>
              <p>{item.Description}</p>
            </div>
          )
        })} */}
      </div>
    )
  }
};

class App extends React.Component {
    constructor() {
      super();
      this.state = {
        showWeapons: false,
        showArmors: false,
      };
    this.getWeapon = this.getWeapon.bind(this);
    this.getArmor = this.getArmor.bind(this);
    }

    getWeapon () {
      this.setState({
        showWeapons: true,
      })
    }

    getArmor () {
      this.setState({
        showArmors: true,
      })
    }

    render() {
      return (
        <div>
          <button onClick={this.getWeapon}>Weapons</button>
          {this.state.showWeapons ? <Weapon /> : null}

          <button onClick={this.getArmor}>Armors</button>
          {this.state.showArmors ? <Armor /> : null}
        </div>
      )
    }
};

ReactDOM.render(<App />, document.getElementById('app'));
