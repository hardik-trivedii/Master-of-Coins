export class Group{
    id = ""
    name = ""
    members = []

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
    id = 0
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

export class GroupExpense extends Expense{

}