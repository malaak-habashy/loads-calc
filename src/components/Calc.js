import React, { useState, useRef } from "react"

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

function Calc(data) {

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const [inputList, setInputList] = useState([{ name: "Choose Appliance", qty: "" }])
    const [results, setResults] = useState('')


    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target
        const list = [...inputList]
        list[index][name] = value
        setInputList(list)
    }

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList]
        list.splice(index, 1)
        setInputList(list)
    }


    // handle click event of the Add button
    const handleAddClick = () => {

        const apps = [...inputList]
        const i = apps.length - 1

        if (apps[i].name !== "Choose Appliance" && apps[i].qty !== "") {
            setInputList([...inputList, { name: "Choose Appliance", qty: "" }])

            executeScroll()

        } else {
            window.alert('Please Enter Appliance & Quantity')
        }


    }

    const calcLoads = () => {

        setResults(<div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
        </div>)

        const apps = [...inputList]
        const i = apps.length - 1

        if (apps[i].name !== "Choose Appliance" && apps[i].qty !== "") {

            try {

                data['contract'].methods.calcAppLoads([...inputList]).call((err, result) => {

                    setResults(<span className="badge-pill badge-success p-1"><em>Your Loads = </em><strong>  {result / 1000}  </strong> <small> kilovolt-ampere (kVA)</small></span>)
                })

            } catch (error) {
                window.alert('Something Went Wrong')
            }

        } else {
            window.alert('Please Enter Appliance & Quantity')
        }
    }

    return (

        <div className="Calc container m-1">
            <h3 className="m-4">Loads Calculator</h3>
            <form onSubmit={(event) => {
                event.preventDefault()
                calcLoads()
            }}>

                {inputList.map((app, i) => {
                    return (
                        <div key={i} className="form-group p-3">

                            <div className="col-sm-4 p-2">
                                <select className="custom-select" name="name" required value={app.name} onChange={e => handleInputChange(e, i)}>
                                    <option disabled>Choose Appliance</option>
                                    {data['apps'].map((name) => <option key={name}>{name}</option>)}
                                </select>
                            </div>

                            <div className="col-sm-4 p-2">
                                <input className="form-control" type="number" name="qty" min="1" placeholder="Quantity" required value={app.qty} onChange={e => handleInputChange(e, i)}></input>
                            </div>

                            <div className="col-sm-4 p-2">
                                {inputList.length !== 1 && <button
                                    className="btn btn-light m-2"
                                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                                {inputList.length - 1 === i && <button className="btn btn-light m-2" onClick={handleAddClick}>Add More</button>}
                            </div>

                        </div>
                    )
                })}

                <button type="submit" className="btn btn-primary m-4"> Calculate Loads</button>

            </form>

            <div ref={myRef}>
                {results}
            </div>

        </div>
    )
}

export default Calc