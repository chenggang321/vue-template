export default {
    props: {
        value: {
            required: true,
        },
    },
    data() {
        return {
            subValue: this.value,
        };
    },
    watch: {
        value(newVal) {
            this.subValue = newVal;
        },
        subValue(newVal, val) {
            if (newVal !== val) this.$emit("input", newVal);
        },
    },
};
