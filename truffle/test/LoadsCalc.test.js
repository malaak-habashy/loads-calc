const LoadsCalc = artifacts.require("LoadsCalc")

require('chai')
    .use(require('chai-as-promised'))
    .should()


contract('LoadsCalc', (accounts) => {

    let loadsCalc, appliances

    before(async () => {
        loadsCalc = await LoadsCalc.new()
    })


    describe('LoadsCalc deployment', async () => {
        it('list of appliances', async () => {

            appliances = await loadsCalc.getAppNames()
            assert.equal(appliances.length, 13)
        })
    })

    describe('calcAppLoads()', async () => {

        it('calculate loads for array of appliances', async () => {

            const slctdApps = [{name:appliances[1],qty:2}, {name:appliances[5],qty:3}]
            const loads = await loadsCalc.calcAppLoads(slctdApps)
            assert.equal(loads, 11000)
        })
    })

    describe('addAppliance()', async () => {

        it('add new appliance', async () => {

            const result = await loadsCalc.addAppliance("Stand Fan", 500)
            assert.equal(result.receipt.status, true)
            appliances = await loadsCalc.getAppNames()
            assert.equal(appliances.length, 14)
        })
    })


})