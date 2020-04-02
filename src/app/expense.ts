export class Expense {
    constructor(
        public id: number,
        public ExpenseTypeId: number,
        public Value: number,
        public Date: Date,
        public Comment: string) { }
}
