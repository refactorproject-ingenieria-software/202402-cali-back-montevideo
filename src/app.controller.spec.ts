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

    it('When it receives a number, then it should return false', () => {
      const numericPassword = 1234 as unknown as string;

      expect(appController.passwordValidator(numericPassword)).toBe(false);
    });

    it('when the password is shorter than 8 characters, it should return an error message', () => {
      const shortPassword = '1234';
      expect(appController.passwordValidator(shortPassword)).toBe(
        'Password must be at least 8 characters',
      );
    });
  });
});
