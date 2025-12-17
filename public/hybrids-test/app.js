import { define, html } from "./hybrids@9.1.21.mjs";

const randomInt = (max = 666) => Math.round(Math.random() * max);

(() => {
	function randomizeNumber(host) {
		host.value = randomInt();
	}

	define({
		tag: "number-generator",
		value: 0,
		render: ({ value }) => html`
			<div class="number">${value}</div>
			<div>
				<button onclick=${randomizeNumber}>Randomize</button>
			</div>
		`,
	});
})();

(() => {
	function setBillAmount(host, event) {
		host.amount = event.target.value;
	}

	function setTipPercent(percent) {
		return function eventHandler(host) {
			host.percent = percent;
		};
	}

	define({
		tag: "tip-calculator",
		id: 0,
		amount: 0,
		percent: 5,
		render: ({ id, percent, amount }) => {
			const tipAmount = amount * (percent / 100);
			const totalAmount = amount + tipAmount;

			return html`
				<div class="field">
					<label for="${"amount-" + id}">Bill Amount:</label>
					<input
						type="number"
						id="${"amount-" + id}"
						class="amount"
						defaultValue="${amount}"
						oninput=${setBillAmount}
					/>
				</div>
				<div>
					<span>Tip Percentage:</span>
					<button onclick=${setTipPercent(5)}>5%</button>
					<button onclick=${setTipPercent(10)}>10%</button>
					<button onclick=${setTipPercent(15)}>15%</button>
					<button onclick=${setTipPercent(20)}>20%</button>
					<button onclick=${setTipPercent(25)}>25%</button>
				</div>
				<p>Tip Amount: $${tipAmount}</p>
				<p>Total Amount: $${totalAmount}</p>
			`;
		},
	});
})();

const rng = document.createElement("number-generator");
rng.value = randomInt();
document.querySelector("main").append(rng);

const calc = document.createElement("tip-calculator");
calc.amount = randomInt() * 10;
document.querySelector("main").append(calc);
