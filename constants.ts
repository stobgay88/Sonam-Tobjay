
import { Actor, ActorType } from './types';

export const ACTORS: Actor[] = [
  {
    id: 'prod-1',
    type: ActorType.PRODUCER,
    name: 'Trongsa Highland Farms',
    location: 'Trongsa Dzongkhag',
    description: 'Specializing in organic mountain produce and traditional grains.',
    x: 10,
    y: 35,
    icon: '🏔️'
  },
  {
    id: 'agg-1',
    type: ActorType.AGGREGATOR,
    name: 'Central Sourcing Hub',
    location: 'Trongsa Valley',
    description: 'Smart sorting and IoT labeling for high-altitude organic yields.',
    x: 35,
    y: 45,
    icon: '🏷️'
  },
  {
    id: 'dist-1',
    type: ActorType.DISTRIBUTOR,
    name: 'Mindful Logistics EV Fleet',
    location: 'Trongsa-Gelephu Corridor',
    description: 'Electric vehicle cold-chain fleet with real-time tracking.',
    x: 55,
    y: 65,
    icon: '⚡'
  },
  {
    id: 'ret-1',
    type: ActorType.RETAILER,
    name: 'GMC Mindfulness Market',
    location: 'Gelephu Mindfulness City',
    description: 'Futuristic retail experience powered by AI demand forecasting.',
    x: 80,
    y: 55,
    icon: '🏙️'
  },
  {
    id: 'cons-1',
    type: ActorType.CONSUMER,
    name: 'GMC Citizens',
    location: 'Gelephu Mindfulness City',
    description: 'Discerning consumers in the world\'s first Mindfulness City.',
    x: 95,
    y: 40,
    icon: '🧘'
  }
];

export const MOCK_FORECAST: { month: string; demand: number; supply: number }[] = [
  { month: 'Jan', demand: 400, supply: 380 },
  { month: 'Feb', demand: 450, supply: 400 },
  { month: 'Mar', demand: 600, supply: 550 },
  { month: 'Apr', demand: 800, supply: 750 },
  { month: 'May', demand: 1000, supply: 900 },
  { month: 'Jun', demand: 1200, supply: 1300 },
];
