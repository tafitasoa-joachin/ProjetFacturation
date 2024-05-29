// dashboardScreen.tsx
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { GET_DASHBOARD_DATA } from "../../gql/dashboard"; // Assurez-vous d'importer le type DashboardData depuis votre fichier gql/dashboard

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Statistic',
    },
  },
};

const labels = [
  'Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 
  'Jullet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'
] as const;

const chartbar = ({ year }: { year: number }) => {
  const { loading, error, data } = useQuery(GET_DASHBOARD_DATA, {
    variables: { year: year },
  });

  const [chartData, setChartData] = useState<{
    labels: string[], // Changer le type en string[]
    datasets: {
      label: string,
      data: number[],
      backgroundColor: string,
    }[]
  }>({
    labels: labels as unknown as string[], // Convertir les labels en string[]
    datasets: [
      {
        label: 'Projets',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Clients',
        data: [],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  });

  useEffect(() => {
    if (data) {
      const projectsData = data.dashboard.projects;
      const clientsData = data.dashboard.clients;

      const projectsCount = labels.map(label => {
        const project = projectsData.find((p: { month: string; }) => p.month === label);
        return project ? project.count : 0;
      });

      const clientsCount = labels.map(label => {
        const client = clientsData.find((c: { month: string; }) => c.month === label);
        return client ? client.count : 0;
      });

      setChartData({
        labels: labels as unknown as string[], // Convertir les labels en string[]
        datasets: [
          {
            label: 'Projets',
            data: projectsCount,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Clients',
            data: clientsCount,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <Bar options={options} data={chartData} />;
};

export default chartbar;
