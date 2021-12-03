<template>

    <b-form inline @submit="onSubmit">
        <label for="inline-form-input-name">API key:</label>
        <b-form-input
                id="inline-form-input-name"
                class="mb-2"
                placeholder="(api key goes here)"
                type="text"
                v-model="key"
                :state="keyStatus"
        ></b-form-input>

        <b-button type="submit" variant="primary">Go</b-button>
    </b-form>

</template>

<script>
    export default {
        name: "HeaderComponent",
        props: {keyStatus: Boolean},
        data: () => ({
            key: '',
        }),
        methods: {
            onSubmit(event) {
                event.preventDefault();
                if (this.key)
                    this.$emit('getVehicles', this.key);
                else
                    this.keyStatus = false;
            },
        },
    }
</script>

<style scoped>
    input {
        width: auto;
        display: inline;
        margin: 0 10px;
    }

    form {
        text-align: left;
    }

    ::-webkit-input-placeholder {
        font-style: italic;
    }
</style>
