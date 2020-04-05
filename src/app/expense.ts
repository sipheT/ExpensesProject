export class Expense {
    constructor(
        public id: number,
        public expenseTypeId: number,
        public value: number,
        public date: Date,
        public comment: string) { }
}
