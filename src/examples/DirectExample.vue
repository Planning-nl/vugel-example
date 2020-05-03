<template compiler="vugel">
    <direct-container ref="container" />
</template>

<script lang="ts">
import { DirectContainer, Rectangle, Node } from "vugel";
import { shallowRef, Ref, watch } from "vue";

export default {
    setup() {
        const container: Ref<DirectContainer | null> = shallowRef(null);
        const loop = () => {
            const ctr = container.value;
            if (ctr) {
                const rectangle = new Rectangle(ctr.stage);
                rectangle.x = Math.random() * 1000;
                rectangle.y = Math.random() * 1000;
                rectangle.w = 10;
                rectangle.h = 10;
                ctr.add(rectangle);

                ctr.getChildren().forEach((c: Node) => {
                    c.alpha *= 0.95;
                    if (c.alpha < 0.01) {
                        ctr.remove(c);
                    }
                });
            }
            requestAnimationFrame(loop);
        };
        loop();
        return {
            container,
        };
    },
};
</script>
