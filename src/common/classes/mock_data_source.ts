export class MockDataSource {
  createMockRepository() {
    return {
      findOne: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn(),
      softDelete: jest.fn(),
    };
  }

  async transaction<T>(
    runInTransaction: (entityManager: any) => Promise<T>,
  ): Promise<T> {
    const mockEntityManager = {
      getRepository: () => this.createMockRepository(),
    };

    try {
      return await runInTransaction(mockEntityManager);
    } catch (error) {
      throw error;
    }
  }
}
