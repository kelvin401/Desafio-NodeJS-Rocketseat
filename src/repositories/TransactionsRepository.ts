import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceIncome = this.transactions.filter(
      transactions => transactions.type === 'income',
    );
    const income = balanceIncome.reduce((soma, objeto) => {
      return soma + objeto.value;
    }, 0);

    const balanceOutcome = this.transactions.filter(
      transactions => transactions.type === 'outcome',
    );
    const outcome = balanceOutcome.reduce((soma, objeto) => {
      return soma + objeto.value;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
