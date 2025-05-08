document.addEventListener("alpine:init", () => {
	Alpine.data("animals", () => ({
		animals: [
			{
				name: "Narwhal",
				formalName: "Monodon monoceros",
				family: "Monodontidae",
				image: "/assets/animals/narwhal.png",
				description:
					"The narwhal (Monodon monoceros) is a species of toothed whale native to the Arctic. It is the only member of the genus Monodon and one of two living representatives of the family Monodontidae. The narwhal is a stocky cetacean with a relatively blunt snout, a large melon, and a shallow ridge in place of a dorsal fin. Males of this species have a large (1.5–3.0 m (4 ft 11 in – 9 ft 10 in)) long tusk, which is a protruding left canine thought to function as a weapon, a tool for feeding, in attracting mates or sensing water salinity. Specially adapted slow-twitch muscles, along with the jointed neck vertebrae and shallow dorsal ridge allow for easy movement through the Arctic environment, where the narwhal spends extended periods at great depths. The narwhal's geographic range overlaps with that of the similarly built and closely related beluga whale, and the animals are known to interbreed.",
			},
			{
				name: "Brown-throated sloth",
				formalName: "Bradypus variegatus",
				family: "Bradypodidae",
				image: "/assets/animals/sloth.png",
				description:
					"The brown-throated sloth (Bradypus variegatus) is a species of three-toed sloth found in the Neotropical realm of Central and South America. It is the most common of the four species of three-toed sloth, and is found in the forests of South and Central America.",
			},
			{
				name: "Russell's viper",
				formalName: "Daboia russelii",
				family: "Viperidae",
				image: "/assets/animals/snake.png",
				description:
					"Russell's viper (Daboia russelii) is a highly venomous snake in the family Viperidae native to South Asia. It was described in 1797 by George Shaw and Frederick Polydore Nodder. It is named after Patrick Russell. Known for its extremely painful bite, it is considered one of the most dangerous big four snakes in India.",
			},
			{
				name: "Mallard",
				formalName: "Anas platyrhynchos",
				family: "Anatidae",
				image: "/assets/animals/duck.png",
				description:
					"The mallard (/ˈmælɑːrd, ˈmælərd/) or wild duck (Anas platyrhynchos) is a dabbling duck that breeds throughout the temperate and subtropical Americas, Eurasia, and North Africa. It has been introduced to New Zealand, Australia, Peru, Brazil, Uruguay, Argentina, Chile, Colombia, the Falkland Islands, and South Africa. Belonging to the subfamily Anatinae of the waterfowl family Anatidae, mallards live in wetlands, eat water plants and small animals, and are social animals preferring to congregate in groups or flocks of varying sizes.",
			},
			{
				name: "Dog",
				formalName: "Canis familiaris",
				family: "Canidae",
				image: "/assets/animals/dog.png",
				description:
					"The dog (Canis familiaris or Canis lupus familiaris) is a domesticated descendant of the gray wolf. Also called the domestic dog, it was selectively bred from an extinct population of wolves during the Late Pleistocene by hunter-gatherers. The dog was the first species to be domesticated by humans, over 14,000 years ago and before the development of agriculture. Due to their long association with humans, dogs have gained the ability to thrive on a starch-rich diet that would be inadequate for other canids.",
			},
			{
				name: "Emperor penguin",
				formalName: "Aptenodytes forsteri",
				family: "Spheniscidae",
				image: "/assets/animals/penguin.png",
				description:
					"The emperor penguin (Aptenodytes forsteri) is the tallest and heaviest of all living penguin species and is endemic to Antarctica. The male and female are similar in plumage and size, reaching 100 cm (39 in) in length and weighing from 22 to 45 kg (49 to 99 lb). Feathers of the head and back are black and sharply delineated from the white belly, pale-yellow breast and bright-yellow ear patches.",
			},
			/*
            {
                name: '',
                formalName: '',
                family: '',
                image: '/assets/animals/',
                description: '',
            },
            */
		],
	}));
});
