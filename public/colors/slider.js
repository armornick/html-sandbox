const sliderTmpl = document.createElement('template');
sliderTmpl.innerHTML = `
<style>
    .slider-container {
        display: flex;
        gap: .5rem;

        & > input[type="text"] {
            flex: 1;
        }
        
        & > input[type="range"] {
            flex: 3;
        }
    }
</style>
<div class="slider-container">
    <input type="text">
    <input type="range">
</div>
`

class SliderElement extends HTMLElement {
  
    /** @type {HTMLInputElement} */ $rangeInput;
    /** @type {HTMLInputElement} */ $valueInput;

    value = 0;
    min = 0;
    max = 100;

    constructor() {
        super();
        this.appendChild(sliderTmpl.content.cloneNode(true));

        this.max = this.hasAttribute('max') ? Number(this.getAttribute('max')) : this.max;
        this.min = this.hasAttribute('min') ? Number(this.getAttribute('min')) : this.min;
        this.$rangeInput = this.querySelector('input[type="range"]');
        this.$valueInput = this.querySelector('input[type="text"]');

        this.$rangeInput.value = this.value;
        this.$rangeInput.max = this.max;
        this.$rangeInput.min = this.min;
        this.$valueInput.value = this.value;

        this.$rangeInput.addEventListener('input', () => {
            this.value = this.$rangeInput.value;
            this.$valueInput.value = this.value;
            // this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value } }));
        });

        this.$valueInput.addEventListener('input', () => {
            const newValue = Number(this.$valueInput.value);
            if (this.max >= newValue && newValue >= this.min) {
                this.value = newValue;
                this.$rangeInput.value = this.value;
                // this.dispatchEvent(new CustomEvent('input', { detail: { value: this.value } }));
            } else {
                this.$valueInput.value = this.value;
            }
        })
    }
  
}

customElements.define('x-slider', SliderElement);

