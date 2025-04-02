import { createApp } from 'vue'
import App from './App.vue'


import { defineRule } from "vee-validate";
import { required, min, max } from "@vee-validate/rules";
import {parse} from "@typescript-eslint/parser";

defineRule('required', required);
defineRule('min', min);
defineRule('max', max);

defineRule('startsWithCapital', (value: string) => {

    if(value.length === 0) {
        return 'Input must not be an empty string';
    }

    // toma !== Toma
    if(value[0] !== value[0].toUpperCase()) {
        return 'String must start with a capital letter';
    }

    return true;
});

/**
 * minWords:3
 * -> Mora postojati barem 3 reci
 */
defineRule('minWords', (value: string, [minWords]: [number]) => {

    const wordCount = value.trim().split(' ').length;

    if(wordCount < minWords) {
        return 'There must be a minimum of '+minWords+' words';
    }


    return true;
});


createApp(App).mount('#app')
