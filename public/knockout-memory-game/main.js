/// <reference path="../assets/knockout.d.ts" />

const IMAGES = [
	"https://images.unsplash.com/photo-1626808642875-0aa545482dfb",
	"https://images.unsplash.com/photo-1546842931-886c185b4c8c",
	"https://images.unsplash.com/photo-1520763185298-1b434c919102",
	"https://images.unsplash.com/photo-1442458017215-285b83f65851",
	"https://images.unsplash.com/photo-1496483648148-47c686dc86a8",
	"https://images.unsplash.com/photo-1591181520189-abcb0735c65d",
];

// --------------------------------------------------------------------------------

const random = (max) => Math.round(Math.random() * max);

const MemoryGame = {
	getEmptyGrid(numCells) {
		function* range(numCells) {
			for (let i = 0; i < numCells; i++) {
				yield 0;
			}
		}

		return [...range(numCells)];
	},

	buildImageGrid() {
		const numImages = IMAGES.length;
		const numCells = numImages * 2;
		const grid = this.getEmptyGrid(numCells);
		for (let imageIdx = 0; imageIdx < numImages; imageIdx++) {
			// console.log("generating for image at index", imageIdx);
			let firstIdx = 0,
				secondIdx = 0;

			do {
				firstIdx = random(numCells);
				// console.log(`firstIndex = ${firstIdx}`);
				if (grid[firstIdx] === 0) {
					grid[firstIdx] = imageIdx + 1;
					firstIdx++;
				} else {
					firstIdx = 0;
				}
			} while (firstIdx === 0);

			do {
				secondIdx = random(numCells);
				// console.log(`secondIndex = ${secondIdx}`);
				if (grid[secondIdx] === 0) {
					grid[secondIdx] = imageIdx + 1;
					secondIdx++;
				} else {
					secondIdx = 0;
				}
			} while (secondIdx === 0);
		}
		console.log("grid:", grid);
		return grid;
	},
};

// --------------------------------------------------------------------------------

class DialogModel {
	message = ko.observable("");
	action = ko.observable("");

	constructor(viewModel) {
		this.viewModel = viewModel;
		this.element = document.querySelector("dialog");
	}

	show() {
		this.element.showModal();
	}

	close() {
		this.element.close(true);
		this.viewModel.reset();
	}

	get returnValue() {
		return this.element.returnValue;
	}

	get dialogStyles() {
		return {
			// "min-width": "60vw",
			// "min-height": "50vh",
		};
	}

	get buttonStyles() {
		return {
			"background-color": "#bbb",
			border: "1px solid #555",
			"border-radius": "5px",
			padding: ".25rem 1rem",
			font: "inherit",
		};
	}
}

// --------------------------------------------------------------------------------

class GameImage {
	constructor(value) {
		this.value = value - 1;
		this.state = ko.observable("idle");
		this.shouldShow = ko.pureComputed(() => this.state() !== "idle");
	}

	get image() {
		return IMAGES[this.value];
	}

	get styles() {
		return {
			cursor: "pointer",
			height: "25vh",
		};
	}

	get placeholderStyles() {
		return {
			height: "100%",
			width: "100%",
			"background-image":
				// "linear-gradient(to bottom left, #555, #ccc, #eee)",
				"linear-gradient(to bottom, #00416A, #E4E5E6)", // https://www.gradientjoy.com/380x250?id=0
		};
	}

	get imageStyles() {
		return {
			height: "100%",
			width: "100%",
			"object-fit": "cover",
			filter:
				this.state() === "correct" ? "grayscale(1)" : "grayscale(0)",
		};
	}
}

// --------------------------------------------------------------------------------

class ViewModel {
	running = true;
	dialogModel = new DialogModel(this);

	constructor() {
		const memoryGrid = MemoryGame.buildImageGrid().map(
			(val) => new GameImage(val)
		);
		this.imageGrid = ko.observableArray(memoryGrid);
		this.selections = {
			first: ko.observable(-1),
			second: ko.observable(-1),
		};
	}

	image(index) {
		const image = this.imageGrid().at(index());
		return image;
	}

	gridStyles = () => ({
		display: "grid",
		"grid-template-columns": "repeat(auto-fit, minmax(20rem, 1fr))",
		gap: "1rem",
	});

	reset() {
		const memoryGrid = MemoryGame.buildImageGrid().map(
			(val) => new GameImage(val)
		);
		this.imageGrid(memoryGrid);
		this.selections.first(-1);
		this.selections.second(-1);
	}

	select(index) {
		if (!this.running) {
			return;
		}

		console.log("selected:", index());
		const selectedImage = this.image(index);
		if (selectedImage.state() === "correct") {
			// already correct image: do nothing
			return;
		}
		if (this.selections.first() < 0) {
			this.selections.first(index);
			selectedImage.state("selected");
		} else if (this.selections.first() === index) {
			// selected same element: do nothing?
		} else if (this.selections.second() <= 0) {
			const firstImage = this.image(this.selections.first());

			if (firstImage.value === selectedImage.value) {
				console.log("correct pairing selected 👍");
				firstImage.state("correct");
				selectedImage.state("correct");

				if (
					!this.imageGrid().find((img) => img.state() !== "correct")
				) {
					this.dialogModel.message("You win!");
					this.dialogModel.action("Play again");
					this.dialogModel.show();
				}
			} else {
				console.log("incorrect pairing selected 🥺");
				selectedImage.state("selected");
				this.running = false;
				setTimeout(() => {
					firstImage.state("idle");
					selectedImage.state("idle");
					this.running = true;
				}, 650);
			}
			this.selections.first(-1);
			this.selections.second(-1);
		} else {
			console.error("invalid selection");
		}
	}
}

ko.applyBindings(new ViewModel());
