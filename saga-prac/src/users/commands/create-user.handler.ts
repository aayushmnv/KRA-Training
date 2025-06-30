// src/users/commands/create-user.handler.ts
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './createUserCommand';
import { UserCreatedEvent } from '../events/eventhandler';


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly eventBus: EventBus) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { username, email, password } = command;
    console.log(`User ${username} successfully registered`);

    // Simulated user creation (replace with DB save)
    const db = {
      userId: 123,
    };

    this.sendEvent(db.userId);
    return command;
  }

  private sendEvent(userId: number) {
    if (userId !== undefined) {
      console.log('Sending UserCreatedEvent...');
      this.eventBus.publish(new UserCreatedEvent(userId.toString()));
    }
  }
}
