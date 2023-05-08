<template>
    <v-overlay :value="value" opacity=".9" z-index="99999" class="text-center">
        <v-progress-circular
            :size="80"
            :width="2"
            color="#fff"
            indeterminate
            class="d-block mx-auto"
            ></v-progress-circular>
        <slot name="progress">
            <span class="d-block mt-6 ff-default fs-20 font-weight-thin letter-space-2 text-uppercase" v-if="text" v-text="text"></span>
            <span class="d-block mt-6 ff-default fs-20 font-weight-thin letter-space-2 text-uppercase" v-else v-t="'t_loading'"></span>
        </slot>
    </v-overlay>
</template>

<script>
    export default {

        props: {
            value: {
                type: Boolean,
                required: true
            },
            text: {
                type: String,
                required: false
            }
        }
        
    }
</script>