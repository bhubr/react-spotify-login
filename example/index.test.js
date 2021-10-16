const rewire = require("rewire")
const index = rewire("./index")
const onSuccess = index.__get__("onSuccess")
const onFailure = index.__get__("onFailure")
// @ponicode
describe("onSuccess", () => {
    test("0", () => {
        let callFunction = () => {
            onSuccess("completed")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            onSuccess("canceled")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            onSuccess("draft")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            onSuccess("done")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            onSuccess("pending")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            onSuccess(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("onFailure", () => {
    test("0", () => {
        let callFunction = () => {
            onFailure(429)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            onFailure(500)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            onFailure(200)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            onFailure(404)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            onFailure(400)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            onFailure(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
