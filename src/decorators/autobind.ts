namespace App {
  //Autobind decorator
  export const Autobind = () => {
    return (
      _target: any,
      _propertyKey: string,
      descriptor: PropertyDescriptor
    ) => {
      const originalMethod = descriptor.value;
      const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
          return originalMethod.bind(this);
        },
      };
      return adjustedDescriptor;
    };
  };
}
