var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
function addItemInfoDecorator(target, method, descriptor) {
    let original = descriptor.value;
    descriptor.value = function () {
        let result = original.apply(this);
        result.data = new Date().toLocaleString();
        result.info = `${this.name} - $${this.price}`;
        return result;
    };
}
function addItemInfoDecorator2(target, method, descriptor) {
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
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getItemInfo() {
        return {
            name: this.name,
            price: this.price
        };
    }
}
__decorate([
    addItemInfoDecorator,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Item.prototype, "getItemInfo", null);
// 2. Создать декоратор класса User. Он должен добавлять в данном классе поле createDate датой создания класса 
//    а также добавлять поле type в котором будет записана строка ‘admin’ или ‘user’ данную строку нужно передать 
//    в декоратор при вызове. Сам класс и имя декоратора может быть произвольным.
/**
 * Декоратор класса, добавляет поле с датой создания класса и поле с типом пользователя
 * @param {string} type - тип пользователя
 * @returns {class}
 */
function decorateUser(type) {
    return function (targetClass) {
        return class {
            constructor() {
                this.type = type;
                this.createDate = new Date().toLocaleString();
            }
        };
    };
}
let User = class User {
};
User = __decorate([
    decorateUser("admin")
], User);
// 3. Есть два апи для получения и работы с новостями одно для получения новостей из USA второе из Ukraine. 
//    Под эти апи создано по два интерфейса и по два класса. Переделайте это в namespaces.
var USA;
(function (USA) {
    class NewsService {
        constructor() {
            this.apiurl = 'https://news_api_usa_url';
        }
        getNews() { }
    }
    USA.NewsService = NewsService;
})(USA || (USA = {}));
var Ukraine;
(function (Ukraine) {
    class NewsService {
        constructor() {
            this.apiurl = 'https://news_api_2_url';
        }
        getNews() { }
        addToFavorite() { }
    }
    Ukraine.NewsService = NewsService;
})(Ukraine || (Ukraine = {}));
// 4. Есть два класса Junior и Middle создайте класс Senior который будет имплементировать 
//    этих два класса а также у него будет еще свой метод createArchitecture реализация данного 
//    метода может быть произвольной.
class Junior {
    doTasks() {
        console.log('Actions!!!');
    }
}
class Middle {
    createApp() {
        console.log('Creating App!!!');
    }
}
class Senior {
    createApp() { }
    doTasks() { }
    createArchitecture() {
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
function applyMixins(targetClasss, baseClasses) {
    baseClasses.forEach((baseClass) => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach((propName) => {
            targetClasss.prototype[propName] = baseClass.prototype[propName];
        });
    });
}
