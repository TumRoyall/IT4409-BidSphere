import {
  Zap,
  Package,
  TrendingUp,
  DollarSign,
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Calendar,
  Star
} from 'lucide-react';

export const ActiveAuctionsIcon = () => (
  <Zap size={28} className="w-7 h-7" strokeWidth={1.5} />
);

export const TotalItemsIcon = () => (
  <Package size={28} className="w-7 h-7" strokeWidth={1.5} />
);

export const SuccessRateIcon = () => (
  <TrendingUp size={28} className="w-7 h-7" strokeWidth={1.5} />
);

export const AvgPriceIcon = () => (
  <DollarSign size={28} className="w-7 h-7" strokeWidth={1.5} />
);

export const LocationIcon = () => (
  <MapPin size={18} className="w-4.5 h-4.5" strokeWidth={2} />
);

export const EmailIcon = () => (
  <Mail size={24} className="w-6 h-6" strokeWidth={1.5} />
);

export const PhoneIcon = () => (
  <Phone size={24} className="w-6 h-6" strokeWidth={1.5} />
);

export const StatusIcon = () => (
  <CheckCircle size={24} className="w-6 h-6" strokeWidth={1.5} />
);

export const CalendarIcon = () => (
  <Calendar size={24} className="w-6 h-6" strokeWidth={1.5} />
);

export const StarIcon = () => (
  <Star size={18} className="w-4.5 h-4.5" strokeWidth={2} />
);
