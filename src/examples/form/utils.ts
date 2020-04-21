import { ref, Ref } from "vue";

export const passToRef = (r: Ref<number>) => {
    return (e: { value: number }) => {
        r.value = e.value;
    };
};

export const createChangeHandlers = (refNames: string[]) => {
    const result: any = {};
    refNames.forEach((refName: string) => {
        const r = ref(0);
        result[refName] = r;
        result["set_" + refName] = passToRef(r);
    });
    return result;
};
