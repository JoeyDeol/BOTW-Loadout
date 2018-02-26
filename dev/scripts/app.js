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
  // this.console = this.console.bind(this);
  };

  componentDidMount() {
    const dbref = firebase.database().ref('/Weapons');
    dbref.on('value', (snapshot) => {
      const weaponData = snapshot.val();
      this.setState({
        weapons: weaponData
      })
    })
  };

  // console(item) {
  //   console.log("Got Clicked")
  //   console.log(item);
  // }

  render() {
    return (
      <div>
          {this.state.weapons.map((item) => {
            return (
              <div 
              // onClick={() => {<App data={item}/>}} 
              className="weapons" key={item['Weapon Name'].replace(' ','-').toLowerCase()}>
                <h2>{item['Weapon Name']}</h2>
                <img src={item['Weapon Image']} />
                <p>{item.Description}</p>
                <p>Attack: {item.Attack}</p>
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
    const dbref = firebase.database().ref('/Armor');
    dbref.on('value', (snapshot) => {
      const armorData = snapshot.val();
      const headArmorData = armorData['Head Armor'];
      const bodyArmorData = armorData['Body Armor'];
      const legArmorData = armorData['Leg Armor'];
      this.setState({
        headArmor: headArmorData,
        bodyArmor: bodyArmorData,
        legArmor: legArmorData
      })
    })
  };

  render() {
    return (
      <div>
        {this.state.headArmor.map((item, i) => {
          return (
            <div className="headArmor armors" key={item['Armor'].replace(' ', '-').toLowerCase()}>
              <h2>{item['Armor']}</h2>
              <img src={item['Armor Image']} />
              <p>{item.Description}</p>
              <p><span>Defense:</span> {item.Defense}</p>
              <p><span>Effect:</span> {item.Effect}</p>
            </div>
          )
        })}
        {this.state.bodyArmor.map((item, i) => {
          return (
            <div className="bodyArmor armors" key={item['Armor'].replace(' ', '-').toLowerCase()}>
              <h2>{item['Armor']}</h2>
              <img src={item['Armor Image']} />
              <p>{item.Description}</p>
              <p><span>Defense:</span> {item.Defense}</p>
              <p><span>Effect:</span> {item.Effect}</p>
            </div>
          )
        })}
        {this.state.legArmor.map((item, i) => {
          return (
            <div className="legArmor armors" key={item['Armor'].replace(' ', '-').toLowerCase()}>
              <h2>{item['Armor']}</h2>
              <img src={item['Armor Image']} />
              <p>{item.Description}</p>
              <p><span>Defense:</span> {item.Defense}</p>
              <p><span>Effect:</span> {item.Effect}</p>
            </div>
          )
        })}
      </div>
    )
  }
};

class Food extends React.Component {
  constructor() {
    super();
    this.state = {
      food: [],
    }
  };

  componentDidMount() {
    const dbref = firebase.database().ref('/Food');
    dbref.on('value', (snapshot) => {
      const foodData = snapshot.val();
      this.setState({
        food: foodData
      })
    })
  };

  render() {
    return (
      <div>
        {this.state.food.map((item, i) => {
          return (
            <div className="food" key={item['Meal'].replace(' ', '-').toLowerCase()}>
              <h2>{item['Meal']}</h2>
              <img src={item['Meal Image']} />
              <p>{item.Description}</p>
              <p><span>Ingredients:</span> {item.Ingredients}</p>
            </div>
          )
        })}
      </div>
    )
  }
};

class UserLoadout extends React.Component {
  constructor() {
    super();
    this.state = {
      userWeapon: [],
      userHeadArmor: [],
      userBodyArmor: [],
      userLegArmor: [],
      userFood: [],
    }
  }
  render() {
    return (
      <h2>Hello</h2>
    )
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showWeapons: false,
      showArmors: false,
      showFood: false,
      userSelect: false,
    };
  this.getWeapon = this.getWeapon.bind(this);
  this.getArmor = this.getArmor.bind(this);
  this.getFood = this.getFood.bind(this);
  // this.getUserSelect = this.getUserSelect.bind(this);
  }

  getWeapon () {
    if (this.state.showWeapons === false) {
      this.setState({
        showWeapons: true
      })
    } else {
      this.setState({
        showWeapons: false
      })
    }
  }

  getArmor () { 
    if (this.state.showArmors === false) {
      this.setState({
        showArmors: true
        })
    } else {
      this.setState({
        showArmors: false
      })
    }
  }

  getFood() {
    if (this.state.showFood === false) {
      this.setState({
        showFood: true
      })
    } else {
      this.setState({
        showFood: false
      })
    }
  }

  // getUserSelect() {
  //   if (this.state.userSelect === false) {
  //     this.setState({
  //       userSelect: true
  //     })
  //   } else {
  //     this.setState({
  //       userSelect: false
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        <header>
          <div className="wrapper">
            <h1>Breath of the Wild Loadouts</h1>
            <img src="./public/assets/zelda-botw-logo.png" alt=""/>
            <h3>Focus On Your Adventure</h3>
            <a>Start</a>
          </div>
        </header>
        <main>
          <div className="wrapper">
            <section className='weapons__section'>
              <div className='weapons__list'>
                <button onClick={this.getWeapon}>Weapons</button>
                {this.state.showWeapons ? <Weapon /> : null}
              </div>
            </section>
            <section className='armors__section'>
              <div className='armors__list'>
                <button onClick={this.getArmor}>Armors</button>
                {this.state.showArmors ? <Armor /> : null}
              </div>
            </section>
            <section className='food__section'>
              <div className='food__list'>
                <button onClick={this.getFood}>Food</button>
                {this.state.showFood ? <Food /> : null}
              </div>
            </section>
          </div>
          <div className="wrapper">
            <section>
              <div className="userLoadout">
                <UserLoadout />
              </div>  
            </section>
          </div>
        </main>
        <footer>
          <div className="wrapper">
            <h2>It's Dangerous to go Alone...</h2>
            <h4>Created By: Joey Deol</h4>
          </div>
        </footer>
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));
