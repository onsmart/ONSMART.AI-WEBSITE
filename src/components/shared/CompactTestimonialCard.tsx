
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CompactTestimonialCardProps {
  name: string;
  position: string;
  company: string;
  sector: string;
  avatar: string;
  rating: number;
  text: string;
  index: number;
}

const CompactTestimonialCard: React.FC<CompactTestimonialCardProps> = ({
  name,
  position,
  company,
  sector,
  avatar,
  rating,
  text,
  index
}) => {
  return (
    <Card className="border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        {/* Header with small avatar and info */}
        <div className="flex items-center gap-2 mb-3">
          <Avatar className="w-8 h-8 border border-brand-blue/20 flex-shrink-0">
            <AvatarImage src={avatar} alt={name} className="object-cover" />
            <AvatarFallback className="bg-brand-blue/10 text-brand-black font-medium text-xs">
              {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-brand-black dark:text-gray-200 text-xs truncate">{name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{position}</p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>

        {/* Testimonial text */}
        <blockquote className="text-gray-700 dark:text-gray-300 text-sm flex-1 mb-2 leading-relaxed">
          "{text.length > 120 ? text.substring(0, 120) + '...' : text}"
        </blockquote>
        
        {/* Company and Sector */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-medium text-brand-blue truncate">{company}</span>
          <span className="bg-brand-blue-light/20 text-brand-black dark:bg-brand-blue/30 dark:text-gray-300 text-xs px-2 py-1 rounded-full ml-2">
            {sector}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompactTestimonialCard;
