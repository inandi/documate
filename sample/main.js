class User {
    constructor(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email) {
        this.email = email;
    }

    getAge() {
        return this.age;
    }

    setAge(age) {
        this.age = age;
    }

    static createFromObject(data) {
        return new User(data.name, data.email, data.age);
    }
}
