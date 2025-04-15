class MobileMenu extends HTMLElement {
	constructor() {
		super();
		this.$toggle = this.querySelector(".toggle");
		const navSelector = this.getAttribute("nav");
		this.$menu = document.querySelector(navSelector);
		this.init();
	}

	init() {
		let navId = this.$menu.id;
		if (!navId) {
			navId = crypto.randomUUID();
			this.$menu.id = navId;
		}
		this.$toggle.setAttribute("aria-controls", navId);
		this.$menu.setAttribute("aria-expanded", "false");

		this.$toggle.classList.add("js-enabled");

		this.$toggle.addEventListener("click", (e) => this.toggleMenu());
	}

	toggleMenu() {
		const oldValue = this.$menu.getAttribute("aria-expanded");
		const newValue = oldValue === "false" ? "true" : "false";
		this.$menu.setAttribute("aria-expanded", newValue);
	}
}

customElements.define("mobile-menu", MobileMenu);
