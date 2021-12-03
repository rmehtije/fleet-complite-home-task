<template>
    <div>
        <b-table striped hover :items="main" @row-clicked="myRowClickHandler" :tbody-tr-class="'pointer'"></b-table>
        <DateSearchComponent v-if="showDateSearch" @getDistance="getDistance"/>
        <b-table striped hover :items="details" thead-class="d-none"></b-table>
    </div>
</template>

<script>
    import DateSearchComponent from './DateSearchComponent.vue';
    import {fetchVehicleRoute} from './../helper';
    import moment from 'moment';

    export default {
        name: "DataComponent",
        components: {DateSearchComponent},
        props: ['vehicles', 'drawVehicleRoute', 'apiKey'],
        data: () => ({
            main: [],
            details: [],
            showDateSearch: false,
            selectedVehicleObjectId: null,
        }),
        methods: {
            myRowClickHandler(row, index) {
                let prevSelected = document.querySelector(".selected");
                if (prevSelected)
                    prevSelected.classList.remove("selected");
                document.querySelectorAll(".pointer")[index].classList.add("selected");
                this.showDateSearch = true;
                let selectedVehicle = this.vehicles.find(vehicle => vehicle.plate == row.name);
                this.$emit('zoomInToSelectedVehicle', {
                    lat: selectedVehicle.latitude,
                    lng: selectedVehicle.longitude,
                });
                this.selectedVehicleObjectId = selectedVehicle.objectId;
            },
            getDistance({startDateString, endDateString}) {
                fetchVehicleRoute(this.selectedVehicleObjectId, startDateString, endDateString, this.apiKey, (response) => {
                    if (response.data) {
                        let data = response.data.response;
                        this.details = [{
                            name: 'Total Distance',
                            data: (data[data.length - 1].Distance - data[0].Distance).toFixed(3) + " km",
                        }];
                        let routes = data.reduce((filtered, option) => {
                            if (option.EngineStatus) {
                                let route = {lat: option.Latitude, lng: option.Longitude};
                                filtered.push(route);
                            }
                            return filtered;
                        }, []);
                        this.$emit('drawVehicleRoute', routes);
                    }
                });
            }
        },
        created() {
            this.main = this.vehicles.map(vehicle => ({
                name: vehicle.plate,
                speed: (vehicle.speed || 0) + " km/h",
                last_update: moment(vehicle.timestamp).fromNow()
            }));
        }
    }
</script>

<style scoped>

</style>
