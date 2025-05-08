import { createApp } from "./petite-vue-0.4.1.es.js";

// ----------------------------------------------------------------

const rollD6 = () => Math.round(Math.random() * 5) + 1;

const sum = (/** @type {number[]} */ numbers) => {
	let total = 0;
	for (const num of numbers) {
		total += num;
	}
	return total;
};

const average = (/** @type {number[]} */ numbers) => {
	const len = numbers.length;
	const total = sum(numbers);
	return total / len;
};

const roll3D6 = () => {
	const rolls = [];
	for (let i = 0; i < 3; i++) {
		rolls.push(rollD6());
	}
	// console.log("roll 3D6:", rolls);
	return sum(rolls);
};

const roll4D6 = () => {
	const rolls = [];
	for (let i = 0; i < 4; i++) {
		rolls.push(rollD6());
	}
	rolls.sort((a, b) => b - a); // sort from highest to lowest
	// console.log("roll 4D6:", rolls);
	rolls.pop(); // remove last element
	return sum(rolls);
};

// class requirements based on OSRIC
// https://osricrpg.com/get.php
class ClassChecker {
	static classMap = {
		assassin: { str: 12, dex: 12, con: 6, int: 11, wis: 6 },
		cleric: { str: 6, dex: 3, con: 6, int: 6, wis: 9, cha: 6 },
		druid: { str: 6, dex: 6, con: 6, int: 6, wis: 12, cha: 16 },
		fighter: { str: 9, dex: 6, con: 7, int: 3, wis: 6, cha: 6 },
		illusionist: { str: 6, dex: 16, int: 15, wis: 6, cha: 6 },
		mage: { str: 3, dex: 6, int: 9, wis: 6, con: 6, cha: 6 },
		paladin: { str: 12, dex: 6, con: 9, int: 9, wis: 13, cha: 17 },
		ranger: { str: 13, dex: 6, con: 14, int: 13, wis: 14, cha: 6 },
		thief: { str: 6, dex: 9, con: 6, int: 6, cha: 6 },
	};

	static isClassApplicable(attrs, cls) {
		const reqs = Object.entries(cls);
		for (const [attr, minimum] of reqs) {
			const actual = attrs[attr] ?? 0;
			if (minimum > actual) {
				return false;
			}
		}
		return true;
	}

	static getApplicableClasses(attrs) {
		const result = [];
		const classes = Object.entries(this.classMap);
		for (const [name, reqs] of classes) {
			if (this.isClassApplicable(attrs, reqs)) {
				result.push(name);
			}
		}
		return result;
	}
}

class Character {
	attrs = {
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0,
	};
	_validClasses = null;

	constructor(rollMode) {
		this.rollMode = rollMode;
	}

	get total() {
		return sum(Object.values(this.attrs));
	}

	get average() {
		return Math.round(this.total / 6);
	}

	get validClasses() {
		if (!this._validClasses) {
			this._validClasses = ClassChecker.getApplicableClasses(this.attrs);
		}
		return this._validClasses;
	}

	toString() {
		return JSON.stringify(this.attrs);
	}
}

// ----------------------------------------------------------------

createApp({
	rollMode: "3D6",
	characters: [],

	roll() {
		if (this.rollMode === "3D6") {
			return roll3D6();
		} else if (this.rollMode === "4D6") {
			return roll4D6();
		} else {
			throw new Error(`invalid roll mode: ${this.rollMode}`);
		}
	},

	rollCharacter() {
		const char = new Character(this.rollMode);
		char.attrs.str = this.roll();
		char.attrs.dex = this.roll();
		char.attrs.con = this.roll();
		char.attrs.int = this.roll();
		char.attrs.wis = this.roll();
		char.attrs.cha = this.roll();
		console.log(`rolled character (mode ${this.rollMode}): ${char}`);
		this.characters.push(char);
	},

	rollOnce() {
		this.rollCharacter();
	},

	rollTen() {
		for (let i = 0; i < 10; i++) {
			this.rollCharacter();
		}
	},
}).mount();
