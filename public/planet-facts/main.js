import { createApp } from "./vue-3.5.17.esm-browser.js";

const Card = {
	props: ["title", "content"],
	template: `
        <div class="card">
            <h3 class="text-sm font-light text-muted">
                {{ title }}
            </h3>
            <p class="text-lg font-semibold">
                <slot />
            </p>
        </div>
    `,
};

const NavBar = {
	props: ["planets"],
	emits: ["select"],
	template: `
        <header class="container flex justify-between">
            <h1 class="logo text-upper text-md font-semibold">
                The Planets
            </h1>
            <nav class="flex gap-4">
                <a
                    v-for="planet in planets"
                    href="#"
                    tabindex="0"
                    class="text-upper text-muted text-xs font-medium"
                    @click="$emit('select', planet)"
                >
                    {{ planet.name }}
                </a>
            </nav>
        </header>
    `,
};

const App = {
	components: {
		NavBar,
		Card,
	},
	data() {
		return {
			planets: [],
			selectedPlanet: null,
			selectedTab: null,
		};
	},
	methods: {
		selectPlanet(planet) {
			this.selectedPlanet = planet;
			this.selectedTab = null;
		},
	},
	created() {
		fetch("./planets.json")
			.then((response) => response.json())
			.then((data) => {
				this.planets = data;
				this.selectedPlanet = this.planets[0];
			});
	},
};

createApp(App).mount("#app");
