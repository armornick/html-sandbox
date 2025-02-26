document.addEventListener("alpine:init", () => {
	Alpine.data("counter", () => ({
		count: 0,
		name: "Luigi",

		logCount() {
			console.log(this.count);
		},
	}));
});
