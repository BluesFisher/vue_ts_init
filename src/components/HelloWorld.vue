<template>
    <div class="hello">
        <div>sotre token: {{ msg }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
}
</script>

<style scoped lang="less">
.hello {
    font-size: 0.36rem;
    text-align: center;
}
</style>
