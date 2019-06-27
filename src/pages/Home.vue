<template>
    <div class="home">
        <HelloWorld :msg="token" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions } from "vuex";
import { IState } from "@/store/index.d";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
    components: {
        HelloWorld
    },
    computed: {
        ...mapState({
            token: (state: IState) => state.auth.token
        })
    }
})
export default class Home extends Vue {
    public created() {
        this.$store.dispatch("auth/setToken", { token: "12" });
    }
}
</script>
