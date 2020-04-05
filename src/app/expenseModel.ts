export class ExpenseModel {
    constructor(
        public id: number,
        public expenseType: string,
        public value: number,
        public date: Date,
        public comment: string) { }
}
