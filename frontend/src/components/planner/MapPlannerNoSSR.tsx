import dynamic from 'next/dynamic';

const MapPlanner = dynamic(() => import('./MapPlanner'), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[400px] rounded-xl glass flex items-center justify-center">Loading Map...</div>
});

export default MapPlanner;
