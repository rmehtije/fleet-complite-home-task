<template>
    <b-form inline class="mb-3" @submit="onSubmit">
        <label for="inline-form-date">Date:</label>
        <b-input-group >
            <b-form-input
                    id="example-input"
                    v-model="value"
                    type="text"
                    placeholder="DD/MM/YYYY"
                    autocomplete="off"
            ></b-form-input>

                <b-form-datepicker
                        label-no-date-selected=""
                        button-only
                        right
                        label-selected=""
                        aria-controls="example-input"
                        :date-format-options="{ day: 'numeric',  month: 'numeric', year: 'numeric'  }"
                        @context="onContext"
                        :hide-header="hideHeader"
                        :max="maxDate"
                ></b-form-datepicker>

        </b-input-group>
        <b-button type="submit" variant="primary">Go</b-button>
    </b-form>

</template>

<script>
    import moment from 'moment';

    export default {
        name: "DateSearchComponent",
        data:() => ({
            hideHeader: true, // this dose not work, bug in datepicker !!
            value: '',
            startDateString: '',
            endDateString: '',
            maxDate: null,
        }),
        methods: {
            onContext(ctx) {
                this.maxDate = moment().toDate();
                if (ctx.selectedYMD) {
                    this.value = ctx.activeFormatted;
                    this.startDateString = ctx.selectedYMD;
                    this.endDateString = moment(ctx.selectedDate).add(1, 'days').format('YYYY-MM-DD').toString();
                    document.querySelector(".b-form-datepicker > label").style.display = "none"; // hack for another bug in datepicker !!
                }
            },
            onSubmit(event) {
                event.preventDefault();
                this.$emit('getDistance', {
                    startDateString: this.startDateString,
                    endDateString: this.endDateString,
                });
            }
        }
    }
</script>

<style scoped>
    input{width: auto!important;display: inline;margin: 0 10px;flex: initial;}
    form {float: left;display: inline-flex}
    label{align-self: center;}
    ::-webkit-input-placeholder {
        font-style: italic;
    }
    button{margin-left: 10px}
</style>
