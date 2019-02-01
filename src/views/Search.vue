<template>
    <div class="search">
        <h1 class="subheading">Search</h1>
        
        <v-container class="my-5">
            <v-card flat xs12 md4 lg3 class="pa-3">
               <v-form>
                    <v-select
                       :items="deviceTypes"
                       label="Device Types"
                       v-model="devType"
                    ></v-select>
                    <v-text-field
                        v-model="searchName"
                        label="Search for ID (whatever it can be)"
                    >
                    </v-text-field>
                    <v-btn
                        color="primary"
                        @click="searchForData"
                    >Search</v-btn>
               </v-form>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            devType: " ",
            searchName: " ",
            deviceTypes: ['Router', 'Switch', 'PatchPanel', 'Room Socket', 'Server','Printer', 'Access Point']

        }
    },
    methods: {
        searchForData(){
            console.log("search for "+this.devType+" with ID "+this.searchName)
        }    
    }
}
</script>

