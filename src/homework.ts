// 1. Создать декоратор метода addItemInfoDecorator он должен добавлять поле date в возвращаемом 
//    объекте с датой когда был вызван метод а также поле info в котором будет записан текст состоящий 
//    из названия товара и его цены например: ‘Apple iPhone - $100’;
//    Для того что бы функция была вызвана в правильном контексте внутри декоратора ее нужно вызывать 
//    через apply let origResult =  originalFunc.apply(this);
/**
 * Декоратор метода, добавляет поле с датой вызова метода и поле с информацией о товаре
 * @param {Object} target - метод, для которого применяется декоратор 
 * @param {string} method - имя метода для которого применяется декоратор
 * @param {PropertyDescriptor} descriptor -  дескриптор данного свойства
 * @returns {void}
 */
function addItemInfoDecorator(target: Object, method: string, descriptor: PropertyDescriptor) {
    let original = descriptor.value;
    descriptor.value = function () {
        let result = original.apply(this);
        result.data = new Date().toLocaleString();
        result.info =  `${this.name} - $${this.price}`;
        return result;
    }
}

/**
 * Декоратор метода, добавляет поле с датой вызова метода и поле с информацией о товаре (вариант №2)
 * @param {Object} target - метод, для которого применяется декоратор 
 * @param {string} method - имя метода для которого применяется декоратор
 * @param {PropertyDescriptor} descriptor -  дескриптор данного свойства
 * @returns {void}
 */
function addItemInfoDecoratorV2(target: Object, method: string, descriptor: PropertyDescriptor) {
    return {
        value: function () {
            let result = descriptor.value.apply(this);
            result.date = new Date().toLocaleString();
            result.info = `${this.name} - $${this.price}`;
            return result;
        }
    };
}

class Item {
    public price: number;
    public name: string;

    constructor(name: string ,price: number) {
        this.name = name;
        this.price = price;
    }

    @addItemInfoDecorator
    public getItemInfo() {
        return {
            name: this.name, 
            price: this.price
        };
    }
}

// 2. Создать декоратор класса User. Он должен добавлять в данном классе поле createDate датой создания класса 
//    а также добавлять поле type в котором будет записана строка ‘admin’ или ‘user’ данную строку нужно передать 
//    в декоратор при вызове. Сам класс и имя декоратора может быть произвольным.
/**
 * Декоратор класса, добавляет поле с датой создания класса и поле с типом пользователя
 * @param {string} type - тип пользователя
 * @returns {class}
 */
function decorateUser(type: string) {
    return function (targetClass: any) {
        return class {
            public createDate: string;
            public type: string = type;

            constructor() {
                this.createDate = new Date().toLocaleString();
            }
        }
    }
}

@decorateUser("admin")
class User {

}

// 3. Есть два апи для получения и работы с новостями одно для получения новостей из USA второе из Ukraine. 
//    Под эти апи создано по два интерфейса и по два класса. Переделайте это в namespaces.
namespace USA {
    export interface INews {
        id: number;
        title: string;
        text: string;
        author: string;
    }
    
    export class NewsService {
        protected apiurl: string = 'https://news_api_usa_url'
        public getNews() {}
    }
}

namespace Ukraine {
    export interface INews {
        uuid: string;
        title: string;
        body: string;
        author: string;
        date: string;
        imgUrl: string;
    }
    
    export class NewsService {
        protected apiurl: string = 'https://news_api_2_url'
        public getNews() {}
        public addToFavorite() {}
    }
}

// 4. Есть два класса Junior и Middle создайте класс Senior который будет имплементировать 
//    этих два класса а также у него будет еще свой метод createArchitecture реализация данного 
//    метода может быть произвольной.

class Junior {
    public doTasks(): void {
        console.log('Actions!!!');
    }
}

class Middle {
    public createApp(): void {
        console.log('Creating App!!!');
    }
}

class Senior implements Junior, Middle{
    public createApp(): void {}
    public doTasks(): void {}
    public createArchitecture(): void {
        console.log('Creating Architecture!!!');
    }
}

applyMixins(Senior, [Junior, Middle]);

/**
 * Миксин который реализует наследование класса от нескольких родительских классов
 * @param {any} targetClasss - класс наследник
 * @param {any[]} targetbaseClassesClasss - родительские классы
 * @returns {void}
 */
function applyMixins(targetClasss: any, baseClasses: any[]) {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClasss.prototype[propName] = baseClass.prototype[propName];
        });
    });
}
