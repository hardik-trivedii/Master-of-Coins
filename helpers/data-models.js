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