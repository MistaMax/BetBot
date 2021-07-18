
//set timeouts
jest.setTimeout(2);
it("Intentional Fail"){
    const bic = "hell"
    expect(bic).toEqual(null);
}