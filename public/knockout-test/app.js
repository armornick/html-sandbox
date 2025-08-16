const main = async () => {
	const { default: cards } = await import("./data.js");
	// console.log(cards);

	const viewModel = {
		message: "There is no spoon!",
		cards,
	};
	// console.log("viewModel:", viewModel);

	ko.applyBindings(viewModel);
};

main();
