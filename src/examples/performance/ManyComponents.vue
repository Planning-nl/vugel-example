<template compiler="vugel">
    <editor>
        <template v-slot:content>
            <container>
                <rectangle :w="50" :h="100" color="red"></rectangle>
                <stateful-component v-for="item in items" :key="item.id" :x="item.x" :y="item.y" :color="item.color"></stateful-component>
            </container>
        </template>
        <template v-slot:form-items>
            <item name="recreate">
                <toggle :initial-value="true" @change="set_recreate" />
            </item>
            <item name="amount">
                <drag-bar :initial-value="100" :min="0" :max="10000" @change="set_amount" />
            </item>
        </template>
    </editor>
</template>

<script lang="ts">
import DragBar from "../form/DragBar.vue";
import Editor from "../form/Editor.vue";
import FormItem from "../form/FormItem.vue";
import { createChangeHandlers } from "../form/utils";
import Toggle from "../form/Toggle.vue";
import StatefulComponent from "./StatefulComponent.vue";
import { ref, shallowRef, watchEffect, Ref, triggerRef, onUnmounted, onMounted } from "vue";
import { ColorUtils } from "tree2d";

export default {
    components: { StatefulComponent, DragBar, Toggle, Editor, item: FormItem },
    setup() {
        const changeHandlers = createChangeHandlers(["recreate", "amount"]);
        const items: Ref<any[]> = shallowRef([]);
        watchEffect(() => {
            const amount: number = changeHandlers.amount.value;
            const recreate: boolean = changeHandlers.recreate.value;
            const newItems = [];
            for (let i = 0; i < amount; i++) {
                const item: any = {};
                item.color = ColorUtils.getArgbNumber([
                    Math.random() * 255,
                    Math.random() * 255,
                    Math.random() * 255,
                    255,
                ]);
                item.x = Math.random() * 500;
                item.y = Math.random() * 500;
                item.id = recreate ? Math.random() : i;
                newItems.push(item);
            }

            items.value = newItems;
        });

        let raf = 0;

        let frames = 0;
        const loop = () => {
            frames++;
            if (frames === 100) {
                console.profile("[create] frame 100-300");
            }
            if (frames === 300) {
                console.profileEnd("[create] frame 100-300");
                // changeHandlers.recreate.value = false;
            }
            if (frames === 400) {
                console.log('start')
                // console.profile("[reuse] frame 400-600");
            }
            if (frames === 1600) {
                console.log('end')
                // console.profileEnd("[reuse] frame 400-600");
            }

            triggerRef(changeHandlers.amount);
            raf = requestAnimationFrame(loop);
        };

        onMounted(() => {
            loop();
        });

        onUnmounted(() => {
            cancelAnimationFrame(raf);
        });

        return {
            items,
            ...changeHandlers,
        };
    },
};
</script>
