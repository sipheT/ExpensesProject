export class ExpenseType {
    constructor(
        public id: number,
        public name: string,
        public comment: string,
        public createAt: Date,
        public updatedAt: string) { }
}