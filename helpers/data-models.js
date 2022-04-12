/**
 * All the model classes and their members are given self-explanatory names
 */
export class Group{
    id = ""
    name = ""
    members = []
    pendingMembers = []
    expenses = []

    constructor(id, name){
        this.id = id
        this.name = name
    }
}

export class Member{
    userID = ""
    name = ""
    email = ""
    
    constructor(userID, name, email) {
        this.userID = userID
        this.name = name
        this.email = email
    }
}

export class Expense{
    id = ''
    text = ''
    price = 0.00
    time = ''
    constructor(id, text, price, time){
        this.id = id;
        this.text = text;
        this.time = time;
        this.price = price;
    }
}

export class Income{
    id = ''
    text = ''
    amount = 0.00
    time = ''
    constructor(id, text, amount, time){
        this.id = id;
        this.text = text;
        this.time = time;
        this.amount = amount;
    }
}

export class Debt{
    id = ''
    text = ''
    amount = 0.00
    time = ''
    isCleared = false
    constructor(id, text, amount, time, isCleared){
        this.id = id;
        this.text = text;
        this.time = time;
        this.amount = amount;
        this.isCleared = isCleared
    }
}

export class GroupExpense extends Expense{
    payee = {}
    constructor(id, text, price, time, payee){
        super(id, text, price, time);
        this.payee = payee;
    }
}