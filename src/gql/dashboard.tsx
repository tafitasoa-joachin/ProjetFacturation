// dashboard.tsx
import { gql } from '@apollo/client';

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData($year: Int!) {
    dashboard(year: $year) {
      projects {
        month
        count
      }
      clients {
        month
        count
      }
    }
  }
`;

export const GET_CLIENTS_AND_PROJECTS_COUNT = gql`
    query ClientsAndProjectsCount($year: Int!) {
        clientsAndProjectsCount(year: $year) {
            clientCount
            projectCount
        }
    }
`;