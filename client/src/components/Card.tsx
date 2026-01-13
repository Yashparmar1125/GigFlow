import { type FC } from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  blobColorClass: string;
}

const Card: FC<CardProps> = ({ title, description, buttonText, buttonLink, imageSrc, imageAlt, blobColorClass }) => {
  return (
    <div className="bg-neutral-white rounded-lg p-8 lg:p-12 flex flex-col-reverse lg:flex-row items-center justify-between gap-8 border border-neutral-300 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative">
      
      {/* Text Content Side */}
      <div className="flex-1 text-center lg:text-left z-10">
        <h2 className="text-2xl lg:text-3xl font-bold text-neutral-black mb-4">
          {title}
        </h2>
        <p className="text-neutral-500 mb-8 text-lg max-w-md mx-auto lg:mx-0">
          {description}
        </p>
        <Link
          to={buttonLink}
          className="inline-block bg-secondary hover:bg-secondary-dark text-neutral-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105"
        >
          {buttonText}
        </Link>
      </div>

      {/* Illustration Side */}
      <div className="flex-1 flex justify-center lg:justify-end relative z-10">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full max-w-sm object-contain"
        />
         {/* Decorative themed blob background positioned behind the image */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 h-87.5 rounded-full mix-blend-multiply filter blur-3xl opacity-40 -z-10 ${blobColorClass}`}></div>
      </div>
    </div>
  );
};

export default Card;
