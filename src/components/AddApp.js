import React, { Component } from 'react'


class AddApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
  }


  async addAppliance(name, load) {

    const contract = this.props.contract
    const address = this.props.address

    this.setState({
      result: <div><div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div><span>&nbsp;&nbsp;&nbsp;&nbsp;Working.... It may take a minute</span></div>
    })

    try {

      await contract.methods.addAppliance(name, load).send({ from: address }).on('receipt', (receipt) => {

        this.setState({ result: <span className="badge-pill badge-success p-1"><strong>Success: </strong> Please refresh to see the new Appliance</span> })

      })

    } catch (error) {

      window.alert('Something Went Wrong')
    }

  }

  render() {
    return (

      <div className="AddApp container m-1">

        <h4 className="m-4"> Add New Appliance</h4>

        <form onSubmit={(event) => {
          event.preventDefault()

          this.addAppliance(this.name.value, this.load.value * 1000)

        }}>
          <div className="add-app form-group p-3">

            <div className="col-sm-4 p-2">
              <input id="app-name" type="text" className="form-control" name="app" placeholder="Name"
                required ref={(name) => { this.name = name }}></input>
            </div>


            <div className="col-sm-4 p-2">
              <input id="app-load" type="decimal" className="form-control" name="load" min="0"
                placeholder="Load" required ref={(load) => { this.load = load }}></input>
              <small style={{ float: 'left' }} >kilovolt-ampere (kVA)</small>
            </div>


          </div>
          <button type="submit" id="addApp" className="btn btn-primary m-4"> Add appliance</button>
        </form>

        <div>
          {this.state.result}
        </div>
      </div>


    )
  }
}

export default AddApp;


