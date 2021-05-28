const { evaluateRegex } = require('./util');

const Person = require('./person');

//The goal of the Fluent API pattern is to run tasks like a pipeline, step by step
//and at the end, it calls build. Very similar to Builder pattern, but while Builder is about building objects, 
//Fluent API is about processes.
class TextProcessorFluentAPI {

    //private property
    #content;

    constructor(content) {

        this.#content = content;

    }

    extractPeopleData() {

        // ?<= it says that will extract the data that comes after the group
        // [contratante|contratada] one or another (and the global flag 'i' indicates that the regex will be case insensitive)
        // :\s{1} says that it will have ':' and one blank space after the expression

        // (?!\s) negative look around, it will ignore when more than one blank space occurs

        // .*\n matches anything until the first \n
        // .*? non greedy, the ? makes it stop at the first occurence, avoiding loops and unecessary processings

        //$ says the search to end when the line ends
        //g -> global
        //m -> multiline
        //i -> insensitive


        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*)$/gmi);

        const onlyPerson = this.#content.match(matchPerson);

        this.#content = onlyPerson;

        return this;

    }

    divideTextInColumns(){

        const splitRegex = evaluateRegex(/,/);

        this.#content = this.#content.map(line => line.split(splitRegex)); 

        return this;

    }

    removeEmptyCharacters(){

        const trimSpacesRegex = evaluateRegex(/^\s+|\s+$|\n/g);

        this.#content = this.#content.map(line => line.map(item => item.replace(trimSpacesRegex, "")));

        return this;

    }

    mapPerson() {

        this.#content = this.#content.map(line => new Person(line));

        return this;

    }

    build() {

        return this.#content;

    }

}


module.exports = TextProcessorFluentAPI;