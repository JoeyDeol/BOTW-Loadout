import React from 'react';
import ReactDOM from 'react-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';


// FIREBASE CODE STARTS HERE!
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
// FIREBASE CODE ENDS HERE!

// WEAPON COMPONENT STARTS HERE!
class Weapon extends React.Component {
  constructor() {
    super();
    this.state = {
      weapons: [],
      userWeapon: [],
    }
  this.weaponSelect = this.weaponSelect.bind(this);
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

  weaponSelect(e) {
    const list = document.getElementsByClassName('weapons');
    for (let i = 0; i < list.length; i++) {
      if (list[i].className == 'weapons display_weapons') {
        list[i].classList.remove('display_weapons');
      }
      // else {
      //   list[i].classList.add('hide_weapons');
      // }
    }
    e.target.closest('.weapons').classList.add('display_weapons');

    const userSelectedWeaponName = e.target.value;    
    const weaponSearch = () => {
      const weaponOptions = this.state.weapons
      const selectedWeapon = weaponOptions.filter((weapon) => {
        return weapon['Weapon Name'] === `${userSelectedWeaponName}`
      })
      console.log(selectedWeapon);
      return selectedWeapon;
    }
    const weaponChoice = weaponSearch();
    this.setState({
      userWeapon: weaponChoice
    })
  }

  render() {
    console.log(this.state.userWeapon);
    return (
      <div>
        {this.state.weapons.map((item) => {
          const id = item['Weapon Name'].replace(' ', '-').toLowerCase();
            return (
              <div id={id}
                className='weapons' key={id}>
                <h2>{item['Weapon Name']}</h2>
                <img src={item['Weapon Image']} />
                <p>Attack: {item.Attack}</p>
                <p className="description">{item.Description}</p>
                <button onClick={(e) => this.weaponSelect(e)} value={item['Weapon Name']}>Select</button>
              </div>
            )
          })}  
      </div>
    )
  }
};
// WEAPON COMPONENT ENDS HERE!

// ARMOR COMPONENT STARTS HERE!
class Armor extends React.Component {
  constructor() {
    super();
    this.state = {
      armors: [],
    }
    this.armorSelect = this.armorSelect.bind(this);
  };

  componentDidMount() {
    const dbref = firebase.database().ref('/ArmorSets');
    dbref.on('value', (snapshot) => {
      const armorData = snapshot.val();
      this.setState({
        armors: armorData
      })
    })
  };

  armorSelect(e) {
    e.target.closest('.armors').classList.add('display_armors');
    const list = document.getElementsByClassName('armors');

    for (let i = 0; i < list.length; i++) {
      if (list[i].className == 'armors display_armors') {
      } else {
        list[i].classList.add('hide_armors');
      }
    }
  } 

  render() {
    return (
      <div>
        {this.state.armors.map((item, i) => {
          const id = item['Armor'].replace(' ', '-').toLowerCase();
          return (
            <div id={id} className="armors" key={id}>
              <h2>{item['Armor']}</h2>
              <img src={item['Armor Image']} />
              <p><span>Defense:</span> {item.Defense}</p>
              <p><span>Effect:</span> {item.Effect}</p>
              <p><span>Effect:</span> {item['Full Set Bonus']}</p>
              <p className='description'>{item.Description}</p>
              <button onClick={(e) => this.armorSelect(e)}>Select</button>
            </div>
          )
        })}
      </div>
    )
  }
};
// ARMOR COMPONENT ENDS HERE!

// ELIXIR COMPONENT STARTS HERE!
class Elixir extends React.Component {
  constructor() {
    super();
    this.state = {
      elixirs: [],
    }
    this.elixirSelect = this.elixirSelect.bind(this);
  };

  componentDidMount() {
    const dbref = firebase.database().ref('/Elixirs');
    dbref.on('value', (snapshot) => {
      const elixirData = snapshot.val();
      this.setState({
        elixirs: elixirData
      })
    })
  };

  elixirSelect(e) {
    e.target.closest('.elixir').classList.add('display_elixir');
    const list = document.getElementsByClassName('elixir');

    for (let i = 0; i < list.length; i++) {
      if (list[i].className == 'elixir display_elixir') {
      } else {
        list[i].classList.add('hide_elixir');
      }
    }
  } 

  render() {
    return (
      <div>
        {this.state.elixirs.map((item, i) => {
          const id = item['Elixir'].replace(' ', '-').toLowerCase();
          return (
            <div id={id} className="elixir" key={id}>
              <h2>{item['Elixir']}</h2>
              <img src={item['Elixir Image']} />
              <p><span>Effect:</span> {item.Effect}</p>
              <p><span>Ingredients:</span> {item.Ingredients}</p>
              <p className='description'>{item.Description}</p>
              <button onClick={(e) => this.elixirSelect(e)}>Select</button>
            </div>
          )
        })}
      </div>
    )
  }
};
// ELIXIR COMPONENT ENDS HERE!

// APP COMPONENT STARTS HERE!
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      showWeapons: false,
      showArmors: false,
      showElixir: false,
      userSelect: false,
    };
  this.displayWeapons = this.displayWeapons.bind(this);
  this.displayArmors = this.displayArmors.bind(this);
  this.displayElixirs = this.displayElixirs.bind(this);
  }

  displayWeapons () {
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

  displayArmors () { 
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

  displayElixirs () {
    if (this.state.showElixir === false) {
      this.setState({
        showElixir: true
      })
    } else {
      this.setState({
        showElixir: false
      })
    }
  }

  render() {
    return (
      <div>
        <header>
          <div className="wrapper">
            <h1>Breath of the Wild Loadouts</h1>
            <img src="./public/assets/zelda-botw-logo.png" alt=""/>
            <h3>Focus On Your Adventure</h3>
            <AnchorLink href="#loadoutStart">Start</AnchorLink>
          </div>
        </header>
        <main id="loadoutStart">
          <div className="wrapper">
            <section className='instructions__section'>
              <div className='instructions'>
                <h2>Select a Weapon, Armor Set, and an Elixir.</h2>
              </div>
            </section>
            <div className="loadout">
              <section className='weapons__section'>
                <div className='weapons__list'>
                  <button onClick={this.displayWeapons}>Weapons</button>
                  {this.state.showWeapons ? <Weapon /> : null}
                </div>
              </section>
              <section className='armors__section'>
                <div className='armors__list'>
                  <button onClick={this.displayArmors}>Armors</button>
                  {this.state.showArmors ? <Armor /> : null}
                </div>
              </section>
              <section className='elixir__section'>
                <div className='elixir__list'>
                  <button onClick={this.displayElixirs}>Elixirs</button>
                  {this.state.showElixir ? <Elixir /> : null}
                </div>
              </section>
            </div>
            <AnchorLink href="#loadoutEnd">And Remember...</AnchorLink>
          </div>
        </main>
        <footer>
          <div id="loadoutEnd" className="wrapper">
            <h2>It's Dangerous to go Alone...</h2>
            <h4>Created By: Joey Deol</h4>
          </div>
        </footer>
      </div>
    )
  }
};
// APP COMPONENT ENDS HERE!

ReactDOM.render(<App />, document.getElementById('app'));
