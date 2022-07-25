export const Autobind = () => {
    return (_target, _propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        const adjustedDescriptor = {
            configurable: true,
            get() {
                return originalMethod.bind(this);
            },
        };
        return adjustedDescriptor;
    };
};
//# sourceMappingURL=autobind.js.map