const chai = require('chai');
const expect = chai.expect;

//Async test function for the reduction.
let asyncTestFunction = (resultOrderArray, item) => {
	return new Promise((resolve , reject)=> {
		setTimeout(()=> {
			console.log(item.value + " done.")
			resultOrderArray.push(item.value);
			resolve(resultOrderArray);
		}, item.timeout);
	})
};


//Q promise all global reference
let globalTestArray = [];
let asyncTestFunctionReferenceGlobal = (item)=> {
	return new Promise((resolve ,reject)=> {
		setTimeout(()=> {
			console.log(item.value + " done.")
			globalTestArray.push(item.value);
			resolve();
		}, item.timeout);
	});
}


//Our two promise chain implementations;
let testPromiseChainSync = (arrayOfItems) => {
	return arrayOfItems.reduce(function(promise, item) {
		return promise.then((previousResult)=> {
			return asyncTestFunction(previousResult, item);
		})
	}, Promise.resolve([]))
};


let testPromiseChainAsync = (arrayOfItems) => {
	return Promise.all(arrayOfItems.map((value)=> {
		return asyncTestFunctionReferenceGlobal(value);
	}));
};


describe("Promise chain variations." , function() {
	it('Reduce implementation should complete in order regardless of timeout.', function(done){
		this.timeout(10000);
		firstTestArray = [{value: 'a', timeout: 1000}, {value: 'b', timeout: 0}, {value: 'c', timeout:2000}];

		testPromiseChainSync(firstTestArray)
		.then((lastResult)=> {
			console.log(lastResult);
			expect(lastResult).to.eql(['a', 'b', 'c']);
			console.log('completed test.');
			done();
		})
	});

	it('Promise all order should finish in regards to the timeout.', function(done) {
		this.timeout(10000);
		secondTestArray = [{value: 'a', timeout: 1000}, {value: 'b', timeout: 0}, {value: 'c', timeout:2000}];
		testPromiseChainAsync(secondTestArray)
		.then(()=> {
			console.log(globalTestArray);
			expect(globalTestArray).to.eql(['b','a','c']);
			console.log('completed test.');
			done();
		})
	});

});
