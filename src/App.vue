<template>
    <div id="app">
        <b-container class="bv-example-row">
            <b-row>
                <b-col>
                    <HeaderComponent @getVehicles="getVehicles" :keyStatus="keyStatus"/>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <DataComponent v-if="vehiclesData.length" :vehicles="vehiclesData"
                                   @zoomInToSelectedVehicle="zoomInToSelectedVehicle"
                                   @drawVehicleRoute="drawVehicleRoute" :apiKey="apiKey"/>
                </b-col>
                <b-col style="min-height: 500px">
                    <MapComponent v-if="vehiclesData.length" :vehicles="vehiclesData"
                                  :selectedVehicleLocation="selectedVehicleLocation" :vehicleRoute="vehicleRoute"/>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import HeaderComponent from './components/HeaderComponent.vue'
    import DataComponent from './components/DataComponent.vue'
    import MapComponent from './components/MapComponent.vue'
    import {fetchAvailableVehicles} from './helper';

    export default {
        name: 'App',
        components: {
            HeaderComponent,
            DataComponent,
            MapComponent
        },
        data: () => ({
            apiKey: null,
            keyStatus: null,
            vehiclesData: [],
            selectedVehicleLocation: null,
            vehicleRoute: null,
        }),
        methods: {
            getVehicles(key) {
                fetchAvailableVehicles(key, (response) => {
                    if (response.data) {
                        this.apiKey = key;
                        this.keyStatus = true;
                        this.vehiclesData = response.data.response;
                    } else
                        this.keyStatus = false;
                });
            },
            zoomInToSelectedVehicle(selectedLocation) {
                this.selectedVehicleLocation = selectedLocation;
            },
            drawVehicleRoute(route) {
                this.vehicleRoute = route;
            }
        }
    }
</script>

<style>
    #app {
        padding: 20px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .pointer {
        cursor: pointer !important;
    }

    .selected {
        background: #0d6efd
    }
</style>
