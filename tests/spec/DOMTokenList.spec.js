describe("DOMTokenList tests against real instance", function() {
    var element,
        testTokenList,
        realTokenList;

    function compareTokens() {
        expect(testTokenList.length).toBe(realTokenList.length);
        expect("" + testTokenList).toBe("" + realTokenList);
        expect(element.getAttribute("class")).toEqual(element.getAttribute("dummyTokenList"));
        for (var i = 0; i < Math.max(realTokenList.length, testTokenList.length); i++) {
            expect(realTokenList[i]).toEqual(testTokenList[i]);
        }
    }
    beforeEach(function() {
        element = document.createElement("div");
        element.setAttribute("class", "");
        element.setAttribute("dummyTokenList", "");
        testTokenList = new window.DOMTokenList(element, "dummyTokenList");
        realTokenList = element.classList;
    });
    it("should compare when initialized", function() {
        compareTokens();
    });
    it("it's string value should be correct when adding one class", function() {
        expect(realTokenList.add("first")).toBe(testTokenList.add("first"));
        compareTokens();

    });
    it("it's string value should be correct when adding two classes", function() {
        realTokenList.add("first");
        testTokenList.add("first");
        realTokenList.add("second");
        testTokenList.add("second");
        compareTokens();
    });
    it("should be able to add and remove the same value", function() {
        realTokenList.add("first");
        testTokenList.add("first");
        expect(realTokenList.remove("remove")).toBe(testTokenList.remove("remove"));
        compareTokens();
    });
    it("toggle should work (remove)", function() {
        realTokenList.add("first");
        testTokenList.add("first");
        expect(realTokenList.toggle("first")).toBe(testTokenList.toggle("first"));
        compareTokens();
    });
    it("toggle should work (add)", function() {
        realTokenList.toggle("first");
        testTokenList.toggle("first");
        compareTokens();
    })
    it("contains should work", function() {
        realTokenList.add("first");
        testTokenList.add("first");
        expect(realTokenList.contains("first")).toBe(testTokenList.contains("first"));
        realTokenList.add("second");
        testTokenList.add("second");
        expect(realTokenList.contains("second")).toBe(testTokenList.contains("second"));
        realTokenList.remove("first");
        testTokenList.remove("first");
        expect(realTokenList.contains("first")).toBe(testTokenList.contains("first"));
        compareTokens();
    });





});