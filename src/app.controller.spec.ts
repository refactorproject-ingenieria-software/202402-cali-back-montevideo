import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('Given a password validator controller', () => {
    it('Then it should be a function', () => {
      expect(typeof appController.passwordValidator).toBe('function');
    });

    it('When it receives an string, then it should return true', () => {
      const stringPassword = '1234';

      expect(appController.passwordValidator(stringPassword)).toBe(true);
    });

    it('When it receives a number, then it should return false', () => {
      const numericPassword = 1234 as unknown as string;

      expect(appController.passwordValidator(numericPassword)).toBe(false);
    });
  });
});
