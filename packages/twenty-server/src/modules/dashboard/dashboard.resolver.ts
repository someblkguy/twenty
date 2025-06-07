import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

import { Dashboard } from './dashboard.type';

@Resolver(() => Dashboard)
export class DashboardResolver {
  private dashboards: Dashboard[] = [
    { id: '1', name: 'Sales Overview', config: { widgets: [] } },
    { id: '2', name: 'Marketing KPIs', config: { widgets: [] } },
  ];

  @Query(() => [Dashboard])
  dashboards(): Dashboard[] {
    return this.dashboards;
  }

  @Mutation(() => Dashboard)
  createDashboard(
    @Args('name') name: string,
    @Args('config', { type: () => GraphQLJSON }) config: any,
  ): Dashboard {
    const dashboard = {
      id: (this.dashboards.length + 1).toString(),
      name,
      config,
    };
    this.dashboards.push(dashboard);
    return dashboard;
  }
}
