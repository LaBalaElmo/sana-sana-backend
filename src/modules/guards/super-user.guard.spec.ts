import { SuperUserGuard } from './super-user.guard';

describe('SuperUserGuard', () => {
  it('should be defined', () => {
    expect(new SuperUserGuard()).toBeDefined();
  });
});
