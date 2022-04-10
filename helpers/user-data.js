export default class UserData{
    static this = null;
    userID = '';
    email = '';
    name = '';
    password = '';
    groups = []
    static getInstance(){
        if (UserData.this == null)
            UserData.this = new UserData();
        return this.this;
    }
}