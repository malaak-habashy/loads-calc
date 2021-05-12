import React, { Component } from 'react'
import Web3 from 'web3'
import Contract from './truffle-build/LoadsCalc.json'
import AddApp from './components/AddApp'
import Calc from './components/Calc'
import './App.css'

const Provider = require('@truffle/hdwallet-provider')
const url = 'https://ropsten.infura.io/v3/YOUR_KEY'
const address = 'ACCOUNT_ADDRESS'
const privateKey = 'ACCOUNT_PRIVATE_KEY'


// -------------------------------//


class App extends Component {

  async componentWillMount() {

    try {
      await this.loadCntrData()
      this.setState({ showing: 'calc' })
    } catch (error) {
      window.alert('Something Went Wrong')
    }

  }

  async loadCntrData() {

    const provider = new Provider(privateKey, url)
    const web3 = new Web3(provider)
    const networkId = await web3.eth.net.getId()

    const contract = new web3.eth.Contract(Contract.abi, Contract.networks[networkId].address)

    let apps = await contract.methods.getAppNames().call()

    this.setState({ contract, apps, address })

  }

  constructor(props) {
    super(props)
    this.state = {
      showing: 'loading',
      contract: {},
      address: {},
      apps: {}
    }
  }


  render() {

    const fContent = <div className="alert alert-primary m-5" role="alert">
      I created this dApp with (React.js, Ethereum, Solidity, Truffle, Ganache, Web3.js). This dApp is hosted on Ropsten.<br />
    Source Code: <a href="https://github.com/malaak-habashy/loads-calc" target="_blank" rel="noopener noreferrer">HERE</a>
    </div>

    const handleNavBtn = () => {

      if (this.state.showing === 'calc') {

        this.setState({ showing: 'addApp' })

      } else if (this.state.showing === 'addApp') {

        this.setState({ showing: 'calc' })

      } else {

        this.setState({ showing: 'loading' })

      }

    }

    let content, navBtn, footer


    if (this.state.showing === 'loading') {

      content = <p id="loader" className="text-center">Loading...</p>

    } else if (this.state.showing === 'calc') {

      navBtn = <button type="button" className="btn btn-outline-primary m-2" onClick={handleNavBtn} >Add New Appliance</button>
      footer = fContent

      content = <Calc contract={this.state.contract} apps={this.state.apps} />

    } else {

      navBtn = <button type="button" className="btn btn-outline-primary m-2" onClick={handleNavBtn} >Calculate Loads</button>
      footer = fContent

      content = <AddApp contract={this.state.contract} address={this.state.address} apps={this.state.apps} />

    }

    return (

      <div className="App">

        {navBtn}

        {content}

        {footer}

      </div>
    )

  }

}

export default App

