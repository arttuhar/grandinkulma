import React, { Component } from 'react';
import Timetable from './components/Timetable';
import { getStopData } from './components/Request';
import './components/App.css';

class App extends Component {
  constructor() {
    super()
    this.state = { stopData: [] }
  }

  // Päivitetään seuraavien lähtöjen listaus minuutin välein
  async componentDidMount() {
    await this.getStopData();
    setInterval(async() => {
      await this.getStopData();
    }, 60000);
  }

  getStopData = async () => {
    const response = await getStopData();
    this.setState({stopData: response.data.stops})
  }

  render() {
    return (
      <div className='App'>
        <Timetable stopData={this.state.stopData} />
      </div>
    )
  }
}

export default App;
