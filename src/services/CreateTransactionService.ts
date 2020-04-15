import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw Error(
        'It is impossible to have an outcome higher than your balance',
      );
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    return transaction;
  }
}

export default CreateTransactionService;
