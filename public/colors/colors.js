
const hwb = {
    hueSlider: document.querySelector('.hwb-hue-slider'),
    whitenessSlider: document.querySelector('.hwb-whiteness-slider'),
    blacknessSlider: document.querySelector('.hwb-blackness-slider'),
    demo: document.querySelector('.hwb-demo'),
};

hwb.hueSlider.addEventListener('input', e => {
    hwb.demo.style.setProperty('--hue', hwb.hueSlider.value);
})

hwb.whitenessSlider.addEventListener('input', e => {
    hwb.demo.style.setProperty('--whiteness', hwb.whitenessSlider.value);
})

hwb.blacknessSlider.addEventListener('input', e => {
    hwb.demo.style.setProperty('--blackness', hwb.blacknessSlider.value);
})

/* -------------------------------------------------------------------------- */

const oklab = {
    lightnessSlider: document.querySelector('.oklab-lightness-slider'),
    aSlider: document.querySelector('.oklab-a-slider'),
    bSlider: document.querySelector('.oklab-b-slider'),
    demo: document.querySelector('.oklab-demo'),
};

oklab.lightnessSlider.addEventListener('input', e => {
    oklab.demo.style.setProperty('--lightness', oklab.lightnessSlider.value + '%');
})

oklab.aSlider.addEventListener('input', e => {
    oklab.demo.style.setProperty('--a-axis', oklab.aSlider.value + '%');
})

oklab.bSlider.addEventListener('input', e => {
    oklab.demo.style.setProperty('--b-axis', oklab.bSlider.value + '%');
})

