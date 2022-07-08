"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Autobind = () => {
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
const validate = (obj) => {
    let isValid = true;
    if (obj.required) {
        isValid = isValid && obj.value.toString().trim().length !== 0;
    }
    if (obj.minLength != null && typeof obj.value === 'string') {
        isValid = isValid && obj.value.length >= obj.minLength;
    }
    if (obj.maxLength != null && typeof obj.value === 'string') {
        isValid = isValid && obj.value.length <= obj.maxLength;
    }
    if (obj.min != null && typeof obj.value === 'number') {
        isValid = isValid && obj.value >= obj.min;
    }
    if (obj.max != null && typeof obj.value === 'number') {
        isValid = isValid && obj.value <= obj.max;
    }
    return isValid;
};
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild;
        this.formElement.id = 'user-input';
        this.titleInput = this.formElement.querySelector('#title');
        this.descriptionInput = this.formElement.querySelector('#description');
        this.peopleInput = this.formElement.querySelector('#people');
        this.configure();
        this.attach();
    }
    getUserInput() {
        const enteredTitle = this.titleInput.value;
        const enteredDescription = this.descriptionInput.value;
        const enteredPeople = this.peopleInput.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert('Invalid input, please try again');
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    clearInputs() {
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.peopleInput.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            console.log(title, description, people);
            this.clearInputs();
        }
    }
    configure() {
        this.formElement.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
    }
}
__decorate([
    Autobind()
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map