import { Injectable } from "@nestjs/common";
import { Saga, ICommand, ofType, CommandHandler } from "@nestjs/cqrs";
import { Observable } from "rxjs";

import { delay, map } from "rxjs/operators";
import { UserCreatedEvent } from "../events/eventhandler";

@Injectable()
export class UsersSagas {
    constructor() {}

    @Saga()
    userCreated = (events$: any): Observable<ICommand> => {
        
        return events$
            .pipe(
                ofType(UserCreatedEvent),
                delay(1000),
                map((event) => {
                    console.log('Inside [UserSagas] Saga for example send a email:', event);
                    return null;
                }),
            );
    }
}