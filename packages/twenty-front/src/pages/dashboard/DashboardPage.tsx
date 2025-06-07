import { useQuery, gql } from '@apollo/client';

import { PageContainer } from '@/ui/layout/page/components/PageContainer';

const DASHBOARDS_QUERY = gql`
  query Dashboards {
    dashboards {
      id
      name
    }
  }
`;

export const DashboardPage = () => {
  const { data } = useQuery(DASHBOARDS_QUERY);

  return (
    <PageContainer>
      <h1>Dashboards</h1>
      <ul>
        {data?.dashboards?.map((d: any) => (
          <li key={d.id}>{d.name}</li>
        ))}
      </ul>
    </PageContainer>
  );
};
