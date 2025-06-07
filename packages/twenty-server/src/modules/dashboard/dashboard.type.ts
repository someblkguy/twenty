import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class Dashboard {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => GraphQLJSON)
  config: any;
}
