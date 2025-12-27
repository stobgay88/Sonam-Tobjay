
export enum ActorType {
  PRODUCER = 'PRODUCER',
  AGGREGATOR = 'AGGREGATOR',
  DISTRIBUTOR = 'DISTRIBUTOR',
  RETAILER = 'RETAILER',
  CONSUMER = 'CONSUMER'
}

export interface Actor {
  id: string;
  type: ActorType;
  name: string;
  location: string;
  description: string;
  x: number; // Percent width
  y: number; // Percent height
  icon: string;
}

export interface IoTData {
  temperature: number;
  humidity: number;
  status: 'optimal' | 'warning' | 'critical';
  lastUpdated: string;
}

export interface ForecastData {
  month: string;
  demand: number;
  supply: number;
}

export interface InsightResponse {
  insight: string;
  recommendation: string;
}
