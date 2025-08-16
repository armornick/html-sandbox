import { Application, Controller } from "../assets/stimulus-3.2.2.js";
window.Stimulus = Application.start();

Stimulus.register(
	"counter",
	class CounterController extends Controller {
		static targets = ["count"];

		connect() {
			this.count = 0;
			this.render();
		}

		increment() {
			this.count++;
			this.render();
		}

		render() {
			this.countTarget.textContent = this.count;
		}
	}
);

// not really a dropdown, but that's what the alpine tutorial calls it
Stimulus.register(
	"dropdown",
	class DropdownController extends Controller {
		static targets = ["content"];

		toggle() {
			const /** @type {HTMLElement} */ $el = this.contentTarget;
			if ($el.hasAttribute("hidden")) {
				$el.removeAttribute("hidden");
			} else {
				$el.setAttribute("hidden", "");
			}
		}
	}
);

Stimulus.register(
	"search",
	class SearchController extends Controller {
		static items = ["foo", "bar", "baz"];
		static targets = ["input", "output"];

		connect() {
			this.render();
		}

		// not how I would normally do it, but this rendering method
		// is most similar to the original alpinejs version
		render() {
			const /** @type {HTMLUListElement} */ $list = this.outputTarget;
			if ($list) {
				$list.textContent = "";
				const items = this.filteredItems;
				for (const item of items) {
					const $item = document.createElement("li");
					$item.textContent = item;
					$list.appendChild($item);
				}
			}
		}

		get searchQuery() {
			return this.inputTarget?.value ?? "";
		}

		get filteredItems() {
			const query = this.searchQuery;
			return SearchController.items.filter((item) =>
				item.startsWith(query)
			);
		}
	}
);
