<template>
    <gmaps-map :options="mapOptions">
        <gmaps-polyline
                v-if="vehicleRoute"
                :editable="false"
                :path="vehicleRoute"
                stroke-color="dodgerblue"
                stroke-weight="3"
        />
        <gmaps-marker v-else v-for="(item, i) in items" :key="i" :options="item.options"/>
    </gmaps-map>
</template>

<script>
    import { gmapsMap, gmapsMarker, gmapsPolyline } from 'x5-gmaps';
    export default {
        name: "MapComponent",
        components: { gmapsMap, gmapsMarker, gmapsPolyline },
        props: ['vehicles', 'selectedVehicleLocation', 'vehicleRoute'],
        data: () => ({
            mapOptions: {
                center: { lat: 58.5953, lng: 25.0136 },
                zoom: 7,
            },
            items: [],
        }),
        created() {
            this.updateVehiclesList();
        },
        watch: {
            selectedVehicleLocation(newData) {
                this.updateVehiclesList();
                this.mapOptions = {
                    center: { lat: newData.lat, lng: newData.lng },
                    zoom: 14,
                };
            },
            vehicleRoute(newRoute){
                this.mapOptions = {
                    center: { lat: newRoute[0].lat, lng: newRoute[0].lng },
                    zoom: 9,
                };
                this.vehicleRoute = newRoute;
            }
        },
        methods: {
            updateVehiclesList() {
                this.vehicleRoute = null;
                this.items = this.vehicles.map(vehicle => ({
                    options: {
                        position: {
                            lat: vehicle.latitude,
                            lng: vehicle.longitude
                        }
                    }
                }));
            }
        }
    }
</script>

<style scoped>

</style>
