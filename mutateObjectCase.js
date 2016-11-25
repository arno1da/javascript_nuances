/*
Here we can see since this is a sting it is passed by value and not reference.
*/
mutateProperty = (property, newPropertyValue) => {
	property = newPropertyValue
};

testCase1 = () => {
	let testObject1 = {
		propertyOne: {
			valueOne: "Starting Value"
		}
	};
	console.log("value before")
	console.log(testObject1.propertyOne.valueOne)
	mutateProperty(testObject1.propertyOne.valueOne, "New Value");
	console.log("Value after")
	console.log(testObject1.propertyOne.valueOne);
};

// testCase1();

/*
If we want to mutate we need to pass the partial object
*/

mutatePropertyRevised = (objectCase, property, newPropertyValue) => {
	objectCase[property] = newPropertyValue;
};

testCase2 = () => {
	let testObject2 = {
		propertyOne: {
			valueOne: "Starting Value"
		}
	};
	console.log("value before")
	console.log(testObject2.propertyOne.valueOne)
	mutatePropertyRevised(testObject2.propertyOne, 'valueOne', "New Value");
	console.log("Value after")
	console.log(testObject2.propertyOne.valueOne);
};

testCase2();