import { getDatabase, ref, get, child, onValue, off } from "firebase/database";
import { Group, Expense, Member } from "./data-models";

export default class UserData{
    static this = null;
    userID = '';
    email = '';
    name = '';
    password = '';
    groups = []
    personal_expenses = [];
    incomes = []
    savings = []
    helps = []
    gifts = []
    debts = []

    static getInstance(){
        if (UserData.this == null)
            UserData.this = new UserData();
        return this.this;
    }

    static setValueUpdateOnPath(path, onCompletion){
        onValue(ref(getDatabase(), path), (snapshot)=>{
            onCompletion(snapshot);
        });
    }
}